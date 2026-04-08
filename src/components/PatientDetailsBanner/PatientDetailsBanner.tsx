import React from 'react';
import './PatientDetailsBanner.css';

export interface PatientDetailsBannerProps {
  name: string;
  time?: string;
  dob: string;
  id: string;
  provider: string;
  showOptions?: boolean;
  onOptionsClick?: () => void;
  className?: string;
}

export const PatientDetailsBanner: React.FC<PatientDetailsBannerProps> = ({
  name,
  time,
  dob,
  id,
  provider,
  showOptions = true,
  onOptionsClick,
  className = '',
}) => {
  return (
    <div className={`patient-details-banner ${className}`}>
      <div className="patient-details-banner__content">
        <div className="patient-details-banner__header">
          <div className="patient-details-banner__name">{name}</div>
          <div className="patient-details-banner__header-right">
            {time && (
              <div className="patient-details-banner__time-badge">
                <div className="patient-details-banner__time">{time}</div>
              </div>
            )}
            {showOptions && (
              <button 
                className="patient-details-banner__options-btn" 
                onClick={onOptionsClick}
                aria-label="Options"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="28.5" height="28.5" rx="5.5" fill="var(--Colors-Functional-Bkg-Bkg_Focus, #D6FFFB)"/>
                  <rect x="0.5" y="0.5" width="28.5" height="28.5" rx="5.5" stroke="var(--Colors-Navigation-Icons-Teal600, #118082)"/>
                  <path d="M14.75 18C14.2859 18 13.8408 18.1844 13.5126 18.5126C13.1844 18.8408 13 19.2859 13 19.75C13 20.2141 13.1844 20.6592 13.5126 20.9874C13.8408 21.3156 14.2859 21.5 14.75 21.5C15.2141 21.5 15.6592 21.3156 15.9874 20.9874C16.3156 20.6592 16.5 20.2141 16.5 19.75C16.5 19.2859 16.3156 18.8408 15.9874 18.5126C15.6592 18.1844 15.2141 18 14.75 18ZM14.75 13C14.2859 13 13.8408 13.1844 13.5126 13.5126C13.1844 13.8408 13 14.2859 13 14.75C13 15.2141 13.1844 15.6592 13.5126 15.9874C13.8408 16.3156 14.2859 16.5 14.75 16.5C15.2141 16.5 15.6592 16.3156 15.9874 15.9874C16.3156 15.6592 16.5 15.2141 16.5 14.75C16.5 14.2859 16.3156 13.8408 15.9874 13.5126C15.6592 13.1844 15.2141 13 14.75 13ZM16.5 9.75C16.5 9.28587 16.3156 8.84075 15.9874 8.51256C15.6592 8.18437 15.2141 8 14.75 8C14.2859 8 13.8408 8.18437 13.5126 8.51256C13.1844 8.84075 13 9.28587 13 9.75C13 10.2141 13.1844 10.6592 13.5126 10.9874C13.8408 11.3156 14.2859 11.5 14.75 11.5C15.2141 11.5 15.6592 11.3156 15.9874 10.9874C16.3156 10.6592 16.5 10.2141 16.5 9.75Z" fill="var(--Colors-Navigation-Icons-Teal600, #118082)"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="patient-details-banner__dob-row">
          <span className="patient-details-banner__label">DOB</span>
          <span className="patient-details-banner__value">{dob}</span>
        </div>
        
        <div className="patient-details-banner__id-provider-row">
          <div className="patient-details-banner__id-group">
            <span className="patient-details-banner__label">ID</span>
            <span className="patient-details-banner__value">{id}</span>
          </div>
          <div className="patient-details-banner__provider-group">
            <span className="patient-details-banner__label">Provider</span>
            <span className="patient-details-banner__value">{provider}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
