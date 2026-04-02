import React from 'react';
import './AddOnsCard.css';

export interface AddOnsCardOption {
  id: string;
  verifications: string;
  price: string;
  provider?: string;
}

export interface AddOnsCardProps {
  className?: string;
  title?: string;
  variant?: 'more-than-1-option' | '1-option';
  options: AddOnsCardOption[];
  onAdd?: (id: string) => void;
}

export const AddOnsCard: React.FC<AddOnsCardProps> = ({
  className = '',
  title = 'Eligibility Verification',
  variant = 'more-than-1-option',
  options,
  onAdd,
}) => {
  return (
    <div className={`addon-card addon-card--${variant} ${className}`}>
      <div className="addon-card__title">{title}</div>
      <div className="addon-card__options">
        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            {index > 0 && variant === 'more-than-1-option' && (
              <div className="addon-card__divider" />
            )}
            <div className="addon-card__option-row">
              <div className="addon-card__option-info">
                <span className="addon-card__verifications">{option.verifications}</span>
                <br />
                <span className="addon-card__price">{option.price}</span>
                {option.provider && (
                  <span className="addon-card__provider"> {option.provider}</span>
                )}
              </div>
              <button
                className="addon-card__add-btn"
                onClick={() => onAdd?.(option.id)}
              >
                ADD
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};