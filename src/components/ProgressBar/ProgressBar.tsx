import React from 'react';
import './ProgressBar.css';

// Reusing dmSansStyle pattern from other components
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  percentage?: number;
  usedText?: string;
  remainingText?: string;
  variant?: 'default' | 'high-usage';
  size?: 'sm' | 'md' | 'lg';
  withCard?: boolean;
  width?: string | number;
}

/**
 * ProgressBar Component
 * A reusable progress bar following the design system tokens and patterns.
 * 
 * Sizes:
 * - sm: 4px height
 * - md: 10px height
 * - lg: 16px height
 * 
 * Variants:
 * - default: Teal fill
 * - high-usage: Orange fill
 * 
 * Options:
 * - withCard: Wraps in a card with background and outline (Mode 1 light)
 * - width: Custom width for the progress bar (defaults to 211px from CSS)
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      label,
      percentage = 0,
      usedText,
      remainingText,
      variant = 'default',
      size = 'sm',
      withCard = false,
      width,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    const containerClasses = [
      'progressbar',
      withCard ? 'progressbar--card' : '',
      className,
    ].filter(Boolean).join(' ');

    const trackClasses = [
      'progressbar__track',
      `progressbar__track--${size}`,
    ].join(' ');

    const fillClasses = [
      'progressbar__fill',
      `progressbar__fill--${variant}`,
    ].join(' ');

    const containerStyle: React.CSSProperties = {
      ...dmSansStyle,
      width: width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={containerStyle}
        {...props}
      >
        {/* Header section with Label and Percentage */}
        {(label || percentage !== undefined) && (
          <div className="progressbar__header">
            {label && <span className="progressbar__label">{label}</span>}
            {percentage !== undefined && (
              <span className="progressbar__percentage">{clampedPercentage}%</span>
            )}
          </div>
        )}

        {/* The actual progress bar track and fill */}
        <div className={trackClasses}>
          <div
            className={fillClasses}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>

        {/* Footer section with used and remaining text */}
        {(usedText || remainingText) && (
          <div className="progressbar__footer">
            {usedText && <span className="progressbar__used">{usedText}</span>}
            {remainingText && (
              <span className="progressbar__remaining">{remainingText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
