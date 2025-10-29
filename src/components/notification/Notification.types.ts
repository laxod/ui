export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export type NotificationPayload = {
  id?: string;
  title?: string;
  description?: string;
  type?: NotificationType;
  duration?: number | null;
};

export type NotificationInternal = {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  duration: number | null;
};

export type NotificationManager = {
  push: (payload: NotificationPayload) => string;
  remove: (id: string) => void;
  clear: () => void;
};
