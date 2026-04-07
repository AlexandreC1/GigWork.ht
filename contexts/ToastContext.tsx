import React, { createContext, useCallback, useState, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{ toasts: Toast[]; onDismiss: (id: number) => void }> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => {
        const color =
          t.type === 'success'
            ? 'bg-green-600'
            : t.type === 'error'
            ? 'bg-red-600'
            : 'bg-brand-primary';
        return (
          <div
            key={t.id}
            className={`${color} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 animate-fade-in`}
            role="status"
          >
            <span className="text-sm">{t.message}</span>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss"
              className="text-white/80 hover:text-white font-bold"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
