import React from 'react';
import './StateBadge.css';

// Reusing dmSansStyle pattern from Button/InputFields/PillBadge
const dmSansStyle = {
  fontFamily: "'DM Sans', sans-serif",
};

// Reusing the same icon logic from Button for consistency
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'plus':
      return (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2.91666V11.0833M2.91666 7H11.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'check':
      return (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'chevron-down':
      return (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'arrow-right':
      return (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.91666 7H11.0833M11.0833 7L7.58333 3.5M11.0833 7L7.58333 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export interface StateBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'active' | 'inactive';
  icon?: string | React.ReactNode;
  children: React.ReactNode;
}

/**
 * StateBadge - A reusable status badge component with icon support.
 * Mirrors the pattern used in Button and PillBadge.
 */
export const StateBadge = React.forwardRef<HTMLDivElement, StateBadgeProps>(
  (
    {
      className = '',
      variant = 'active',
      icon,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'state-badge',
      `state-badge--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderIcon = () => {
      if (!icon) return null;
      
      if (typeof icon === 'string') {
        const svgIcon = getIcon(icon);
        return svgIcon ? <span className="state-badge__icon">{svgIcon}</span> : null;
      }
      
      return <span className="state-badge__icon">{icon}</span>;
    };

    return (
      <div
        ref={ref}
        className={classNames}
        style={{ ...dmSansStyle, ...style }}
        {...props}
      >
        {renderIcon()}
        <div className="state-badge__label">
          {children}
        </div>
      </div>
    );
  }
);

StateBadge.displayName = 'StateBadge';
