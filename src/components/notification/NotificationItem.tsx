"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { NotificationInternal } from "./Notification.types";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type NotificationItemProps = {
  notification: NotificationInternal;
  onRemove: (id: string) => void;
  style?: CSSProperties;
};

function getIcon(type: NotificationInternal["type"]) {
  switch (type) {
    case "success":
      return <CheckCircle size={20} />;
    case "error":
      return <XCircle size={20} />;
    case "warning":
      return <AlertTriangle size={20} />;
    case "info":
      return <Info size={20} />;
    default:
      return <CheckCircle size={20} />;
  }
}

export const NotificationItem = ({
  notification,
  onRemove,
  style,
}: NotificationItemProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setExiting(true);
    setTimeout(() => onRemove(notification.id), 250);
  };

  return (
    <div
      className={`notification-toast notification-type-${notification.type} ${
        visible ? "notification-visible" : ""
      } ${exiting ? "notification-exiting" : ""}`}
      style={style}
      role="alert">
      <div className="notification-icon" aria-hidden="true">
        {getIcon(notification.type)}
      </div>

      <div className="notification-body">
        {notification.title && (
          <div className="notification-title">{notification.title}</div>
        )}
        {notification.description && (
          <div className="notification-description">
            {notification.description}
          </div>
        )}
      </div>

      <button
        className="notification-close"
        aria-label="Close notification"
        onClick={handleClose}
        type="button">
        <X size={16} />
      </button>
    </div>
  );
};
