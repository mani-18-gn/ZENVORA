import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './ToastContainer.css';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-floating-container" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast-card ${toast.type}`}>
          <div className="toast-icon-wrap">
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
          </div>
          <span className="toast-text">{toast.text}</span>
          <button 
            className="toast-close-btn" 
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
