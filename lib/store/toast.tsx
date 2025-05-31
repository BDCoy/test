import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto remove toast after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, toast.duration || 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const toast = {
  success: (message: string, duration = 5000) => {
    useToastStore.getState().addToast({
      message,
      type: "success",
      duration,
    });
  },
  error: (message: string, duration = 5000) => {
    useToastStore.getState().addToast({
      message,
      type: "error",
      duration,
    });
  },
  info: (message: string, duration = 5000) => {
    useToastStore.getState().addToast({
      message,
      type: "info",
      duration,
    });
  },
};
