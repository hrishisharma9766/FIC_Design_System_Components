import React from 'react';
import './Switch.css';

/**
 * Common style for DM Sans font, matching other components in the system.
 */
const dmSansStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
};

export type SwitchSize = 'big' | 'small';
export type SwitchColor = 'teal' | 'fusia' | 'green-red' | 'green' | 'red';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SwitchSize;
  colorVariant?: SwitchColor;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  offerText?: string;
  readOnly?: boolean;
}

/**
 * Switch Component
 * A reusable toggle switch following the design system tokens and patterns.
 * 
 * Supports:
 * - Sizes: Big (48x24), Small (40x20)
 * - Color Variants: Teal, Fusia, Green/Red
 * - Labels: Main Label, Active/Inactive value labels
 * - Offer Badge: Optional badge with text
 * - States: Default, Active (Checked), Disabled, ReadOnly
 * - BEM naming convention
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'big',
      colorVariant = 'teal',
      label,
      activeLabel,
      inactiveLabel,
      offerText,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled,
      readOnly = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Handle both controlled and uncontrolled states
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    };

    // Generate unique ID if not provided for accessibility
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

    const containerClasses = [
      'switch-container',
      `switch-container--${size}`,
      `switch-container--${colorVariant}`,
      isChecked ? 'switch-container--checked' : '',
      disabled ? 'switch-container--disabled' : '',
      readOnly ? 'switch-container--readonly' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses} style={dmSansStyle}>
        <div className="switch__content-wrapper">
          {label && (
            <label htmlFor={switchId} className="switch__main-label">
              {label}
            </label>
          )}

          {inactiveLabel && (
            <span className={`switch__value-label switch__value-label--inactive ${!isChecked ? 'switch__value-label--active-state' : ''}`}>
              {inactiveLabel}
            </span>
          )}

          <div className="switch">
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              className="switch__input"
              checked={isChecked}
              onChange={handleToggle}
              disabled={disabled || readOnly}
              {...props}
            />
            <label htmlFor={switchId} className="switch__track">
              <span className="switch__handle" />
            </label>
          </div>

          {activeLabel && (
            <span className={`switch__value-label switch__value-label--active ${isChecked ? 'switch__value-label--active-state' : ''}`}>
              {activeLabel}
            </span>
          )}

          {offerText && (
            <div className="switch__offer-badge">
              {offerText}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
