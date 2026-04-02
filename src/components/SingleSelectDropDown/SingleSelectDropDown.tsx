import React, { useState, useRef, useEffect } from 'react';
import './SingleSelectDropDown.css';

export interface SingleSelectDropDownOption {
  value: string;
  label: string;
}

export interface SingleSelectDropDownProps {
  className?: string;
  label?: string;
  placeholder?: string;
  options: SingleSelectDropDownOption[];
  value?: string;
  onChange?: (value: string) => void;
  state?: 'default' | 'focus' | 'hover' | 'selected' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
}

const CaretIcon = () => (
  <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.646446 0.646446C0.841708 0.451184 1.15829 0.451184 1.35355 0.646446L4.5 3.79289L7.64644 0.646446C7.84171 0.451184 8.15829 0.451184 8.35355 0.646446C8.54882 0.841708 8.54882 1.15829 8.35355 1.35355L4.85355 4.85355C4.65829 5.04882 4.34171 5.04882 4.14644 4.85355L0.646446 1.35355C0.451184 1.15829 0.451184 0.841708 0.646446 0.646446Z" fill="currentColor"/>
  </svg>
);

export const SingleSelectDropDown: React.FC<SingleSelectDropDownProps> = ({
  className = '',
  label = 'Input_Label',
  placeholder = 'Select',
  options,
  value,
  onChange,
  state = 'default',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getStateClass = () => {
    if (isOpen) return 'single-select-dropdown--focus';
    switch (state) {
      case 'focus': return 'single-select-dropdown--focus';
      case 'hover': return 'single-select-dropdown--hover';
      case 'selected': return 'single-select-dropdown--selected';
      case 'disabled': return 'single-select-dropdown--disabled';
      default: return '';
    }
  };

  const containerClasses = [
    'single-select-dropdown',
    `single-select-dropdown--${size}`,
    getStateClass(),
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={dropdownRef}>
      <label className="single-select-dropdown__label">{label}</label>
      <div
        className="single-select-dropdown__select-container"
        onClick={() => !state.includes('disabled') && setIsOpen(!isOpen)}
      >
        <div className="single-select-dropdown__select">
          <span className={`single-select-dropdown__value ${!selectedOption ? 'single-select-dropdown__value--placeholder' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="single-select-dropdown__caret">
            <CaretIcon />
          </span>
        </div>
        {isOpen && (
          <div className="single-select-dropdown__dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`single-select-dropdown__option ${option.value === selectedValue ? 'single-select-dropdown__option--selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value);
                }}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};