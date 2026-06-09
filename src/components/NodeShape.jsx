import { getAllPortPositions } from '../utils/geometry';

const FILL = '#ffffff';
const STROKE = '#1a202c';
const SW = 2;

function ShapeGeometry({ type, w, h }) {
  const hw = w / 2, hh = h / 2;
  switch (type) {
    case 'terminal':
      return <rect x={-hw} y={-hh} width={w} height={h} rx={hh} ry={hh} fill={FILL} stroke={STROKE} strokeWidth={SW} />;
    case 'process':
      return <rect x={-hw} y={-hh} width={w} height={h} fill={FILL} stroke={STROKE} strokeWidth={SW} />;
    case 'subprocess':
      return (
        <g>
          <rect x={-hw} y={-hh} width={w} height={h} fill={FILL} stroke={STROKE} strokeWidth={SW} />
          <line x1={-hw + 12} y1={-hh} x2={-hw + 12} y2={hh} stroke={STROKE} strokeWidth={SW} />
          <line x1={hw - 12}  y1={-hh} x2={hw - 12}  y2={hh} stroke={STROKE} strokeWidth={SW} />
        </g>
      );
    case 'decision':
      return (
        <polygon
          points={`0,${-hh} ${hw},0 0,${hh} ${-hw},0`}
          fill={FILL} stroke={STROKE} strokeWidth={SW}
        />
      );
    case 'io': {
      const off = 20;
      return (
        <polygon
          points={`${-hw + off},${-hh} ${hw},${-hh} ${hw - off},${hh} ${-hw},${hh}`}
          fill={FILL} stroke={STROKE} strokeWidth={SW}
        />
      );
    }
    case 'connector':
      return <circle cx={0} cy={0} r={hw} fill={FILL} stroke={STROKE} strokeWidth={SW} />;
    default:
      return <rect x={-hw} y={-hh} width={w} height={h} fill={FILL} stroke={STROKE} strokeWidth={SW} />;
  }
}

function NodeText({ node }) {
  const { text = '', fontSize = 13, fontWeight = 'normal', textPos = 'inside', width, height } = node;
  if (!text) return null;

  const lines = text.split('\n');
  const lineH = fontSize * 1.3;
  const totalH = lines.length * lineH;

  let tx = 0, ty = 0, anchor = 'middle';
  if (textPos === 'inside') {
    ty = -totalH / 2 + fontSize * 0.4;
  } else if (textPos === 'above') {
    ty = -height / 2 - 8 - totalH;
    anchor = 'middle';
  } else if (textPos === 'below') {
    ty = height / 2 + fontSize + 4;
    anchor = 'middle';
  } else if (textPos === 'left') {
    tx = -width / 2 - 8;
    ty = -totalH / 2 + fontSize * 0.4;
    anchor = 'end';
  } else if (textPos === 'right') {
    tx = width / 2 + 8;
    ty = -totalH / 2 + fontSize * 0.4;
    anchor = 'start';
  }

  return (
    <text
      x={tx} y={ty}
      textAnchor={anchor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily="Arial, sans-serif"
      fill="#1a202c"
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={tx} dy={i === 0 ? 0 : lineH}>{line}</tspan>
      ))}
    </text>
  );
}

export default function NodeShape({
  node,
  selected,
  hovered,
  showPorts,
  connectingFromThisNode,
  onMouseDown,
  onPortMouseDown,
  onDoubleClick,
}) {
  const { x, y, width: w, height: h, type } = node;
  const ports = getAllPortPositions(node);

  const selColor = '#3182ce';
  const portColor = '#3182ce';

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Selection ring */}
      {selected && (
        <rect
          x={-w / 2 - 5} y={-h / 2 - 5}
          width={w + 10} height={h + 10}
          rx={type === 'connector' ? w / 2 + 5 : 4}
          fill="none" stroke={selColor} strokeWidth={2} strokeDasharray="6 3"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Clickable body */}
      <g
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        style={{ cursor: 'move' }}
      >
        <ShapeGeometry type={type} w={w} h={h} />
        <NodeText node={node} />
      </g>

      {/* Port handles */}
      {(showPorts || selected) && ports.map(({ port, x: px, y: py }) => (
        <circle
          key={port}
          cx={px - x} cy={py - y}
          r={6}
          fill={portColor}
          stroke="white"
          strokeWidth={2}
          style={{ cursor: 'crosshair' }}
          onMouseDown={(e) => { e.stopPropagation(); onPortMouseDown(e, port); }}
        />
      ))}
    </g>
  );
}
