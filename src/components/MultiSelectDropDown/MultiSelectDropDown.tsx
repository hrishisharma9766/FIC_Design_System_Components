import React, { useState, useRef, useEffect } from 'react';
import './MultiSelectDropDown.css';
import { Checkbox } from '../Checkbox/Checkbox';

export interface MultiSelectDropDownOption {
  value: string;
  label: string;
}

export interface MultiSelectDropDownProps {
  className?: string;
  label?: string;
  placeholder?: string;
  options: MultiSelectDropDownOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  state?: 'default' | 'disabled' | 'readonly';
  size?: 'sm' | 'md' | 'lg';
}

const CaretIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M7.12636 9.63447C7.20737 9.54836 7.31719 9.5 7.43169 9.5C7.54618 9.5 7.656 9.54836 7.73701 9.63447L11.4032 13.5359C11.4166 13.5502 11.4325 13.5615 11.45 13.5692C11.4675 13.577 11.4863 13.5809 11.5052 13.5809C11.5241 13.5809 11.5429 13.577 11.5604 13.5692C11.5779 13.5615 11.5938 13.5502 11.6072 13.5359L15.2734 9.63447C15.3553 9.55325 15.4636 9.50903 15.5756 9.51114C15.6875 9.51324 15.7943 9.56149 15.8735 9.64573C15.9526 9.72997 15.998 9.84362 15.9999 9.96274C16.0019 10.0819 15.9604 10.1971 15.884 10.2843L12.2178 14.1857C12.1242 14.2854 12.0131 14.3644 11.8907 14.4183C11.7684 14.4722 11.6373 14.5 11.5049 14.5C11.3725 14.5 11.2414 14.4722 11.1191 14.4183C10.9968 14.3644 10.8856 14.2854 10.792 14.1857L7.12636 10.2843C7.04545 10.1981 7 10.0812 7 9.95938C7 9.83754 7.04545 9.72068 7.12636 9.63447Z" 
      fill="currentColor"
    />
  </svg>
);

export const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
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
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  const handleSelect = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];

    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
  };

  const handleSelectAll = () => {
    const allValues = options.map(opt => opt.value);
    const newValues = selectedValues.length === options.length ? [] : allValues;
    
    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
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
    switch (state) {
      case 'disabled': return 'multi-select-dropdown--disabled';
      case 'readonly': return 'multi-select-dropdown--readonly';
      default: return '';
    }
  };

  const containerClasses = [
    'multi-select-dropdown',
    `multi-select-dropdown--${size}`,
    getStateClass(),
    className,
  ].filter(Boolean).join(' ');

  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));
  const displayText = selectedOptions.length > 0
    ? selectedOptions.map(opt => opt.label).join(', ')
    : placeholder;

  const isAllSelected = selectedValues.length === options.length;
  const isSomeSelected = selectedValues.length > 0 && !isAllSelected;

  return (
    <div className={containerClasses} ref={dropdownRef}>
      <label className="multi-select-dropdown__label">{label}</label>
      <div
        className="multi-select-dropdown__select-container"
        onClick={() => state === 'default' && setIsOpen(!isOpen)}
      >
        <div className="multi-select-dropdown__select">
          <div className="multi-select-dropdown__checkbox-icon">
            <Checkbox 
              checked={isAllSelected} 
              indeterminate={isSomeSelected} 
              label=""
              className="multi-select-dropdown__base-checkbox"
            />
          </div>
          <div className="multi-select-dropdown__value">
            {displayText}
          </div>
          <span className="multi-select-dropdown__caret">
            <CaretIcon isOpen={isOpen} />
          </span>
        </div>
        {isOpen && (
          <div className="multi-select-dropdown__dropdown">
            <div 
              className={`multi-select-dropdown__option ${isAllSelected ? 'multi-select-dropdown__option--selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectAll();
              }}
            >
              <div className="multi-select-dropdown__option-checkbox">
                <Checkbox 
                  checked={isAllSelected} 
                  indeterminate={isSomeSelected} 
                  label=""
                  className="multi-select-dropdown__base-checkbox"
                />
              </div>
              <span className="multi-select-dropdown__option-text">Select All</span>
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                className={`multi-select-dropdown__option ${selectedValues.includes(option.value) ? 'multi-select-dropdown__option--selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value);
                }}
              >
                <div className="multi-select-dropdown__option-checkbox">
                  <Checkbox 
                    checked={selectedValues.includes(option.value)} 
                    label=""
                    className="multi-select-dropdown__base-checkbox"
                  />
                </div>
                <span className="multi-select-dropdown__option-text">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};