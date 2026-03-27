import React from 'react';
import './InputField.css';

// Common style for DM Sans font, matching other components in the system
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export type InputFieldState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'readonly';
export type InputFieldSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: InputFieldState;
  size?: InputFieldSize;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showCharacterCount?: boolean;
}

/**
 * InputField Component - A reusable input field component with states and variants.
 * Handles: Text input with label, placeholder, helper text, error states, and icons.
 * Mirrors the architecture of Button, Checkbox, and other components in the system.
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label = 'InputFieldLabel',
      placeholder = 'Enter your text here',
      helperText = 'Helper Text',
      errorText,
      state = 'default',
      size = 'md',
      required = false,
      maxLength,
      currentLength = 0,
      leftIcon,
      rightIcon,
      showCharacterCount = false,
      className = '',
      disabled,
      readOnly,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // Determine effective states
    const isDisabled = state === 'disabled' || disabled;
    const isReadOnly = state === 'readonly' || readOnly;
    const isError = state === 'error' || !!errorText;

    // Container class names
    const containerClasses = [
      'inputfield-container',
      `inputfield-container--${state}`,
      `inputfield-container--${size}`,
      className,
    ].filter(Boolean).join(' ');

    // Input wrapper classes
    const inputWrapperClasses = [
      'inputfield-wrapper',
      `inputfield-wrapper--${state}`,
      leftIcon ? 'inputfield-wrapper--with-left-icon' : '',
      rightIcon ? 'inputfield-wrapper--with-right-icon' : '',
    ].filter(Boolean).join(' ');

    // Handle character count
    const displayCharacterCount = showCharacterCount && maxLength !== undefined;
    const characterCountText = displayCharacterCount ? `${currentLength}/${maxLength}` : '';

    // Determine helper text to display
    const displayHelperText = isError ? errorText : helperText;

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <div className="inputfield-label-wrapper">
            <label className="inputfield-label" style={dmSansStyle}>
              {label}
            </label>
            {required && (
              <span className="inputfield-required" style={dmSansStyle}>
                *
              </span>
            )}
            {displayCharacterCount && (
              <span className="inputfield-character-count" style={dmSansStyle}>
                {characterCountText}
              </span>
            )}
          </div>
        )}

        {/* Input Wrapper */}
        <div className={inputWrapperClasses}>
          {leftIcon && <div className="inputfield-left-icon">{leftIcon}</div>}
          
          <input
            ref={ref}
            type="text"
            className="inputfield-input"
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            onChange={onChange}
            style={dmSansStyle}
            {...props}
          />
          
          {rightIcon && <div className="inputfield-right-icon">{rightIcon}</div>}
        </div>

        {/* Helper Text */}
        {displayHelperText && (
          <div className="inputfield-helper-text-wrapper">
            <span 
              className={`inputfield-helper-text ${isError ? 'inputfield-helper-text--error' : ''}`}
              style={dmSansStyle}
            >
              {displayHelperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';