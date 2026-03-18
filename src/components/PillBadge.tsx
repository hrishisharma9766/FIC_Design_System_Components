import React from 'react';
import './PillBadge.css';

// Reusing dmSansStyle pattern from Button/InputFields
const dmSansStyle: React.CSSProperties = {
  fontFamily: 'var(--FontFamily-Family, "DM Sans", sans-serif)',
};

export interface PillBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'blue' | 'fuchsia' | 'lime';
  size?: 'sm' | 'md' | 'lg'; // lg is for stacked variants
  stacked?: boolean;
  subtext?: string;
  children: React.ReactNode;
}

/**
 * PillBadge - A standalone badge component relying on PillBadge.css
 * Mirrors the pattern used in Button for consistency.
 */
export const PillBadge = React.forwardRef<HTMLDivElement, PillBadgeProps>(
  (
    {
      className = '',
      variant = 'blue',
      size = 'md',
      stacked = false,
      subtext,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'pill-badge',
      `pill-badge--${variant}`,
      stacked ? 'pill-badge--stacked' : `pill-badge--${size === 'lg' ? 'md' : size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const titleSizeClass = size === 'lg' ? 'pill-badge__title--lg' : 'pill-badge__title--md';

    return (
      <div
        ref={ref}
        className={classNames}
        style={{ ...dmSansStyle, ...style }}
        {...props}
      >
        <div className={`pill-badge__title ${stacked ? titleSizeClass : ''}`}>
          {children}
        </div>
        {stacked && subtext && (
          <div className="pill-badge__subtext">
            {subtext}
          </div>
        )}
      </div>
    );
  }
);

PillBadge.displayName = 'PillBadge';
