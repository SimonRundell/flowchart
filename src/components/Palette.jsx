const SYMBOLS = [
  {
    type: 'terminal',
    label: 'Terminal',
    desc: 'Start / End',
    preview: ({ w, h }) => (
      <rect x={2} y={2} width={w - 4} height={h - 4} rx={(h - 4) / 2} ry={(h - 4) / 2}
        fill="white" stroke="#1a202c" strokeWidth={2} />
    ),
  },
  {
    type: 'process',
    label: 'Process',
    desc: 'Process',
    preview: ({ w, h }) => (
      <rect x={2} y={2} width={w - 4} height={h - 4} fill="white" stroke="#1a202c" strokeWidth={2} />
    ),
  },
  {
    type: 'subprocess',
    label: 'Sub-Process',
    desc: 'Sub-Process',
    preview: ({ w, h }) => (
      <g>
        <rect x={2} y={2} width={w - 4} height={h - 4} fill="white" stroke="#1a202c" strokeWidth={2} />
        <line x1={12} y1={2} x2={12} y2={h - 2} stroke="#1a202c" strokeWidth={2} />
        <line x1={w - 12} y1={2} x2={w - 12} y2={h - 2} stroke="#1a202c" strokeWidth={2} />
      </g>
    ),
  },
  {
    type: 'decision',
    label: 'Decision',
    desc: 'Decision',
    preview: ({ w, h }) => (
      <polygon
        points={`${w / 2},2 ${w - 2},${h / 2} ${w / 2},${h - 2} 2,${h / 2}`}
        fill="white" stroke="#1a202c" strokeWidth={2}
      />
    ),
  },
  {
    type: 'io',
    label: 'Input / Output',
    desc: 'Input / Output',
    preview: ({ w, h }) => {
      const off = 14;
      return (
        <polygon
          points={`${off + 2},2 ${w - 2},2 ${w - off - 2},${h - 2} 2,${h - 2}`}
          fill="white" stroke="#1a202c" strokeWidth={2}
        />
      );
    },
  },
  {
    type: 'connector',
    label: 'Connector',
    desc: 'Off-page connector',
    preview: ({ w, h }) => (
      <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) / 2 - 3}
        fill="white" stroke="#1a202c" strokeWidth={2} />
    ),
  },
  {
    type: 'arrow',
    label: 'Flow Arrow',
    desc: 'Flow arrow (drag)',
    preview: ({ w, h }) => (
      <g>
        <line x1={6} y1={h / 2} x2={w - 10} y2={h / 2} stroke="#1a202c" strokeWidth={2} markerEnd="url(#pal-arrow)" />
        <defs>
          <marker id="pal-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#1a202c" />
          </marker>
        </defs>
      </g>
    ),
    isArrow: true,
  },
];

const PW = 88, PH = 48;

export default function Palette() {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('nodeType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="palette">
      <div className="palette-title">Symbols</div>
      {SYMBOLS.filter(s => !s.isArrow).map(sym => (
        <div
          key={sym.type}
          className="palette-item"
          draggable
          onDragStart={e => handleDragStart(e, sym.type)}
          title={`Drag to add: ${sym.desc}`}
        >
          <svg width={PW} height={PH} viewBox={`0 0 ${PW} ${PH}`} xmlns="http://www.w3.org/2000/svg">
            <sym.preview w={PW} h={PH} />
          </svg>
          <span className="palette-label">{sym.label}</span>
        </div>
      ))}
      <div className="palette-divider" />
      <div className="palette-hint">
        <div>→ Drag symbol to canvas</div>
        <div>→ Click node to select</div>
        <div>→ Drag port dot to connect</div>
        <div>→ Double-click to edit text</div>
        <div>→ Scroll to zoom</div>
        <div>→ Space+drag to pan</div>
        <div>→ Delete key removes</div>
      </div>
    </aside>
  );
}
