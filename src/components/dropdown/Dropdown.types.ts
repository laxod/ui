import { ReactNode } from "react";

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger: ReactNode;
  onSelect?: (value: string) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  "aria-label"?: string;
}
