import { ReactNode, MouseEvent } from "react";

export interface CardProps {
  children: ReactNode;
  variant?: "default" | "fancy" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  interactive?: boolean;
  glowEffect?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  [key: string]: any;
}
