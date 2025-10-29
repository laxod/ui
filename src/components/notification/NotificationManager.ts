import type {
  NotificationPayload,
  NotificationManager,
} from "./Notification.types";

type Listener = () => void;

let notificationId = 0;

function generateId(): string {
  return `notification-${Date.now()}-${++notificationId}`;
}

export function createNotificationManager(): NotificationManager {
  const listeners = new Set<Listener>();
  const notifications = new Map<string, NotificationPayload & { id: string }>();
  const timers = new Map<string, number>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const push = (payload: NotificationPayload): string => {
    const id = payload.id ?? generateId();
    const duration = payload.duration ?? 4500;

    notifications.set(id, {
      id,
      title: payload.title ?? "",
      description: payload.description,
      type: payload.type ?? "default",
      duration,
    });

    notify();

    if (duration !== null && duration > 0) {
      const timer = window.setTimeout(() => {
        remove(id);
      }, duration);
      timers.set(id, timer);
    }

    return id;
  };

  const remove = (id: string): void => {
    if (notifications.has(id)) {
      notifications.delete(id);
      notify();
    }

    const timer = timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.delete(id);
    }
  };

  const clear = (): void => {
    notifications.clear();
    timers.forEach((timer) => clearTimeout(timer));
    timers.clear();
    notify();
  };

  const subscribe = (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getNotifications = () => Array.from(notifications.values());

  return {
    push,
    remove,
    clear,
    subscribe,
    getNotifications,
  } as any;
}

let globalManager: NotificationManager | null = null;

export function getGlobalNotificationManager(): NotificationManager {
  if (typeof window === "undefined") {

    return {
      push: () => "",
      remove: () => {},
      clear: () => {},
    };
  }

  if (!globalManager) {
    globalManager = createNotificationManager();
  }

  return globalManager;
}
