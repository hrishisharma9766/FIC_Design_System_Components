import React from 'react';
import './TextArea.css';

// Common style for DM Sans (mirrored from other components)
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  showCount?: boolean;
  maxLength?: number;
  required?: boolean;
  readOnly?: boolean;
}

/**
 * TextArea Component - A reusable text area component matching the design system.
 * Supports: Label, Required asterisk, Helper text, Error state, Character count.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      showCount = false,
      maxLength,
      required = false,
      readOnly = false,
      disabled = false,
      className = '',
      value,
      defaultValue,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const currentLength = String(currentValue || '').length;

    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const containerClasses = [
      'textarea-container',
      error ? 'textarea-container--error' : '',
      disabled ? 'textarea-container--disabled' : '',
      readOnly ? 'textarea-container--readonly' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses} style={dmSansStyle}>
        <div className="textarea__header">
          {label && (
            <label htmlFor={textareaId} className="textarea__label">
              {label}
              {required && <span className="textarea__required">*</span>}
            </label>
          )}
          {showCount && maxLength && (
            <span className="textarea__count">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <div className="textarea__wrapper">
          <textarea
            ref={ref}
            id={textareaId}
            className="textarea__input"
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {error && (
            <div className="textarea__error-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="12" height="12" fill="currentColor" />
                <path d="M6 3V7M6 9H6.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        {(error && errorMessage) || helperText ? (
          <div className="textarea__footer">
            {error && errorMessage ? (
              <span className="textarea__error-message">{errorMessage}</span>
            ) : (
              helperText && <span className="textarea__helper-text">{helperText}</span>
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
