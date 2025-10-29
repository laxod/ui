import * as SelectMenu from "@radix-ui/react-select";
import { SelectProps } from "./Select.types";
import "./Select.css";
import { useSound } from "../../hooks/useSound";
import { clickSound } from "../../utils/sounds";

const ChevronIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const Select = ({
  items,
  placeholder = "Select an option",
  defaultValue,
  value,
  onValueChange,
  disabled = false,
  fullWidth = false,
  className = "",
  contentClassName = "",
  itemClassName = "",
  "aria-label": ariaLabel,
}: SelectProps) => {
  const playClickSound = useSound(clickSound);

  const isClient = typeof window !== "undefined";

  const handleValueChange = (newValue: string) => {
    playClickSound();
    onValueChange?.(newValue);
  };

  const fullWidthClass = fullWidth ? "laxod-select-full-width" : "";
  const currentValue = value ?? defaultValue;
  const selectedItem = items.find((item) => item.value === currentValue);

  return (
    <SelectMenu.Root
      value={value}
      defaultValue={defaultValue}
      {...(isClient && { onValueChange: handleValueChange })}
      disabled={disabled}>
      <SelectMenu.Trigger
        className={`laxod-select-trigger ${fullWidthClass} ${className}`}
        aria-label={ariaLabel || placeholder}>
        <div className="laxod-select-trigger-content">
          {selectedItem?.icon && (
            <span className="laxod-select-trigger-icon" aria-hidden="true">
              {selectedItem.icon}
            </span>
          )}
          <SelectMenu.Value
            className="laxod-select-trigger-label"
            placeholder={placeholder}
          />
        </div>
        <SelectMenu.Icon
          className="laxod-select-trigger-chevron"
          aria-hidden="true">
          <ChevronIcon />
        </SelectMenu.Icon>
      </SelectMenu.Trigger>
      <SelectMenu.Portal>
        <SelectMenu.Content
          className={`laxod-select-content ${contentClassName}`}
          position="popper"
          sideOffset={8}
          collisionPadding={8}>
          <SelectMenu.Viewport className="laxod-select-viewport">
            {items.map((item) => (
              <SelectMenu.Item
                key={item.value}
                value={item.value}
                className={`laxod-select-item ${itemClassName}`}
                disabled={item.disabled}>
                <div className="laxod-select-item-content">
                  {item.icon && (
                    <span className="laxod-select-item-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <SelectMenu.ItemText className="laxod-select-item-label">
                    {item.label}
                  </SelectMenu.ItemText>
                </div>
                <SelectMenu.ItemIndicator className="laxod-select-item-check">
                  <CheckIcon />
                </SelectMenu.ItemIndicator>
              </SelectMenu.Item>
            ))}
          </SelectMenu.Viewport>
        </SelectMenu.Content>
      </SelectMenu.Portal>
    </SelectMenu.Root>
  );
};
