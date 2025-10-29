"use client";

import { useState } from "react";
import type { NotificationInternal } from "./Notification.types";
import { NotificationItem } from "./NotificationItem";
import "./Notification.css";

type NotificationContainerProps = {
  notifications: NotificationInternal[];
  onRemove: (id: string) => void;
};

const TOAST_HEIGHT = 80;
const COLLAPSED_OFFSET = 16;
const EXPANDED_GAP = 12;

export const NotificationContainer = ({
  notifications,
  onRemove,
}: NotificationContainerProps) => {
  const [hovered, setHovered] = useState(false);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      className="notification-root"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
      aria-live="polite"
      aria-label="Notifications">
      {notifications.map((notification, index) => {
const offset = hovered
  ? index * (TOAST_HEIGHT + EXPANDED_GAP)
  : index * COLLAPSED_OFFSET;

        const opacity = hovered ? 1 : Math.max(0.4, 1 - index * 0.15);
        const scale = hovered ? 1 : Math.max(0.95, 1 - index * 0.02);

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
            style={{
              bottom: `${offset}px`,
              opacity,
              transform: `scale(${scale})`,
              zIndex: 10000 - index,
            }}
          />
        );
      })}
    </div>
  );
};
