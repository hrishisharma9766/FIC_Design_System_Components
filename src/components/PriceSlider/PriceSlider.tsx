import React from 'react';
import './PriceSlider.css';

export interface PriceSliderProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onDelete?: () => void;
  size?: 'small' | 'large';
  showDeleteIcon?: boolean;
  labelPosition?: 'none' | 'left' | 'center';
  className?: string;
}

export const PriceSlider: React.FC<PriceSliderProps> = ({
  label = 'Label',
  value = 0,
  min = 0,
  max = 100,
  onChange,
  onDelete,
  size = 'large',
  showDeleteIcon = false,
  labelPosition = 'none',
  className = '',
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange?.(value + 1);
    }
  };

  const renderSlider = () => (
    <div className={`price-slider__controls price-slider__controls--${size}`}>
      <button 
        className="price-slider__btn price-slider__btn--minus" 
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8C15 8.55312 14.5188 9 13.9231 9H2.07692C1.48125 9 1 8.55312 1 8C1 7.44687 1.48125 7 2.07692 7H13.9231C14.5188 7 15 7.44687 15 8Z" fill="currentColor"/>
        </svg>
      </button>
      
      <div className="price-slider__number-slot">
        <span className="price-slider__value">{value}</span>
      </div>

      <button 
        className="price-slider__btn price-slider__btn--plus" 
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.07692 2.07692C9.07692 1.48125 8.59567 1 8 1C7.40433 1 6.92308 1.48125 6.92308 2.07692V6.92308H2.07692C1.48125 6.92308 1 7.40433 1 8C1 8.59567 1.48125 9.07692 2.07692 9.07692H6.92308V13.9231C6.92308 14.5188 7.40433 15 8 15C8.59567 15 9.07692 14.5188 9.07692 13.9231V9.07692H13.9231C14.5188 9.07692 15 8.59567 15 8C15 7.40433 14.5188 6.92308 13.9231 6.92308H9.07692V2.07692Z" fill="currentColor"/>
        </svg>
      </button>

      {showDeleteIcon && (
        <button className="price-slider__delete-btn" onClick={onDelete}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.81634 2.17091C7.97368 1.68966 8.41791 1.375 8.92692 1.375H13.0823C13.5821 1.375 14.0263 1.69892 14.1929 2.17091L14.5076 3.12416H18.0059C18.6537 3.12416 19.172 3.64243 19.172 4.29026C19.172 4.9381 18.6537 5.45637 18.0059 5.45637H3.99411C3.34627 5.45637 2.828 4.9381 2.828 4.29026C2.828 3.64243 3.34627 3.12416 3.99411 3.12416H7.49243L7.80709 2.17091H7.81634ZM3.99411 7.20553H17.9966V18.2928C17.9966 19.5792 16.9508 20.625 15.6644 20.625H6.32632C5.0399 20.625 3.99411 19.5792 3.99411 18.2928V7.20553ZM7.20553 9.53774C6.72428 9.53774 6.32632 9.92644 6.32632 10.4169V17.4136C6.32632 17.8948 6.71502 18.2928 7.20553 18.2928C7.69603 18.2928 8.08473 17.9041 8.08473 17.4136V10.4169C8.08473 9.9357 7.69603 9.53774 7.20553 9.53774ZM10.9907 9.53774C10.5095 9.53774 10.1115 9.92644 10.1115 10.4169V17.4136C10.1115 17.8948 10.5002 18.2928 10.9907 18.2928C11.4812 18.2928 11.87 17.9041 11.87 17.4136V10.4169C11.87 9.9357 11.4812 9.53774 10.9907 9.53774ZM14.7852 9.53774C14.304 9.53774 13.906 9.92644 13.906 10.4169V17.4136C13.906 17.8948 14.2947 18.2928 14.7852 18.2928C15.2757 18.2928 15.6644 17.9041 15.6644 17.4136V10.4169C15.6644 9.9357 15.2757 9.53774 14.7852 9.53774Z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className={`price-slider price-slider--label-${labelPosition} ${className}`}>
      {labelPosition !== 'none' && (
        <label className="price-slider__label">{label}</label>
      )}
      {renderSlider()}
    </div>
  );
};
