// src/components/ToastProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AlertColor } from "@mui/material";
import Toast, { ToastMessage } from "./Toast";

interface ToastContextType {
  showToast: (message: string, type: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const showToast = (message: string, type: AlertColor, duration = 4000) => {
    const id = generateId();
    const toast: ToastMessage = { id, message, type, duration };

    setToasts(prev => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration + 500); // Add small buffer
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message: string, duration?: number) => {
    showToast(message, "success", duration);
  };

  const showError = (message: string, duration?: number) => {
    showToast(message, "error", duration);
  };

  const showWarning = (message: string, duration?: number) => {
    showToast(message, "warning", duration);
  };

  const showInfo = (message: string, duration?: number) => {
    showToast(message, "info", duration);
  };

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
