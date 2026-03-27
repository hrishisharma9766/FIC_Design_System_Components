import React from 'react';
import './InputFieldIcon.css';

const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export type InputFieldIconState = 'default' | 'hover' | 'selected' | 'disabled' | 'error' | 'readonly';
export type InputFieldIconSize = 'sm' | 'md' | 'lg';

export interface InputFieldIconProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: InputFieldIconState;
  size?: InputFieldIconSize;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
  prefixIcon?: React.ReactNode;
  showCharacterCount?: boolean;
}

export const InputFieldIcon = React.forwardRef<HTMLInputElement, InputFieldIconProps>(
  (
    {
      label = 'Percentage Off',
      placeholder = 'Select Percentage',
      helperText = 'Helper Text',
      errorText,
      state = 'default',
      size = 'md',
      required = false,
      maxLength,
      currentLength = 0,
      prefixIcon,
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
    const isDisabled = state === 'disabled' || disabled;
    const isReadOnly = state === 'readonly' || readOnly;
    const isError = state === 'error' || !!errorText;

    const containerClasses = [
      'inputfield-icon-container',
      `inputfield-icon-container--${state}`,
      `inputfield-icon-container--${size}`,
      className,
    ].filter(Boolean).join(' ');

    const inputWrapperClasses = [
      'inputfield-icon-wrapper',
      `inputfield-icon-wrapper--${state}`,
      prefixIcon ? 'inputfield-icon-wrapper--with-prefix-icon' : '',
    ].filter(Boolean).join(' ');

    const displayCharacterCount = showCharacterCount && maxLength !== undefined;
    const characterCountText = displayCharacterCount ? `${currentLength}/${maxLength}` : '';

    const displayHelperText = isError ? errorText : helperText;

    return (
      <div className={containerClasses}>
        {label && (
          <div className="inputfield-icon-label-wrapper">
            <label className="inputfield-icon-label" style={dmSansStyle}>
              {label}
            </label>
            {required && (
              <span className="inputfield-icon-required" style={dmSansStyle}>
                *
              </span>
            )}
            {displayCharacterCount && (
              <span className="inputfield-icon-character-count" style={dmSansStyle}>
                {characterCountText}
              </span>
            )}
          </div>
        )}

        <div className={inputWrapperClasses}>
          {prefixIcon && <div className="inputfield-icon-prefix">{prefixIcon}</div>}

          <input
            ref={ref}
            type="text"
            className="inputfield-icon-input"
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            onChange={onChange}
            style={dmSansStyle}
            {...props}
          />

        </div>

        {displayHelperText && (
          <div className="inputfield-icon-helper-text-wrapper">
            <span
              className={`inputfield-icon-helper-text ${isError ? 'inputfield-icon-helper-text--error' : ''}`}
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

InputFieldIcon.displayName = 'InputFieldIcon';
