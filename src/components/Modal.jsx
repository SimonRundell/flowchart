import { useEffect, useRef } from 'react';

export default function Modal({ title, message, confirmLabel = 'OK', cancelLabel, onConfirm, onCancel }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const handleKey = e => {
      if (e.key === 'Escape' && onCancel) onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onConfirm, onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel || onConfirm}>
      <div className="modal-box" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          {cancelLabel && (
            <button className="modal-btn secondary" onClick={onCancel}>{cancelLabel}</button>
          )}
          <button ref={confirmRef} className="modal-btn primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
