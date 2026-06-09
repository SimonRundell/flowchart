import { useState, useEffect, useCallback } from 'react';
import { MODULES } from '../data/lessons';

const STORAGE_KEY = 'flowchart_learning_progress';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function moduleStats(mod, progress) {
  const total = mod.items.length;
  const done  = mod.items.filter(it => progress[it.id]).length;
  return { total, done };
}

function totalStats(progress) {
  let total = 0, done = 0;
  MODULES.forEach(m => { m.items.forEach(it => { total++; if (progress[it.id]) done++; }); });
  return { total, done };
}

// ── Mini shape SVGs for the symbol table ─────────────────────────────────────
function ShapePreview({ shape }) {
  const w = 48, h = 28;
  switch (shape) {
    case 'rounded-rect':
      return <rect x={1} y={1} width={w-2} height={h-2} rx={13} ry={13} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
    case 'rect':
      return <rect x={1} y={1} width={w-2} height={h-2} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
    case 'subprocess':
      return <g><rect x={1} y={1} width={w-2} height={h-2} fill="white" stroke="#1a202c" strokeWidth={1.5} /><line x1={9} y1={1} x2={9} y2={h-1} stroke="#1a202c" strokeWidth={1.5}/><line x1={w-9} y1={1} x2={w-9} y2={h-1} stroke="#1a202c" strokeWidth={1.5}/></g>;
    case 'diamond':
      return <polygon points={`${w/2},2 ${w-2},${h/2} ${w/2},${h-2} 2,${h/2}`} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
    case 'parallelogram':
      return <polygon points={`${10},1 ${w-1},1 ${w-10},${h-1} 1,${h-1}`} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
    case 'circle':
      return <circle cx={w/2} cy={h/2} r={h/2-2} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
    default:
      return <rect x={1} y={1} width={w-2} height={h-2} fill="white" stroke="#1a202c" strokeWidth={1.5} />;
  }
}

// ── Content block renderer ────────────────────────────────────────────────────
function ContentBlock({ block }) {
  switch (block.type) {
    case 'para':
      return <p className="ld-para">{block.text}</p>;
    case 'heading':
      return <h4 className="ld-subheading">{block.text}</h4>;
    case 'tip':
      return <div className="ld-tip"><span className="ld-tip-icon">💡</span>{block.text}</div>;
    case 'list':
      return (
        <ul className="ld-list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'code':
      return (
        <div className="ld-code-block">
          {block.label && <div className="ld-code-label">{block.label}</div>}
          <pre className="ld-code"><code>{block.text}</code></pre>
        </div>
      );
    case 'symbol-table':
      return (
        <div className="ld-symbol-table">
          {block.rows.map(row => (
            <div key={row.name} className="ld-symbol-row">
              <svg width={48} height={28} viewBox="0 0 48 28" className="ld-symbol-svg">
                <ShapePreview shape={row.shape} />
              </svg>
              <div className="ld-symbol-text">
                <strong>{row.name}</strong>
                <span>{row.meaning}</span>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────
const DIFF_COLOUR = {
  Starter:      '#48bb78',
  Beginner:     '#4299e1',
  Intermediate: '#ed8936',
  Advanced:     '#e53e3e',
  Expert:       '#805ad5',
};

function DiffBadge({ level }) {
  if (!level) return null;
  return (
    <span className="ld-badge" style={{ background: DIFF_COLOUR[level] || '#718096' }}>
      {level}
    </span>
  );
}

// ── Single item (lesson or task) ──────────────────────────────────────────────
function LearningItem({ item, done, onToggleDone, isOpen, onToggleOpen }) {
  const isTask = item.type === 'task';
  return (
    <div className={`ld-item ${isOpen ? 'ld-item--open' : ''} ${done ? 'ld-item--done' : ''}`}>
      <button className="ld-item-header" onClick={onToggleOpen}>
        <span className="ld-item-done-dot" title={done ? 'Complete' : 'Not yet complete'}>
          {done ? '✓' : '○'}
        </span>
        <span className="ld-item-title">{item.title}</span>
        {isTask && item.difficulty && <DiffBadge level={item.difficulty} />}
        <span className="ld-item-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="ld-item-body">
          {isTask && (
            <div className="ld-objective">
              <strong>Objective:</strong> {item.objective}
            </div>
          )}

          {item.content.map((block, i) => <ContentBlock key={i} block={block} />)}

          {isTask && item.hints && item.hints.length > 0 && (
            <details className="ld-hints">
              <summary>Show hints</summary>
              <ul className="ld-list">
                {item.hints.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </details>
          )}

          <div className="ld-item-footer">
            <button
              className={`ld-done-btn ${done ? 'ld-done-btn--done' : ''}`}
              onClick={() => onToggleDone(item.id)}
            >
              {done ? '✓ Marked complete' : 'Mark as complete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Module section ────────────────────────────────────────────────────────────
function ModuleSection({ mod, progress, openItemId, onToggleItem, onToggleDone }) {
  const { total, done } = moduleStats(mod, progress);
  const allDone = done === total;
  return (
    <div className="ld-module">
      <div className="ld-module-header">
        <span className="ld-module-title">{mod.title}</span>
        <span className={`ld-module-count ${allDone ? 'ld-module-count--done' : ''}`}>
          {done}/{total}
        </span>
      </div>
      {mod.items.map(item => (
        <LearningItem
          key={item.id}
          item={item}
          done={!!progress[item.id]}
          onToggleDone={onToggleDone}
          isOpen={openItemId === item.id}
          onToggleOpen={() => onToggleItem(item.id)}
        />
      ))}
    </div>
  );
}

// ── Main drawer ───────────────────────────────────────────────────────────────
export default function LearningDrawer({ open, onToggle }) {
  const [progress,    setProgress]    = useState(loadProgress);
  const [openItemId,  setOpenItemId]  = useState(null);

  useEffect(() => { saveProgress(progress); }, [progress]);

  const handleToggleDone = useCallback((id) => {
    setProgress(p => ({ ...p, [id]: !p[id] }));
  }, []);

  const handleToggleItem = useCallback((id) => {
    setOpenItemId(cur => cur === id ? null : id);
  }, []);

  const { total, done } = totalStats(progress);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <>
      {/* Toggle tab — always visible */}
      <button
        className={`ld-tab ${open ? 'ld-tab--open' : ''}`}
        onClick={onToggle}
        title={open ? 'Close Learning Centre' : 'Open Learning Centre'}
        aria-label={open ? 'Close Learning Centre' : 'Open Learning Centre'}
      >
        <span className="ld-tab-label">Learning</span>
      </button>

      {/* Drawer panel */}
      <aside className={`ld-drawer ${open ? 'ld-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="ld-drawer-header">
          <div className="ld-drawer-title">Learning Centre</div>
          <button className="ld-close-btn" onClick={onToggle} aria-label="Close">✕</button>
        </div>

        {/* Overall progress bar */}
        <div className="ld-progress-bar-wrap">
          <div className="ld-progress-bar-track">
            <div className="ld-progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="ld-progress-label">{done} of {total} complete</span>
        </div>

        {/* Scrollable content */}
        <div className="ld-drawer-body">
          {MODULES.map(mod => (
            <ModuleSection
              key={mod.id}
              mod={mod}
              progress={progress}
              openItemId={openItemId}
              onToggleItem={handleToggleItem}
              onToggleDone={handleToggleDone}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
