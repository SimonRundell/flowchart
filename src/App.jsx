import { useState, useRef, useCallback, useEffect } from 'react';
import Palette from './components/Palette';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import Modal from './components/Modal';
import CMFloatAd from './CMFloatAd';
import { NODE_DEFAULTS, clientToSVG, nearestPort, getPortPos } from './utils/geometry';
import { exportJSON, importJSON, printDiagram, exportSVG } from './utils/fileUtils';
import './App.css';

let _id = 1;
const uid = () => `id_${_id++}`;

function makeNode(type, x, y) {
  const { width, height } = NODE_DEFAULTS[type] || { width: 160, height: 70 };
  return { id: uid(), type, x, y, width, height, text: '', fontSize: 13, fontWeight: 'normal', textPos: 'inside' };
}

export default function App() {
  const [nodes, setNodes]             = useState([]);
  const [edges, setEdges]             = useState([]);
  const [viewport, setViewport]       = useState({ x: 60, y: 60, scale: 1 });
  const [selected, setSelected]       = useState(null);   // { type:'node'|'edge', id }
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [connecting, setConnecting]   = useState(null);   // { fromNodeId, fromPort, curPos }
  const [dragging, setDragging]       = useState(null);   // { nodeId, startSVG, origPos }
  const [panning, setPanning]         = useState(null);   // { startClient, origVP }
  const [editingText, setEditingText] = useState(null);   // { id, type, value, fontSize }
  const [modal, setModal] = useState(null);               // { title, message, confirmLabel, cancelLabel, onConfirm, onCancel }

  const showAlert = useCallback((title, message) => {
    setModal({ title, message, confirmLabel: 'OK', onConfirm: () => setModal(null) });
  }, []);

  const showConfirm = useCallback((title, message, onConfirm) => {
    setModal({
      title, message,
      confirmLabel: 'Confirm', cancelLabel: 'Cancel',
      onConfirm: () => { setModal(null); onConfirm(); },
      onCancel: () => setModal(null),
    });
  }, []);

  const svgRef    = useRef(null);
  const spaceDown = useRef(false);

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const down = e => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        spaceDown.current = true;
        document.body.style.cursor = 'grab';
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && e.target === document.body) {
        handleDeleteSelected();
      }
    };
    const up = e => {
      if (e.code === 'Space') {
        spaceDown.current = false;
        document.body.style.cursor = '';
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  });

  // ── helpers ───────────────────────────────────────────────────────────────
  const getSVGPos = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return clientToSVG(e.clientX, e.clientY, rect, viewport);
  }, [viewport]);

  // ── wheel zoom ────────────────────────────────────────────────────────────
  const handleWheel = useCallback(e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.909;
    const rect = svgRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setViewport(v => {
      const ns = Math.min(4, Math.max(0.15, v.scale * factor));
      return {
        scale: ns,
        x: mx - (mx - v.x) * (ns / v.scale),
        y: my - (my - v.y) * (ns / v.scale),
      };
    });
  }, []);

  // ── canvas mouse down (pan or deselect) ───────────────────────────────────
  const handleCanvasMouseDown = useCallback(e => {
    if (e.button === 1 || spaceDown.current) {
      e.preventDefault();
      setPanning({ startClient: { x: e.clientX, y: e.clientY }, origVP: { ...viewport } });
      return;
    }
    if (e.button === 0) {
      setSelected(null);
      setConnecting(null);
    }
  }, [viewport]);

  // ── node mouse down (drag) ────────────────────────────────────────────────
  const handleNodeMouseDown = useCallback((e, nodeId) => {
    if (e.button !== 0) return;
    const svgPos = getSVGPos(e);
    const node = nodes.find(n => n.id === nodeId);
    setDragging({ nodeId, startSVG: svgPos, origPos: { x: node.x, y: node.y } });
    setSelected({ type: 'node', id: nodeId });
    setConnecting(null);
  }, [nodes, getSVGPos]);

  // ── port mouse down (start connecting) ────────────────────────────────────
  const handlePortMouseDown = useCallback((e, nodeId, port) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const svgPos = getSVGPos(e);
    setConnecting({ fromNodeId: nodeId, fromPort: port, curPos: svgPos });
    setDragging(null);
  }, [getSVGPos]);

  // ── mouse move ────────────────────────────────────────────────────────────
  const handleCanvasMouseMove = useCallback(e => {
    const svgPos = getSVGPos(e);

    if (panning) {
      const dx = e.clientX - panning.startClient.x;
      const dy = e.clientY - panning.startClient.y;
      setViewport({ ...panning.origVP, x: panning.origVP.x + dx, y: panning.origVP.y + dy });
      return;
    }

    if (dragging) {
      const dx = svgPos.x - dragging.startSVG.x;
      const dy = svgPos.y - dragging.startSVG.y;
      setNodes(ns => ns.map(n =>
        n.id === dragging.nodeId
          ? { ...n, x: dragging.origPos.x + dx, y: dragging.origPos.y + dy }
          : n
      ));
      return;
    }

    if (connecting) {
      setConnecting(c => ({ ...c, curPos: svgPos }));
      // Highlight nearest port
      const hit = nearestPort(nodes, svgPos.x, svgPos.y, 28, connecting.fromNodeId);
      setHoveredNodeId(hit ? hit.nodeId : null);
      return;
    }

    // Hover detection for ports
    let found = null;
    for (const n of nodes) {
      const hw = n.width / 2 + 8, hh = n.height / 2 + 8;
      if (svgPos.x >= n.x - hw && svgPos.x <= n.x + hw && svgPos.y >= n.y - hh && svgPos.y <= n.y + hh) {
        found = n.id;
        break;
      }
    }
    setHoveredNodeId(found);
  }, [panning, dragging, connecting, nodes, getSVGPos]);

  // ── mouse up ──────────────────────────────────────────────────────────────
  const handleCanvasMouseUp = useCallback(e => {
    if (panning) { setPanning(null); document.body.style.cursor = ''; return; }
    if (dragging) { setDragging(null); return; }

    if (connecting) {
      const svgPos = getSVGPos(e);
      const hit = nearestPort(nodes, svgPos.x, svgPos.y, 30, connecting.fromNodeId);
      if (hit) {
        // Avoid duplicate edges
        const exists = edges.some(
          ed => ed.fromId === connecting.fromNodeId && ed.fromPort === connecting.fromPort &&
                ed.toId   === hit.nodeId            && ed.toPort   === hit.port
        );
        if (!exists) {
          setEdges(es => [...es, {
            id: uid(),
            fromId:   connecting.fromNodeId,
            fromPort: connecting.fromPort,
            toId:     hit.nodeId,
            toPort:   hit.port,
            label:    '',
            labelFontSize: 12,
          }]);
        }
      }
      setConnecting(null);
      setHoveredNodeId(null);
    }
  }, [panning, dragging, connecting, nodes, edges, getSVGPos]);

  // ── double-click node (edit text) ─────────────────────────────────────────
  const handleNodeDoubleClick = useCallback((e, nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setEditingText({ id: nodeId, type: 'node', value: node.text || '', fontSize: node.fontSize || 13 });
    setSelected({ type: 'node', id: nodeId });
  }, [nodes]);

  // ── double-click edge (edit label) ────────────────────────────────────────
  const handleEdgeDoubleClick = useCallback((e, edgeId) => {
    const edge = edges.find(ed => ed.id === edgeId);
    if (!edge) return;
    setEditingText({ id: edgeId, type: 'edge', value: edge.label || '', fontSize: edge.labelFontSize || 12 });
    setSelected({ type: 'edge', id: edgeId });
  }, [edges]);

  // ── commit text edit ──────────────────────────────────────────────────────
  const handleEditingTextCommit = useCallback(() => {
    if (!editingText) return;
    if (editingText.type === 'node') {
      setNodes(ns => ns.map(n => n.id === editingText.id ? { ...n, text: editingText.value } : n));
    } else {
      setEdges(es => es.map(e => e.id === editingText.id ? { ...e, label: editingText.value } : e));
    }
    setEditingText(null);
  }, [editingText]);

  // ── drop from palette ─────────────────────────────────────────────────────
  const handleDrop = useCallback(e => {
    e.preventDefault();
    const type = e.dataTransfer.getData('nodeType');
    if (!type || !NODE_DEFAULTS[type]) return;
    const svgPos = getSVGPos(e);
    setNodes(ns => [...ns, makeNode(type, svgPos.x, svgPos.y)]);
  }, [getSVGPos]);

  const handleDragOver = useCallback(e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }, []);

  // ── delete selected ───────────────────────────────────────────────────────
  const handleDeleteSelected = useCallback(() => {
    if (!selected) return;
    if (selected.type === 'node') {
      setNodes(ns => ns.filter(n => n.id !== selected.id));
      setEdges(es => es.filter(e => e.fromId !== selected.id && e.toId !== selected.id));
    } else {
      setEdges(es => es.filter(e => e.id !== selected.id));
    }
    setSelected(null);
  }, [selected]);

  // ── toolbar helpers ───────────────────────────────────────────────────────
  const updateSelectedNode = (patch) => {
    if (selected?.type !== 'node') return;
    setNodes(ns => ns.map(n => n.id === selected.id ? { ...n, ...patch } : n));
  };
  const updateSelectedEdge = (patch) => {
    if (selected?.type !== 'edge') return;
    setEdges(es => es.map(e => e.id === selected.id ? { ...e, ...patch } : e));
  };

  const selectedNode = selected?.type === 'node' ? nodes.find(n => n.id === selected.id) : null;
  const selectedEdge = selected?.type === 'edge' ? edges.find(e => e.id === selected.id) : null;

  const handleNew = () => {
    if (nodes.length === 0) {
      setNodes([]); setEdges([]); setSelected(null);
    } else {
      showConfirm(
        'New flowchart',
        'This will clear the canvas. Any unsaved changes will be lost.',
        () => { setNodes([]); setEdges([]); setSelected(null); }
      );
    }
  };

  return (
    <>
    <div className="app">
      <Toolbar
        scale={viewport.scale}
        onNew={handleNew}
        onImport={() => importJSON(
          (ns, es) => { setNodes(ns); setEdges(es); setSelected(null); },
          (title, message) => showAlert(title, message)
        )}
        onExportJSON={() => exportJSON(nodes, edges)}
        onExportSVG={() => exportSVG(svgRef.current)}
        onPrint={printDiagram}
        onZoomIn={() => setViewport(v => ({ ...v, scale: Math.min(4, v.scale * 1.2) }))}
        onZoomOut={() => setViewport(v => ({ ...v, scale: Math.max(0.15, v.scale / 1.2) }))}
        onZoomReset={() => setViewport({ x: 60, y: 60, scale: 1 })}
        selected={selected}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        onDeleteSelected={handleDeleteSelected}
        onTextChange={val => updateSelectedNode({ text: val })}
        onFontSizeChange={val => updateSelectedNode({ fontSize: val })}
        onFontWeightToggle={() => updateSelectedNode({ fontWeight: selectedNode?.fontWeight === 'bold' ? 'normal' : 'bold' })}
        onTextPosChange={val => updateSelectedNode({ textPos: val })}
        onEdgeLabelChange={val => updateSelectedEdge({ label: val })}
        onEdgeLabelFontSizeChange={val => updateSelectedEdge({ labelFontSize: val })}
      />
      <div className="main-area">
        <Palette />
        <Canvas
          nodes={nodes}
          edges={edges}
          viewport={viewport}
          selected={selected}
          hoveredNodeId={hoveredNodeId}
          connecting={connecting}
          svgRef={svgRef}
          onWheel={handleWheel}
          onCanvasMouseDown={handleCanvasMouseDown}
          onCanvasMouseMove={handleCanvasMouseMove}
          onCanvasMouseUp={handleCanvasMouseUp}
          onNodeMouseDown={handleNodeMouseDown}
          onPortMouseDown={handlePortMouseDown}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeClick={(e, id) => setSelected({ type: 'edge', id })}
          onEdgeDoubleClick={handleEdgeDoubleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onNodeHover={setHoveredNodeId}
          editingText={editingText}
          onEditingTextChange={val => setEditingText(et => ({ ...et, value: val }))}
          onEditingTextCommit={handleEditingTextCommit}
        />
      </div>
      <CMFloatAd color="black"/>
    </div>
    {modal && (
      <Modal
        title={modal.title}
        message={modal.message}
        confirmLabel={modal.confirmLabel}
        cancelLabel={modal.cancelLabel}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
    )}

  </>
  );
}

