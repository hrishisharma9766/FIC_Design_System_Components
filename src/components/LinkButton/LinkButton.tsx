import React from 'react';
import './LinkButton.css';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'warning' | 'error' | 'disabled' | 'readonly' | 'teal' | 'brand';
  filled?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8.94126 1.5397C9.07618 1.21202 9.39743 1 9.7508 1H14.1262C14.6081 1 15 1.39192 15 1.8738V6.2492C15 6.60257 14.788 6.92382 14.4603 7.05874C14.1326 7.19367 13.76 7.11657 13.503 6.87242L11.9353 5.30473L7.73979 9.50023C7.39927 9.84075 6.84029 9.84075 6.49977 9.50023C6.15925 9.15971 6.15925 8.60073 6.49977 8.26021L10.6953 4.06471L9.12758 2.49702C8.87701 2.24644 8.79991 1.8738 8.94126 1.5397ZM1 5.8123C1 4.60441 1.97659 3.62139 3.19091 3.62139H5.38183C5.8637 3.62139 6.25562 4.01331 6.25562 4.49518C6.25562 4.97705 5.8637 5.36898 5.38183 5.36898H3.19091C2.95319 5.36898 2.75402 5.56815 2.75402 5.80587V12.8091C2.75402 13.0468 2.95319 13.246 3.19091 13.246H10.1941C10.4318 13.246 10.631 13.0468 10.631 12.8091V10.6182C10.631 10.1363 11.0229 9.74438 11.5048 9.74438C11.9867 9.74438 12.3786 10.1363 12.3786 10.6182V12.8091C12.3786 14.017 11.402 15 10.1877 15H3.19091C1.98302 15 1 14.0234 1 12.8091V5.8123Z" fill="currentColor"/>
  </svg>
);

const iconMap = {
  warning: ExternalLinkIcon,
  error: ExternalLinkIcon,
  disabled: ExternalLinkIcon,
  readonly: ExternalLinkIcon,
  teal: ExternalLinkIcon,
  brand: ExternalLinkIcon,
};

export const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  (
    {
      variant = 'warning',
      filled = false,
      label = 'View Licenses & Billing',
      className = '',
      disabled,
      style,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const IconComponent = iconMap[variant];

    const classNames = [
      'link-button',
      `link-button--${variant}`,
      filled ? 'link-button--filled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || variant === 'disabled'}
        style={style}
        {...props}
      >
        {leftIcon && <span className="link-button__icon link-button__icon--left">{leftIcon}</span>}
        <span className="link-button__label">{label}</span>
        {rightIcon ? <span className="link-button__icon link-button__icon--right">{rightIcon}</span> : (IconComponent && <IconComponent />)}
      </button>
    );
  }
);

LinkButton.displayName = 'LinkButton';