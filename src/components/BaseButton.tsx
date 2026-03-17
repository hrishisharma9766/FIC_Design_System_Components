import React from 'react';
import './BaseButton.css';

// Common style for DM Sans (mirrored from input-fields.tsx)
const dmSansStyle = { fontFamily: "'DM Sans', sans-serif" };

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'brand' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean; // For future Radix Slot support if needed
}

/**
 * BaseButton - A standalone button component relying on BaseButton.css
 * This component maps design system tokens to functional states without
 * relying on Tailwind utility classes for its core styling.
 */
export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    // Helper to render Font Awesome icons (mirrored from input-fields.tsx)
    const renderIcon = (icon: React.ReactNode) => {
      if (typeof icon === 'string' && !icon.includes('+')) {
        return <i className={`fa-solid fa-${icon}`} aria-hidden="true" />;
      }
      return icon;
    };

    // Construct class names
    const classNames = [
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      isLoading ? 'base-button--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || isLoading}
        style={{ ...dmSansStyle, ...style }}
        {...props}
      >
        {isLoading && <span className="base-button__spinner" aria-hidden="true" />}
        
        {leftIcon && !isLoading && (
          <span className="base-button__icon base-button__icon--left" aria-hidden="true">
            {renderIcon(leftIcon)}
          </span>
        )}
        
        <span className="base-button__label">{children}</span>
        
        {rightIcon && !isLoading && (
          <span className="base-button__icon base-button__icon--right" aria-hidden="true">
            {renderIcon(rightIcon)}
          </span>
        )}
      </button>
    );
  }
);

BaseButton.displayName = 'BaseButton';
