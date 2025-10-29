import { forwardRef, InputHTMLAttributes } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import "./Input.css";
import { useSound } from "../../hooks/useSound";
import { typeSound } from "../../utils/sounds";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  success?: boolean;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      success = false,
      showSuccessIcon = false,
      showErrorIcon = true,
      className = "",
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = !!error;
    const playWriteSound = useSound(typeSound);

    const isClient = typeof window !== "undefined";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      playWriteSound();
      props.onChange?.(e);
    };

    return (
      <div className={`input-wrapper ${fullWidth ? "input-fullwidth" : ""}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className="input-container">
          <input
            ref={ref}
            id={inputId}
            type={type}
            {...(isClient && { onChange: handleChange })}
            className={`input ${hasError ? "input-error" : ""} ${
              success ? "input-success" : ""
            } ${
              hasError || (success && showSuccessIcon) ? "input-with-icon" : ""
            } ${className}`.trim()}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
          {hasError && showErrorIcon && (
            <div className="input-icon input-icon-error">
              <AlertCircle size={18} />
            </div>
          )}
          {success && showSuccessIcon && (
            <div className="input-icon input-icon-success">
              <CheckCircle2 size={18} />
            </div>
          )}
        </div>
        {error && (
          <span
            id={`${inputId}-error`}
            className="input-message input-message-error">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${inputId}-helper`}
            className="input-message input-message-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
