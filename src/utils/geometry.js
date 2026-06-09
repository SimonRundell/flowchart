export const NODE_DEFAULTS = {
  terminal:   { width: 160, height: 52 },
  process:    { width: 160, height: 72 },
  subprocess: { width: 160, height: 72 },
  decision:   { width: 150, height: 90 },
  io:         { width: 160, height: 70 },
  connector:  { width: 62,  height: 62 },
};

export const PORTS = ['top', 'right', 'bottom', 'left'];

export function getPortPos(node, port) {
  const hw = node.width / 2;
  const hh = node.height / 2;
  switch (port) {
    case 'top':    return { x: node.x,      y: node.y - hh };
    case 'bottom': return { x: node.x,      y: node.y + hh };
    case 'left':   return { x: node.x - hw, y: node.y };
    case 'right':  return { x: node.x + hw, y: node.y };
    default:       return { x: node.x,      y: node.y };
  }
}

export function getAllPortPositions(node) {
  return PORTS.map(p => ({ port: p, ...getPortPos(node, p) }));
}

export function nearestPort(nodes, x, y, threshold = 24, excludeNodeId = null) {
  let best = null;
  let bestDist = threshold;
  for (const node of nodes) {
    if (node.id === excludeNodeId) continue;
    for (const { port, x: px, y: py } of getAllPortPositions(node)) {
      const d = Math.hypot(px - x, py - y);
      if (d < bestDist) {
        bestDist = d;
        best = { nodeId: node.id, port };
      }
    }
  }
  return best;
}

export function hitTestNode(node, x, y) {
  const hw = node.width / 2 + 4;
  const hh = node.height / 2 + 4;
  return x >= node.x - hw && x <= node.x + hw && y >= node.y - hh && y <= node.y + hh;
}

export function edgeMidpoint(p1, p2, cp1, cp2) {
  const t = 0.5;
  const mt = 1 - t;
  return {
    x: mt*mt*mt*p1.x + 3*mt*mt*t*cp1.x + 3*mt*t*t*cp2.x + t*t*t*p2.x,
    y: mt*mt*mt*p1.y + 3*mt*mt*t*cp1.y + 3*mt*t*t*cp2.y + t*t*t*p2.y,
  };
}

export function getBezierPath(fromPos, toPos, fromPort, toPort) {
  const dist = Math.max(60, Math.hypot(toPos.x - fromPos.x, toPos.y - fromPos.y) * 0.45);
  const portDir = { top: [0,-1], bottom: [0,1], left: [-1,0], right: [1,0] };
  const [fx, fy] = portDir[fromPort] || [0,1];
  const [tx, ty] = portDir[toPort]   || [0,-1];
  const cp1 = { x: fromPos.x + fx * dist, y: fromPos.y + fy * dist };
  const cp2 = { x: toPos.x   + tx * dist, y: toPos.y   + ty * dist };
  return {
    d: `M ${fromPos.x} ${fromPos.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${toPos.x} ${toPos.y}`,
    cp1, cp2,
  };
}

export function clientToSVG(clientX, clientY, svgRect, viewport) {
  return {
    x: (clientX - svgRect.left - viewport.x) / viewport.scale,
    y: (clientY - svgRect.top  - viewport.y) / viewport.scale,
  };
}
