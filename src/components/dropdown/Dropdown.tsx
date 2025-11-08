import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownProps } from "./Dropdown.types";
import "./Dropdown.css";
import { useSound } from "../../utils/sounds";
import { clickSound } from "../../utils/sounds";
import { Button } from "../button";

export const Dropdown = ({
  items,
  trigger,
  onSelect,
  align = "start",
  side = "bottom",
  sideOffset = 8,
  disabled = false,
  className = "",
  contentClassName = "",
  itemClassName = "",
  "aria-label": ariaLabel,
}: DropdownProps) => {
  const playClickSound = useSound(clickSound);

  const isClient = typeof window !== "undefined";

  const handleSelect = (selectedValue: string) => {
    playClickSound();
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        asChild={true}
        className={`laxod-dropdown-trigger ${className}`}
        disabled={disabled}
        aria-label={ariaLabel}>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`laxod-dropdown-content ${contentClassName}`}
          align={align}
          side={side}
          sideOffset={sideOffset}
          collisionPadding={8}>
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.value}
              className={`laxod-dropdown-item ${itemClassName}`}
              disabled={item.disabled}
              {...(isClient && { onSelect: () => handleSelect(item.value) })}
              data-disabled={item.disabled || undefined}
              data-destructive={item.destructive || undefined}>
              <div className="laxod-dropdown-item-content">
                {item.icon && (
                  <span className="laxod-dropdown-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="laxod-dropdown-item-label">{item.label}</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
