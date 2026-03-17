import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface DropDownOption {
  value: string;
  label: string;
}

export interface SingleSelectDropDownProps {
  label?: string;
  placeholder?: string;
  options: DropDownOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
}

export function SingleSelectDropDown({
  label,
  placeholder = 'Select',
  options = [],
  value,
  onChange,
  size = 'medium',
  disabled = false,
  error = false,
}: SingleSelectDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get size-specific styles
  const sizeConfig = {
    small: {
      height: 'h-[25px]',
      labelSize: 'text-[14px]',
      labelWeight: 'font-[600]',
      labelLineHeight: 'leading-[20.37px]',
      textSize: 'text-[12px]',
      textWeight: 'font-[500]',
      textLineHeight: 'leading-[17.46px]',
      inputPadding: 'px-[14px] py-[4px]',
      caretTop: 'top-[1.5px]',
      caretLeft: 'left-[231px]',
      dropdownItemHeight: 'h-[26px]',
      dropdownPadding: 'px-[12px] py-[2px]',
    },
    medium: {
      height: 'h-[36px]',
      labelSize: 'text-[14px]',
      labelWeight: 'font-[600]',
      labelLineHeight: 'leading-[20.37px]',
      textSize: 'text-[14px]',
      textWeight: 'font-[500]',
      textLineHeight: 'leading-[20.37px]',
      inputPadding: 'px-[14px] py-[8px]',
      caretTop: 'top-[5.5px]',
      caretLeft: 'left-[241px]',
      dropdownItemHeight: 'h-[34px]',
      dropdownPadding: 'px-[12px] py-[4px]',
    },
    large: {
      height: 'h-[45px]',
      labelSize: 'text-[16px]',
      labelWeight: 'font-[600]',
      labelLineHeight: 'leading-[23.28px]',
      textSize: 'text-[16px]',
      textWeight: 'font-[500]',
      textLineHeight: 'leading-[23.28px]',
      inputPadding: 'px-[14px] py-[11px]',
      caretTop: 'top-[11.5px]',
      caretLeft: 'left-[231px]',
      dropdownItemHeight: 'h-[34px]',
      dropdownPadding: 'px-[12px] py-[4px]',
    },
  };

  const config = sizeConfig[size];

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const hasValue = !!selectedOption;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Determine border and background colors based on state
  const getBorderClass = () => {
    if (error) return 'border-destructive';
    if (isOpen) return 'border-primary';
    return 'border-border';
  };

  const getTextColorClass = () => {
    if (hasValue) return 'text-foreground';
    return 'text-muted-foreground';
  };

  return (
    <div ref={dropdownRef} className="inline-flex flex-col gap-0.5 relative">
      {/* Label */}
      {label && (
        <div
          className={cn(
            config.labelSize,
            config.labelWeight,
            config.labelLineHeight,
            "text-secondary font-sans mb-1"
          )}
        >
          {label}
        </div>
      )}

      {/* Select Input */}
      <div className="relative">
        <div
          className={cn(
            "w-[274px] relative cursor-pointer bg-background rounded-[13px] border outline-none",
            config.height,
            getBorderClass(),
            disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "opacity-100 pointer-events-auto"
          )}
          onClick={handleToggle}
          tabIndex={disabled ? -1 : 0}
        >
          {/* Display Text */}
          <div
            className={cn(
              "absolute",
              config.inputPadding,
              config.textSize,
              config.textWeight,
              config.textLineHeight,
              getTextColorClass(),
              "font-sans"
            )}
          >
            {displayText}
          </div>

          {/* Caret Icon */}
          <div
            className={cn(
              "w-6 h-6 absolute overflow-hidden",
              config.caretTop,
              config.caretLeft,
              isOpen && "rotate-180"
            )}
          >
            <i
              className="fa-solid fa-chevron-down absolute left-1 top-[9.5px] text-[9px] text-muted-foreground"
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="w-[274px] flex-col justify-start items-start gap-2.5 flex mt-0.5 absolute z-50">
            <div
              className="w-[274px] max-h-[189px] relative overflow-auto bg-background rounded-[13px] border border-border custom-scrollbar"
            >
              {/* Options */}
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={option.value}
                    className={cn(
                      "w-[243px] mx-2 my-1.5 first:mt-3 last:mb-3 rounded-[11px] flex justify-between items-center cursor-pointer font-sans px-3",
                      config.dropdownItemHeight,
                      isSelected ? 'bg-muted/30' : isHovered ? 'bg-muted/10' : 'bg-transparent'
                    )}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={cn(
                        "flex justify-center flex-col text-foreground",
                        config.textSize,
                        config.textWeight,
                        config.textLineHeight
                      )}
                    >
                      {option.label}
                    </div>

                    {/* Checkmark for selected item */}
                    {isSelected && (
                      <div className="w-5 h-5 relative flex-shrink-0">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center bg-primary"
                        >
                          <i
                            className="fa-solid fa-check text-[10px] text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
