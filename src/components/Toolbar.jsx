export default function Toolbar({
  onNew, onImport, onExportJSON, onExportSVG, onPrint,
  onZoomIn, onZoomOut, onZoomReset, scale,
  selected, selectedNode, onDeleteSelected,
  onTextChange, onFontSizeChange, onFontWeightToggle, onTextPosChange,
  selectedEdge, onEdgeLabelChange, onEdgeLabelFontSizeChange,
}) {
  const pct = Math.round(scale * 100);

  return (
    <header className="toolbar">
      <div className="toolbar-group">
        <span className="toolbar-title">Flowchart Boss</span>
      </div>

      <div className="toolbar-group">
        <button className="tb-btn" onClick={onNew} title="New">&#128196; New</button>
        <button className="tb-btn" onClick={onImport} title="Import JSON">&#128229; Import</button>
        <button className="tb-btn" onClick={onExportJSON} title="Export JSON">&#128228; Export JSON</button>
        <button className="tb-btn" onClick={onExportSVG} title="Export SVG">&#128247; Export SVG</button>
        <button className="tb-btn" onClick={onPrint} title="Print / Save as PDF">&#128438; Print / PDF</button>
      </div>

      <div className="toolbar-group">
        <button className="tb-btn icon" onClick={onZoomOut} title="Zoom out">&#8722;</button>
        <span className="zoom-label">{pct}%</span>
        <button className="tb-btn icon" onClick={onZoomIn} title="Zoom in">&#43;</button>
        <button className="tb-btn" onClick={onZoomReset} title="Reset zoom">Reset</button>
      </div>

      {selectedNode && (
        <div className="toolbar-group props-group">
          <textarea
            className="tb-text-input"
            value={selectedNode.text || ''}
            onChange={e => onTextChange(e.target.value)}
            placeholder="Label…"
            rows={2}
          />
          <select
            className="tb-select"
            value={selectedNode.fontSize || 13}
            onChange={e => onFontSizeChange(Number(e.target.value))}
            title="Font size"
          >
            {[9, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32].map(s => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
          <button
            className={`tb-btn icon ${selectedNode.fontWeight === 'bold' ? 'active' : ''}`}
            onClick={onFontWeightToggle}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <select
            className="tb-select"
            value={selectedNode.textPos || 'inside'}
            onChange={e => onTextPosChange(e.target.value)}
            title="Text position"
          >
            <option value="inside">Inside</option>
            <option value="above">Above</option>
            <option value="below">Below</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
          <button className="tb-btn danger" onClick={onDeleteSelected} title="Delete node">&#128465; Delete</button>
        </div>
      )}

      {selectedEdge && !selectedNode && (
        <div className="toolbar-group props-group">
          <input
            className="tb-text-input single"
            value={selectedEdge.label || ''}
            onChange={e => onEdgeLabelChange(e.target.value)}
            placeholder="Edge label (e.g. Yes / No)"
          />
          <select
            className="tb-select"
            value={selectedEdge.labelFontSize || 12}
            onChange={e => onEdgeLabelFontSizeChange(Number(e.target.value))}
          >
            {[9, 10, 11, 12, 13, 14, 16, 18].map(s => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
          <button className="tb-btn danger" onClick={onDeleteSelected} title="Delete edge">&#128465; Delete</button>
        </div>
      )}
    </header>
  );
}
