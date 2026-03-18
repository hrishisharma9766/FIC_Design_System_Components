import React from 'react';
import './SwitchWithLabel.css';

/**
 * Common style for DM Sans font, matching other components in the system.
 */
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

// Re-defining types here for complete component independence as requested
export type SwitchSize = 'big' | 'small';
export type SwitchColor = 'teal' | 'fusia' | 'green-red' | 'green' | 'red';

export interface SwitchWithLabelProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SwitchSize;
  colorVariant?: SwitchColor;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  offerText?: string;
  readOnly?: boolean;
}

/**
 * Internal Toggle Component
 * Encapsulated within SwitchWithLabel for complete independence.
 */
const Toggle = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { readOnly?: boolean }>(
  ({ id, checked, onChange, disabled, readOnly, ...props }, ref) => (
    <div className="switch">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className="switch__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled || readOnly}
        {...props}
      />
      <label htmlFor={id} className="switch__track">
        <span className="switch__handle" />
      </label>
    </div>
  )
);

Toggle.displayName = 'Toggle';

/**
 * SwitchWithLabel Component
 * 
 * @example
 * ```tsx
 * // With main label and status labels
 * <SwitchWithLabel 
 *   label="Notifications" 
 *   activeLabel="On" 
 *   inactiveLabel="Off" 
 *   defaultChecked 
 * />
 * 
 * // With offer badge
 * <SwitchWithLabel 
 *   label="Plan" 
 *   offerText="20% OFF" 
 *   colorVariant="green" 
 * />
 * ```
 */
export const SwitchWithLabel = React.forwardRef<HTMLInputElement, SwitchWithLabelProps>(
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
    const switchId = id || `switch-labeled-${Math.random().toString(36).substring(2, 9)}`;

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

          <Toggle
            ref={ref}
            id={switchId}
            checked={isChecked}
            onChange={handleToggle}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />

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

SwitchWithLabel.displayName = 'SwitchWithLabel';
