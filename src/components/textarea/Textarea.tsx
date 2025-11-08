import { forwardRef, TextareaHTMLAttributes } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import "./Textarea.css";
import { useSound } from "../../utils/sounds";
import { typeSound } from "../../utils/sounds";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  success?: boolean;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      success = false,
      showSuccessIcon = false,
      showErrorIcon = true,
      rows = 4,
      className = "",
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = !!error;
    const isValid = !hasError && value && (value as string).length > 0;
    const playWriteSound = useSound(typeSound);

    const isClient = typeof window !== "undefined";

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      playWriteSound();
      props.onChange?.(e);
    };

    return (
      <div
        className={`textarea-wrapper ${fullWidth ? "textarea-fullwidth" : ""}`}>
        {label && (
          <label htmlFor={textareaId} className="textarea-label">
            {label}
          </label>
        )}
        <div className="textarea-container">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            {...(isClient && { onChange: handleChange })}
            value={value}
            className={`textarea ${hasError ? "textarea-error" : ""} ${
              isValid && success ? "textarea-success" : ""
            } ${className}`.trim()}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : helperText
                ? `${textareaId}-helper`
                : undefined
            }
            {...props}
          />
          {!hasError && isValid && showSuccessIcon && (
            <div className="textarea-icon textarea-icon-success">
              <CheckCircle2 size={18} />
            </div>
          )}
          {hasError && showErrorIcon && (
            <div className="textarea-icon textarea-icon-error">
              <AlertCircle size={18} />
            </div>
          )}
        </div>
        {error && (
          <span
            id={`${textareaId}-error`}
            className="textarea-message textarea-message-error">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${textareaId}-helper`}
            className="textarea-message textarea-message-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
