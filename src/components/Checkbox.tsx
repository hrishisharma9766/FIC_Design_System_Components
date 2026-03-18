import React from 'react';
import './Checkbox.css';

// Reusing dmSansStyle pattern from other components
const dmSansStyle = {
  fontFamily: "'DM Sans', sans-serif",
};

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subtext?: string;
  variant?: 'square' | 'round';
  state?: 'default' | 'hover' | 'focus' | 'disabled' | 'readonly';
  checked?: boolean;
}

/**
 * Checkbox Component - A reusable checkbox component with variants and subtext.
 * Handles: Standard Checkbox, Checkbox with Subtext, and Round (Radio) variants.
 * Mirrors the architecture of Button, PillBadge, and StateBadge.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label = 'Label',
      subtext,
      variant = 'square',
      state = 'default',
      checked = false,
      className = '',
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    // Determine effective states
    const isDisabled = state === 'disabled' || disabled;
    const isReadOnly = state === 'readonly' || readOnly;
    const isFocus = state === 'focus';

    // Container class names
    const containerClasses = [
      'checkbox-container',
      isFocus ? 'checkbox-container--focus' : '',
      state === 'hover' ? 'checkbox-container--hover' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Box class names
    const boxClasses = [
      'checkbox-box',
      `checkbox-box--${variant}`,
      checked ? 'checkbox-box--checked' : '',
      isDisabled ? 'checkbox-box--disabled' : '',
      isReadOnly ? 'checkbox-box--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Label class names
    const labelClasses = [
      'checkbox-label',
      isDisabled ? 'checkbox-label--disabled' : '',
      isReadOnly ? 'checkbox-label--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      if (onChange) onChange(e);
    };

    return (
      <label className={containerClasses} style={dmSansStyle}>
        <div className="checkbox-row">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            style={{ display: 'none' }}
            {...props}
          />
          
          <div className={boxClasses}>
            {checked && (
              <div className="checkbox-icon">
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>

          <span className={labelClasses}>
            {label}
          </span>
        </div>

        {subtext && (
          <div className="checkbox-subtext">
            {subtext}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
