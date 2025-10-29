import { ReactNode } from "react";

export interface SelectItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  items: SelectItem[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  "aria-label"?: string;
}
