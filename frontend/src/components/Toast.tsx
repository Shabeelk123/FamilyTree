// src/components/Toast.tsx
import React, { useEffect } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

export interface ToastMessage {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  const handleClose = () => {
    setOpen(false);
    onClose(toast.id);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ mt: 8 }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
