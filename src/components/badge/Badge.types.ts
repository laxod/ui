import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "destructive"
    | "warning"
    | "outline"
    | "flat";
  size?: "sm" | "md" | "lg";
  className?: string;
  onRemove?: () => void;
  icon?: ReactNode;
  [key: string]: any;
}
