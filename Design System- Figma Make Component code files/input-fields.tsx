import React from 'react';

// Common style for DM Sans
const dmSansStyle = { fontFamily: "'DM Sans', sans-serif" };

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxLength?: number;
  /** * Pass a Font Awesome icon name (e.g., 'user') 
   * or a string for text prefixes (e.g., '+126')
   */
  prefix?: string | React.ReactNode; 
  type?: 'text' | 'tel' | 'email' | 'password';
  /** Pass a Font Awesome icon name (e.g., 'circle-info') */
  rightIcon?: string | React.ReactNode; 
}

export function InputField({
  label,
  placeholder,
  value = "",
  onChange,
  disabled,
  readOnly,
  error,
  helperText = "Helper Text",
  required = true,
  maxLength = 140,
  prefix,
  type = "text",
  rightIcon
}: InputFieldProps) {
  
  const isError = !!error;
  const isReadOnly = readOnly && !disabled;
  
  // If value is provided but no onChange, make it readOnly to avoid warning
  const shouldBeReadOnly = readOnly || (value !== "" && !onChange);

  // Helper to render Font Awesome icons if a string is provided
  const renderIcon = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string' && !icon.includes('+')) {
      return <i className={`fa-solid fa-${icon}`} aria-hidden="true" />;
    }
    return icon;
  };

  return (
    <div className={`flex flex-col w-full max-w-sm ${disabled ? 'opacity-60' : ''}`} style={dmSansStyle}>
      {/* Label Row */}
      <div className="flex justify-between items-center mb-1 px-1">
        <label className="text-[var(--text-label,12px)] font-medium text-gray-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <span className="text-[10px] text-gray-400 font-mono">
          {value.length}/{maxLength}
        </span>
      </div>

      {/* Input Container */}
      <div 
        className={`
          flex items-stretch overflow-hidden border transition-all duration-200
          rounded-[var(--radius-md,8px)] h-11
          ${isError 
            ? 'border-red-400 bg-red-50' 
            : shouldBeReadOnly
              ? 'border-blue-100 bg-blue-50/50' 
              : disabled 
                ? 'border-gray-200 bg-gray-100'
                : 'border-gray-300 bg-white hover:border-[var(--colors-primitive-teal-400, #2dd4bf)] focus-within:border-[var(--colors-primitive-teal-500, #14b8a6)]'
          }
        `}
        style={{
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          if (isError) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(255, 211, 210, 0.25)';
          } else if (!shouldBeReadOnly && !disabled) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(39, 188, 183, 0.25)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Left Prefix (Icon or Text Addon) */}
        {prefix && (
          <div className={`
            flex items-center justify-center px-4 border-r min-w-[48px]
            ${isError ? 'border-red-200 text-red-500' : 'border-gray-300 bg-gray-50 text-gray-500'}
          `}>
            <span className="text-sm font-medium">
              {renderIcon(prefix)}
            </span>
          </div>
        )}

        <div className="relative flex-1 flex items-center">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={shouldBeReadOnly}
            style={dmSansStyle}
            className={`
              w-full h-full px-3 outline-none bg-transparent text-sm
              placeholder:text-gray-400
              ${isError ? 'text-red-900' : 'text-gray-800'}
              ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
            `}
          />
          
          {/* Right side Icon */}
          {(rightIcon || isError) && (
            <div className={`pr-3 flex items-center ${isError ? 'text-red-500' : 'text-gray-400'}`}>
              {isError && !rightIcon ? (
                <i className="fa-solid fa-circle-exclamation" />
              ) : (
                renderIcon(rightIcon)
              )}
            </div>
          )}
        </div>
      </div>

      {/* Helper / Error Text */}
      <span className={`mt-1 text-[11px] px-1 ${isError ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
        {isError ? error : helperText}
      </span>
    </div>
  );
}

// Phone Input Component
export function InputField_Phone({
  label,
  placeholder = "(555) 123-4567",
  value = "",
  onChange,
  disabled,
  error,
  helperText = "Helper Text",
  required = true,
  countryCode = "+1"
}: any) {
  const isError = !!error;

  return (
    <div className={`flex flex-col w-full max-w-sm ${disabled ? 'opacity-60' : ''}`} style={dmSansStyle}>
      <div className="flex justify-between items-center mb-1 px-1">
        <label className="text-[var(--text-label,12px)] font-medium" style={{ color: 'var(--colors-input-field-text-label)' }}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      <div 
        style={{
          borderRadius: 'var(--input-field-border-radius)',
          borderWidth: 'var(--input-field-border-width)',
          boxShadow: 'none',
        }}
        className={`
          flex items-stretch overflow-hidden border transition-all duration-200 h-11
          ${isError ? 'bg-[var(--colors-input-field-bkg-error)] border-[var(--colors-input-field-border-error)]' : 
            disabled ? 'bg-[var(--colors-input-field-bkg-disabled)] border-[var(--colors-input-field-border-disabled)]' : 
            'bg-[var(--colors-input-field-bkg-default)] border-[var(--colors-input-field-border-default)] hover:border-[var(--colors-input-field-border-hover)] focus-within:border-[var(--colors-input-field-border-focus)]'
          }
        `}
        onFocus={(e) => {
          if (isError) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(255, 211, 210, 0.25)';
          } else if (!disabled) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(39, 188, 183, 0.25)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div 
          className="flex items-center justify-center border-r min-w-[48px] px-4 text-sm font-semibold"
          style={{
            ...dmSansStyle,
            backgroundColor: isError ? 'var(--colors-input-field-prefix-bkg-error)' : 'var(--colors-input-field-prefix-bkg-default)',
            borderColor: isError ? 'var(--colors-input-field-prefix-border-error)' : 'var(--colors-input-field-prefix-border-default)',
            color: isError ? 'var(--colors-input-field-prefix-text-error)' : 'var(--colors-input-field-prefix-text-default)'
          }}
        >
          {countryCode}
        </div>

        <div className="relative flex-1 flex items-center">
          <input
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{
              ...dmSansStyle,
              paddingLeft: 'var(--input-field-padding-x)',
              paddingRight: 'var(--input-field-padding-x)',
              color: isError ? 'var(--colors-input-field-text-error)' : 'var(--colors-input-field-text-default)'
            }}
            className={`w-full h-full outline-none bg-transparent text-sm placeholder:text-[var(--colors-input-field-text-placeholder)] ${disabled ? 'cursor-not-allowed text-[var(--colors-input-field-text-disabled)]' : 'cursor-text'}`}
          />
          {isError && (
            <div className="pr-3" style={{ color: 'var(--colors-input-field-icon-error)' }}>
              <i className="fa-solid fa-circle-exclamation" />
            </div>
          )}
        </div>
      </div>

      <span className="mt-1 text-[11px] px-1" style={{ color: isError ? 'var(--colors-input-field-text-helper-error)' : 'var(--colors-input-field-text-helper)' }}>
        {isError ? error : helperText}
      </span>
    </div>
  );
}

// Icon Input Component
export function InputField_Icon({
  label,
  placeholder,
  value = "",
  onChange,
  disabled,
  error,
  helperText = "Helper Text",
  required = true,
  maxLength = 140,
  icon,
  type = "text"
}: any) {
  const isError = !!error;
  const renderIcon = (i: any) => typeof i === 'string' ? <i className={`fa-solid fa-${i}`} /> : i;

  return (
    <div className={`flex flex-col w-full max-w-sm ${disabled ? 'opacity-60' : ''}`} style={dmSansStyle}>
      <div className="flex justify-between items-center mb-1 px-1">
        <label className="text-[var(--text-label,12px)] font-medium" style={{ color: 'var(--colors-input-field-text-label)' }}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <span className="text-[10px] font-mono" style={{ color: 'var(--colors-input-field-text-counter)' }}>
          {value.length}/{maxLength}
        </span>
      </div>

      <div 
        style={{
          borderRadius: 'var(--input-field-border-radius)',
          borderWidth: 'var(--input-field-border-width)',
          boxShadow: 'none',
        }}
        className={`flex items-stretch overflow-hidden border transition-all duration-200 h-11 ${isError ? 'bg-[var(--colors-input-field-bkg-error)] border-[var(--colors-input-field-border-error)]' : disabled ? 'bg-[var(--colors-input-field-bkg-disabled)] border-[var(--colors-input-field-border-disabled)]' : 'bg-[var(--colors-input-field-bkg-default)] border-[var(--colors-input-field-border-default)] hover:border-[var(--colors-input-field-border-hover)] focus-within:border-[var(--colors-input-field-border-focus)]'}`}
        onFocus={(e) => {
          if (isError) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(255, 211, 210, 0.25)';
          } else if (!disabled) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(39, 188, 183, 0.25)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {icon && (
          <div className="flex items-center justify-center border-r min-w-[48px] px-4" style={{ backgroundColor: isError ? 'var(--colors-input-field-prefix-bkg-error)' : 'var(--colors-input-field-prefix-bkg-default)', borderColor: isError ? 'var(--colors-input-field-prefix-border-error)' : 'var(--colors-input-field-prefix-border-default)', color: isError ? 'var(--colors-input-field-prefix-text-error)' : 'var(--colors-input-field-icon-default)' }}>
            {renderIcon(icon)}
          </div>
        )}

        <div className="relative flex-1 flex items-center">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{
              ...dmSansStyle,
              paddingLeft: 'var(--input-field-padding-x)',
              paddingRight: 'var(--input-field-padding-x)',
              color: isError ? 'var(--colors-input-field-text-error)' : 'var(--colors-input-field-text-default)'
            }}
            className={`w-full h-full outline-none bg-transparent text-sm placeholder:text-[var(--colors-input-field-text-placeholder)] ${disabled ? 'cursor-not-allowed text-[var(--colors-input-field-text-disabled)]' : 'cursor-text'}`}
          />
          {isError && (
            <div className="pr-3" style={{ color: 'var(--colors-input-field-icon-error)' }}>
              <i className="fa-solid fa-circle-exclamation" />
            </div>
          )}
        </div>
      </div>

      <span className="mt-1 text-[11px] px-1" style={{ color: isError ? 'var(--colors-input-field-text-helper-error)' : 'var(--colors-input-field-text-helper)' }}>
        {isError ? error : helperText}
      </span>
    </div>
  );
}