import React, { useState, useRef, useEffect } from 'react';
import './SearchBox.css';

const dmSansStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
};

export interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  collapsible?: boolean;
  onSearch?: (value: string) => void;
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ collapsible = false, className = '', disabled, placeholder = 'Search by whatever thing...', onSearch, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(!collapsible);
    const [searchValue, setSearchValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync expanded state when collapsible prop changes
    useEffect(() => {
      setIsExpanded(!collapsible);
    }, [collapsible]);

    const handleToggle = () => {
      if (collapsible && !disabled) {
        setIsExpanded(!isExpanded);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(searchValue);
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };

    // Close on click outside if collapsible
    useEffect(() => {
      if (!collapsible) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          if (searchValue === '') {
            setIsExpanded(false);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [collapsible, searchValue]);

    const containerClasses = [
      'search-box',
      collapsible ? 'search-box--collapsible' : '',
      isExpanded ? 'search-box--expanded' : 'search-box--collapsed',
      disabled ? 'search-box--disabled' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses} style={dmSansStyle} ref={containerRef}>
        <div className="search-box__wrapper" onClick={handleToggle}>
          <div className="search-box__icon-container">
            <svg 
              className="search-box__icon" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5Z" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <path 
                d="M10 10L14 14" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {isExpanded && (
            <input
              ref={ref}
              type="text"
              className="search-box__input"
              placeholder={placeholder}
              value={searchValue}
              disabled={disabled}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus={collapsible && isExpanded}
              {...props}
            />
          )}
        </div>
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';
