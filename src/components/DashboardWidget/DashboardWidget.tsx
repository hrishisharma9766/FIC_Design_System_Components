import React from 'react';
import './DashboardWidget.css';

export type DashboardWidgetType = 'info' | 'success' | 'warning' | 'error';

export interface DashboardWidgetProps {
  className?: string;
  title: string;
  value: string | number;
  statusText: string;
  type?: DashboardWidgetType;
  icon?: React.ReactNode;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  className = '',
  title,
  value,
  statusText,
  type = 'info',
  icon,
}) => {
  return (
    <div className={`dashboard-widget dashboard-widget--${type} ${className}`}>
      <div className="dashboard-widget__content">
        <div className="dashboard-widget__details">
          <div className="dashboard-widget__title">{title}</div>
          <div className="dashboard-widget__value">{value}</div>
          <div className="dashboard-widget__status">{statusText}</div>
        </div>
        <div className="dashboard-widget__icon-container">
          <div className="dashboard-widget__icon-box">
            {icon || (
              <svg 
                className="dashboard-widget__default-icon"
                width="19" 
                height="19" 
                viewBox="0 0 19 19" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1.18164 3.54366C1.18164 2.24322 2.24323 1.18164 3.54367 1.18164H15.3626C16.663 1.18164 17.7246 2.24322 17.7246 3.54366V15.3626C17.7246 16.663 16.663 17.7246 15.3626 17.7246H3.54367C2.24323 17.7246 1.18164 16.663 1.18164 15.3626V3.54366ZM3.54367 5.90567V15.3537H6.53379V5.90567H3.54367ZM15.3538 5.90567H8.85157V15.3537H15.3538V5.90567Z" 
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
