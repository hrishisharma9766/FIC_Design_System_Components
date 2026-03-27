import React from 'react';
import './Switch.css';

/**
 * Common style for DM Sans font, matching other components in the system.
 */
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export type SwitchSize = 'big' | 'small';
export type SwitchColor = 'teal' | 'fusia' | 'green-red' | 'green' | 'red';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SwitchSize;
  colorVariant?: SwitchColor;
  readOnly?: boolean;
}

/**
 * Internal Toggle Component
 * Just the input and the track, used by Switch
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
 * Base Switch Toggle Component
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Switch defaultChecked />
 * 
 * // Controlled usage
 * const [checked, setChecked] = useState(false);
 * <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} colorVariant="fusia" size="small" />
 * ```
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'big',
      colorVariant = 'teal',
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
          <Toggle
            ref={ref}
            id={switchId}
            checked={isChecked}
            onChange={handleToggle}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
