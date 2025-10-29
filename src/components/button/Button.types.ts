import { ReactNode, SyntheticEvent, ElementType } from "react";
import { AnchorHTMLAttributes } from "react";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "destructive"
    | "warning"
    | "flat"
    | "outline";
  size?: "sm" | "md" | "lg";
  hoverEffect?: boolean;
  newTab?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  "aria-label"?: string;
  [key: string]: any;
}
