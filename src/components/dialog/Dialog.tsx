import * as DialogPrimitive from "@radix-ui/react-dialog";
import "./Dialog.css";
import { X } from "lucide-react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Dialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>
          <div style={{ display: "inline-block" }}>{trigger}</div>
        </DialogPrimitive.Trigger>
      )}

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="laxod-dialog-overlay" />

        <DialogPrimitive.Content className="laxod-dialog-content">
          <DialogPrimitive.Title className="laxod-dialog-title">
            {title}
          </DialogPrimitive.Title>

          {description && (
            <DialogPrimitive.Description className="laxod-dialog-description">
              {description}
            </DialogPrimitive.Description>
          )}

          <div className="laxod-dialog-body">{children}</div>

          <DialogPrimitive.Close
            className="laxod-dialog-close"
            aria-label="Close">
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
