import React from 'react';
import './RadioButton.css';

/**
 * Common style for DM Sans font, matching other components in the system.
 */
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subtext?: string;
  readOnly?: boolean;
}

/**
 * RadioButton Component
 * A reusable radio button following the design system tokens and patterns.
 * 
 * Supports:
 * - Label and optional Subtext
 * - States: Checked, Default, Hover, Disabled, ReadOnly
 * - BEM naming convention
 */
export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      subtext,
      checked,
      disabled,
      readOnly = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided for accessibility
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;

    const containerClasses = [
      'radio-button',
      checked ? 'radio-button--checked' : '',
      disabled ? 'radio-button--disabled' : '',
      readOnly ? 'radio-button--readonly' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses} style={dmSansStyle}>
        <div className="radio-button__wrapper">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="radio-button__input"
            checked={checked}
            disabled={disabled || readOnly}
            {...props}
          />
          <label htmlFor={radioId} className="radio-button__visual">
            <span className="radio-button__outer-circle">
              {checked && <span className="radio-button__inner-circle"></span>}
            </span>
          </label>
        </div>
        
        {(label || subtext) && (
          <div className="radio-button__content">
            {label && (
              <label htmlFor={radioId} className="radio-button__label">
                {label}
              </label>
            )}
            {subtext && <span className="radio-button__subtext">{subtext}</span>}
          </div>
        )}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';
