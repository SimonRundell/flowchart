import { getPortPos, getBezierPath, edgeMidpoint } from '../utils/geometry';

export default function EdgePath({ edge, nodes, selected, onMouseDown, onDoubleClick }) {
  const fromNode = nodes.find(n => n.id === edge.fromId);
  const toNode   = nodes.find(n => n.id === edge.toId);
  if (!fromNode || !toNode) return null;

  const fromPos = getPortPos(fromNode, edge.fromPort);
  const toPos   = getPortPos(toNode,   edge.toPort);
  const { d, cp1, cp2 } = getBezierPath(fromPos, toPos, edge.fromPort, edge.toPort);
  const mid = edgeMidpoint(fromPos, toPos, cp1, cp2);

  return (
    <g onMouseDown={onMouseDown} onDoubleClick={onDoubleClick} style={{ cursor: 'pointer' }}>
      {/* Wide invisible hit area */}
      <path d={d} stroke="transparent" strokeWidth={12} fill="none" />
      {/* Visible path */}
      <path
        d={d}
        stroke={selected ? '#3182ce' : '#1a202c'}
        strokeWidth={selected ? 2.5 : 2}
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      {/* Edge label */}
      {edge.label && (
        <text
          x={mid.x} y={mid.y - 8}
          textAnchor="middle"
          fontSize={edge.labelFontSize || 12}
          fontFamily="Arial, sans-serif"
          fill={selected ? '#3182ce' : '#1a202c'}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

export function TempEdge({ fromPos, toPos, fromPort }) {
  if (!fromPos || !toPos) return null;
  const toPort = 'top';
  const { d } = getBezierPath(fromPos, toPos, fromPort, toPort);
  return (
    <path
      d={d}
      stroke="#3182ce"
      strokeWidth={2}
      strokeDasharray="6 4"
      fill="none"
      markerEnd="url(#arrowhead)"
      style={{ pointerEvents: 'none' }}
    />
  );
}
