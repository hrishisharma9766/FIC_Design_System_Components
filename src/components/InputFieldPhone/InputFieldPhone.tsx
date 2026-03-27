import React from 'react';
import './InputFieldPhone.css';

const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export type InputFieldPhoneState = 'default' | 'hover' | 'selected' | 'disabled' | 'error' | 'readonly';
export type InputFieldPhoneSize = 'sm' | 'md' | 'lg';

export interface InputFieldPhoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: InputFieldPhoneState;
  size?: InputFieldPhoneSize;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
  prefixValue?: string;
  showCharacterCount?: boolean;
}

export const InputFieldPhone = React.forwardRef<HTMLInputElement, InputFieldPhoneProps>(
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
      prefixValue = '+126',
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
      'inputfield-phone-container',
      `inputfield-phone-container--${state}`,
      `inputfield-phone-container--${size}`,
      className,
    ].filter(Boolean).join(' ');

    const inputWrapperClasses = [
      'inputfield-phone-wrapper',
      `inputfield-phone-wrapper--${state}`,
      prefixValue ? 'inputfield-phone-wrapper--with-prefix' : '',
    ].filter(Boolean).join(' ');

    const displayCharacterCount = showCharacterCount && maxLength !== undefined;
    const characterCountText = displayCharacterCount ? `${currentLength}/${maxLength}` : '';

    const displayHelperText = isError ? errorText : helperText;

    return (
      <div className={containerClasses}>
        {label && (
          <div className="inputfield-phone-label-wrapper">
            <label className="inputfield-phone-label" style={dmSansStyle}>
              {label}
            </label>
            {required && (
              <span className="inputfield-phone-required" style={dmSansStyle}>
                *
              </span>
            )}
            {displayCharacterCount && (
              <span className="inputfield-phone-character-count" style={dmSansStyle}>
                {characterCountText}
              </span>
            )}
          </div>
        )}

        <div className={inputWrapperClasses}>
          {prefixValue && (
            <div className="inputfield-phone-prefix">
              <span className="inputfield-phone-prefix-value" style={dmSansStyle}>
                {prefixValue}
              </span>
            </div>
          )}

          <input
            ref={ref}
            type="text"
            className="inputfield-phone-input"
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
          <div className="inputfield-phone-helper-text-wrapper">
            <span
              className={`inputfield-phone-helper-text ${isError ? 'inputfield-phone-helper-text--error' : ''}`}
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

InputFieldPhone.displayName = 'InputFieldPhone';