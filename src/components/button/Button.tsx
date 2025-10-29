import { ButtonProps } from "./Button.types";
import "./Button.css";
import { useSound } from "../../hooks/useSound";
import { ExternalLink } from "lucide-react";
import { clickSound } from "../../utils/sounds";
import * as React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      hoverEffect,
      newTab = false,
      disabled = false,
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className = "",
      onClick,
      as: ComponentProp,
      ...props
    },
    ref
  ) => {
    const shouldShowHoverEffect =
      hoverEffect !== undefined ? hoverEffect : variant === "primary";

    const playClickSound = useSound(clickSound);

    const handleMouseMove = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (!shouldShowHoverEffect || disabled || loading) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleClick = (e: React.MouseEvent) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }

      playClickSound();
      if (onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      if (props.href && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        if (onClick) {
          onClick(e as any);
        }
        const target = e.currentTarget as HTMLAnchorElement;
        target.click();
        return;
      }
    };

    const variantClass = `laxod-button-${variant}`;
    const sizeClass = `laxod-button-${size}`;
    const disabledClass = disabled || loading ? "laxod-button-disabled" : "";
    const fullWidthClass = fullWidth ? "laxod-button-full-width" : "";
    const loadingClass = loading ? "laxod-button-loading" : "";
    const hoverEffectClass =
      shouldShowHoverEffect && !disabled && !loading
        ? "laxod-button-hover-effect"
        : "";

    const buttonClassName = [
      "laxod-button",
      variantClass,
      sizeClass,
      disabledClass,
      fullWidthClass,
      loadingClass,
      hoverEffectClass,
      className,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    const isExternalLink =
      typeof props.href === "string" &&
      (props.href.startsWith("http://") ||
        props.href.startsWith("https://") ||
        props.href.startsWith("mailto:"));

const Component: any = ComponentProp || (props.href ? "a" : "button");


    const content = (
      <>
        {leftIcon && (
          <span className="laxod-button-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {(loading || rightIcon || isExternalLink) && (
          <span className="laxod-button-icon" aria-hidden="true">
            {loading ? (
              <div
                className="laxod-button-spinner"
                role="status"
                aria-label="Loading"
              />
            ) : (
              rightIcon || <ExternalLink />
            )}
          </span>
        )}
      </>
    );

    const isClient = typeof window !== "undefined";

    if (!props.href) {
      return (
        <Component
          ref={ref}
          type={props.type ?? "button"}
          className={buttonClassName}
          disabled={disabled || loading}
          {...(isClient && {
            onMouseMove: handleMouseMove,
            onClick: handleClick,
          })}
          aria-label={
            props["aria-label"] ||
            (typeof children === "string" ? children : undefined)
          }
          aria-busy={loading ? "true" : undefined}
          {...props}>
          {content}
        </Component>
      );
    }

    if (!isExternalLink) {
      return (
        <Component
          ref={ref}
          className={buttonClassName}
          href={props.href}
          target={isExternalLink || newTab ? "_blank" : "_self"}
          rel={isExternalLink || newTab ? "noopener noreferrer" : undefined}
          {...(isClient && {
            onMouseMove: handleMouseMove,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
          })}
          tabIndex={disabled || loading ? -1 : 0}
          role="button"
          aria-label={
            props["aria-label"] ||
            (typeof children === "string" ? children : undefined)
          }
          aria-disabled={disabled || loading ? "true" : undefined}
          aria-busy={loading ? "true" : undefined}
          {...props}>
          {content}
        </Component>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={buttonClassName}
        href={props.href}
        target={isExternalLink || newTab ? "_blank" : "_self"}
        rel={isExternalLink || newTab ? "noopener noreferrer" : undefined}
        {...(isClient && {
          onMouseMove: handleMouseMove,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
        })}
        tabIndex={disabled || loading ? -1 : 0}
        role="button"
        aria-label={
          props["aria-label"] ||
          (typeof children === "string" ? children : undefined)
        }
        aria-disabled={disabled || loading ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        {...props}>
        {content}
      </a>
    );
  }
);
