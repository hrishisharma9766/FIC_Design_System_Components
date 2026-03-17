import React, { useState, useRef, useEffect } from 'react';

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
  const getBorderColor = () => {
    if (error) return 'var(--Colors-Functional-Border-Border_Default, #C3C1B5)';
    if (isOpen) return 'var(--Colors-Functional-Border-Border_Focus, #21A49F)';
    return 'var(--Colors-Functional-Border-Border_Default, #C3C1B5)';
  };

  const getBoxShadow = () => {
    if (isOpen && !error) return '0px 0px 0px 4px rgba(39, 188, 183, 0.25)';
    return 'none';
  };

  const getTextColor = () => {
    if (hasValue) return 'var(--Colors-Functional-Txt-Txt_Default, #303030)';
    return 'var(--Colors-Functional-Placeholder-Txt_Placeholder_Default, #71706C)';
  };

  return (
    <div ref={dropdownRef} className="inline-flex flex-col gap-[2px] relative">
      {/* Label */}
      {label && (
        <div
          className={`${config.labelSize} ${config.labelWeight} ${config.labelLineHeight}`}
          style={{
            color: 'var(--Colors-Functional-Label-Txt_Label_Default, #4B4B4A)',
            fontFamily: 'DM Sans',
          }}
        >
          {label}
        </div>
      )}

      {/* Select Input */}
      <div className="relative">
        <div
          className={`w-[274px] ${config.height} relative cursor-pointer`}
          style={{
            background: 'var(--Colors-Functional-Bkg-Bkg_Default, white)',
            borderRadius: '13px',
            outline: `1px ${getBorderColor()} solid`,
            outlineOffset: '-1px',
            boxShadow: getBoxShadow(),
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
          }}
          onClick={handleToggle}
        >
          {/* Display Text */}
          <div
            className={`absolute ${config.inputPadding} ${config.textSize} ${config.textWeight} ${config.textLineHeight}`}
            style={{
              fontFamily: 'DM Sans',
              color: getTextColor(),
            }}
          >
            {displayText}
          </div>

          {/* Caret Icon */}
          <div
            className={`w-[24px] h-[24px] absolute ${config.caretTop} ${config.caretLeft} overflow-hidden`}
          >
            <i
              className="fa-solid fa-chevron-down absolute left-[4px] top-[9.5px] text-[9px]"
              style={{
                color: 'var(--Colors-Functional-Caret-Caret_Default, #71706C)',
              }}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="w-[274px] flex-col justify-start items-start gap-[10px] flex mt-[2px] absolute z-50">
            <div
              className="w-[274px] max-h-[189px] relative overflow-auto"
              style={{
                background: 'var(--Colors-Functional-Bkg-Bkg_Default, white)',
                borderRadius: '13px',
                outline: '1px var(--Colors-Functional-Border-Border_Default, #C3C1B5) solid',
                outlineOffset: '-1px',
              }}
            >
              {/* Custom Scrollbar Styles */}
              <style>{`
                .dropdown-menu::-webkit-scrollbar {
                  width: 12px;
                  border-radius: 11px;
                }
                .dropdown-menu::-webkit-scrollbar-track {
                  background: var(--Colors-Functional-Bkg-Bkg_Dark_300, #E5E4DD);
                  border-radius: 11px;
                }
                .dropdown-menu::-webkit-scrollbar-thumb {
                  background: var(--Colors-Functional-Bkg-Bkg_Scroll_Light500, #959490);
                  border-radius: 11px;
                  border: 1px solid var(--Colors-Functional-Border-Border_Default, #C3C1B5);
                }
              `}</style>

              {/* Options */}
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={option.value}
                    className={`w-[243px] ${config.dropdownItemHeight} ${config.dropdownPadding} mx-[8px] my-[7px] first:mt-[13px] last:mb-[13px] rounded-[11px] flex justify-between items-center cursor-pointer`}
                    style={{
                      background: isSelected
                        ? 'var(--Colors-Functional-Bkg-Bkg_Dark, #EFEEEA)'
                        : isHovered
                        ? 'var(--Colors-Functional-Bkg-Bkg_Hover, #D6FFFB)'
                        : 'transparent',
                      fontFamily: 'DM Sans',
                    }}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={`flex justify-center flex-col ${config.textSize} ${config.textWeight} ${config.textLineHeight}`}
                      style={{
                        color: 'var(--Colors-Functional-Txt-Txt_Default, #303030)',
                      }}
                    >
                      {option.label}
                    </div>

                    {/* Checkmark for selected item */}
                    {isSelected && (
                      <div className="w-[20px] h-[20px] relative flex-shrink-0">
                        <div
                          className="w-[20px] h-[20px] rounded-full flex items-center justify-center"
                          style={{
                            background: 'var(--Colors-Functional-Input-Icons-Icon_Default, #1A77B4)',
                          }}
                        >
                          <i
                            className="fa-solid fa-check text-[10px]"
                            style={{
                              color: 'var(--Colors-Functional-Input-Icons-Icon_White, white)',
                            }}
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
