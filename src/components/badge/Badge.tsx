import { BadgeProps } from "./Badge.types";
import "./Badge.css";

export const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onRemove,
  icon,
  ...props
}: BadgeProps) => {
  const variantClass = `ui-badge-${variant}`;
  const sizeClass = `ui-badge-${size}`;
  const badgeClassName = ["ui-badge", variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ")
    .trim();

  const RemoveIcon = () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <span className={badgeClassName} {...props}>
      {icon && (
        <span className="ui-badge-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          className="ui-badge-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
          type="button">
          <RemoveIcon />
        </button>
      )}
    </span>
  );
};
