import { useRef, useEffect } from 'react';
import NodeShape from './NodeShape';
import EdgePath, { TempEdge } from './EdgePath';
import { getPortPos, clientToSVG } from '../utils/geometry';

export default function Canvas({
  nodes, edges, viewport,
  selected, hoveredNodeId, connecting,
  svgRef,
  onWheel,
  onCanvasMouseDown,
  onCanvasMouseMove,
  onCanvasMouseUp,
  onNodeMouseDown,
  onPortMouseDown,
  onNodeDoubleClick,
  onEdgeClick,
  onEdgeDoubleClick,
  onDrop,
  onDragOver,
  onNodeHover,
  editingText,
  onEditingTextChange,
  onEditingTextCommit,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingText && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingText?.id]);

  // Compute screen position for the text editor overlay
  let editorStyle = null;
  if (editingText && svgRef.current) {
    const rect = svgRef.current.getBoundingClientRect();
    const node = nodes.find(n => n.id === editingText.id) ||
                 edges.find(e => e.id === editingText.id);
    if (node) {
      const isEdge = 'fromId' in node;
      let cx, cy, w;
      if (isEdge) {
        const fn = nodes.find(n => n.id === node.fromId);
        const tn = nodes.find(n => n.id === node.toId);
        if (fn && tn) {
          const fp = getPortPos(fn, node.fromPort);
          const tp = getPortPos(tn, node.toPort);
          cx = (fp.x + tp.x) / 2;
          cy = (fp.y + tp.y) / 2 - 24;
          w = 120;
        }
      } else {
        cx = node.x; cy = node.y; w = Math.max(node.width - 8, 80);
      }
      if (cx !== undefined) {
        const sx = rect.left + cx * viewport.scale + viewport.x;
        const sy = rect.top  + cy * viewport.scale + viewport.y;
        editorStyle = {
          position: 'fixed',
          left: sx - (w * viewport.scale) / 2,
          top:  sy - 18 * viewport.scale,
          width: w * viewport.scale,
          fontSize: ((editingText.fontSize || 13) * viewport.scale) + 'px',
          zIndex: 1000,
        };
      }
    }
  }

  const connectingFromPos = connecting
    ? (() => {
        const fn = nodes.find(n => n.id === connecting.fromNodeId);
        return fn ? getPortPos(fn, connecting.fromPort) : null;
      })()
    : null;

  return (
    <div className="canvas-wrapper">
      <svg
        ref={svgRef}
        className="canvas-svg"
        onWheel={onWheel}
        onMouseDown={onCanvasMouseDown}
        onMouseMove={onCanvasMouseMove}
        onMouseUp={onCanvasMouseUp}
        onMouseLeave={onCanvasMouseUp}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#1a202c" />
          </marker>
          <marker id="arrowhead-sel" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3182ce" />
          </marker>
        </defs>

        <g transform={`translate(${viewport.x},${viewport.y}) scale(${viewport.scale})`}>
          {/* Grid dots */}
          <GridDots viewport={viewport} />

          {/* Edges */}
          {edges.map(edge => (
            <EdgePath
              key={edge.id}
              edge={edge}
              nodes={nodes}
              selected={selected?.type === 'edge' && selected.id === edge.id}
              onMouseDown={e => { e.stopPropagation(); onEdgeClick(e, edge.id); }}
              onDoubleClick={e => { e.stopPropagation(); onEdgeDoubleClick(e, edge.id); }}
            />
          ))}

          {/* Temporary connecting line */}
          {connecting && connectingFromPos && (
            <TempEdge
              fromPos={connectingFromPos}
              toPos={connecting.curPos}
              fromPort={connecting.fromPort}
            />
          )}

          {/* Nodes */}
          {nodes.map(node => (
            <NodeShape
              key={node.id}
              node={node}
              selected={selected?.type === 'node' && selected.id === node.id}
              hovered={hoveredNodeId === node.id}
              showPorts={hoveredNodeId === node.id || (selected?.type === 'node' && selected.id === node.id)}
              connectingFromThisNode={connecting?.fromNodeId === node.id}
              onMouseDown={e => { e.stopPropagation(); onNodeMouseDown(e, node.id); }}
              onPortMouseDown={(e, port) => onPortMouseDown(e, node.id, port)}
              onDoubleClick={e => { e.stopPropagation(); onNodeDoubleClick(e, node.id); }}
            />
          ))}
        </g>
      </svg>

      {/* Floating text editor */}
      {editingText && editorStyle && (
        <textarea
          ref={inputRef}
          className="floating-editor"
          style={editorStyle}
          value={editingText.value}
          onChange={e => onEditingTextChange(e.target.value)}
          onBlur={onEditingTextCommit}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onEditingTextCommit(); }
            if (e.key === 'Escape') onEditingTextCommit();
          }}
          rows={3}
        />
      )}
    </div>
  );
}

function GridDots() {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <defs>
        <pattern id="grid-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.2" fill="#cbd5e0" />
        </pattern>
      </defs>
      <rect x="-500" y="-500" width="6000" height="5000" fill="url(#grid-dots)" />
    </g>
  );
}
