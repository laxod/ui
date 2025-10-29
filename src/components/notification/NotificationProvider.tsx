"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { getGlobalNotificationManager } from "./NotificationManager";
import type { NotificationInternal } from "./Notification.types";
import { NotificationContainer } from "./NotificationContainer";

export const NotificationProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationInternal[]>(
    []
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const manager = getGlobalNotificationManager() as any;

    const updateNotifications = () => {
      setNotifications(manager.getNotifications());
    };

    const unsubscribe = manager.subscribe(updateNotifications);
    updateNotifications();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemove = useCallback((id: string) => {
    getGlobalNotificationManager().remove(id);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={handleRemove}
      />
    </>
  );
};

export function useNotification() {
  return getGlobalNotificationManager();
}
