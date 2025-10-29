import { CardProps } from "./Card.types";
import "./Card.css";

export const Card = ({
  children,
  variant = "default",
  padding = "md",
  interactive = false,
  className = "",
  onClick,
  ...props
}: CardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const variantClass = `laxod-card-${variant}`;
  const paddingClass = `laxod-card-padding-${padding}`;
  const interactiveClass =
    interactive || onClick ? "laxod-card-interactive" : "";
  const cardClassName = [
    "laxod-card",
    variantClass,
    paddingClass,
    interactiveClass,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}>
      <div className="laxod-card-content">{children}</div>
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`laxod-card-header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={`laxod-card-title ${className}`.trim()} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={`laxod-card-description ${className}`.trim()} {...props}>
      {children}
    </p>
  );
};

export const CardBody = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`laxod-card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`laxod-card-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};
