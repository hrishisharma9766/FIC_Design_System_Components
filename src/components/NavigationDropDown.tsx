import React, { useState, useRef, useEffect } from 'react';
import './NavigationDropDown.css';

export interface NavigationDropDownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  id?: string | number;
}

export interface NavigationDropDownProps {
  label?: string;
  icon?: React.ReactNode;
  items: NavigationDropDownItem[];
  className?: string;
  onSelect?: (item: NavigationDropDownItem) => void;
  variant?: 'default' | 'hover' | 'active' | 'disabled';
  hasLabel?: boolean;
  hasDropdownIcon?: boolean;
  menuPlacement?: 'left' | 'right';
}

export const NavigationDropDown: React.FC<NavigationDropDownProps> = ({
  label,
  icon,
  items,
  className = '',
  onSelect,
  variant = 'default',
  hasLabel = true,
  hasDropdownIcon = true,
  menuPlacement = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: NavigationDropDownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  };

  return (
    <div 
      className={`nav-dropdown ${isOpen ? 'nav-dropdown--open' : ''} nav-dropdown--${variant} ${className}`} 
      ref={dropdownRef}
      data-has-label={hasLabel}
      data-hasdropdwonboxicon={hasDropdownIcon ? "Show" : "None"}
    >
      <button 
        className="nav-dropdown__trigger" 
        onClick={handleToggle}
        type="button"
        aria-expanded={isOpen}
        disabled={variant === 'disabled'}
      >
        {hasLabel && label && <span className="nav-dropdown__label">{label}</span>}
        {(icon || hasDropdownIcon) && (
          <div className="nav-dropdown__icon-box">
            <div className="nav-dropdown__icon-inner">
              {icon && <span className="nav-dropdown__icon">{icon}</span>}
            </div>
            {hasDropdownIcon && (
              <svg 
                className="nav-dropdown__caret" 
                width="9" 
                height="5" 
                viewBox="0 0 9 5" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 5L0.602886 0.5L8.39711 0.5L4.5 5Z" fill="currentColor" />
              </svg>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className={`nav-dropdown__menu ${menuPlacement === 'right' ? 'nav-dropdown__menu--right' : ''}`}>
          {items.map((item, index) => (
            <button
              key={item.id || index}
              className="nav-dropdown__item"
              onClick={() => handleItemClick(item)}
              type="button"
            >
              {item.icon && <span className="nav-dropdown__item-icon">{item.icon}</span>}
              <span className="nav-dropdown__item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
