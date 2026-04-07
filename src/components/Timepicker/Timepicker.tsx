import React, { useState, useRef, useEffect } from 'react';
import './Timepicker.css';

export interface TimepickerProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  startTime?: string;
  endTime?: string;
  onChange?: (value: string) => void;
  onRangeChange?: (start: string, end: string) => void;
  className?: string;
  is24Hour?: boolean;
  mode?: 'single' | 'range';
}

export const Timepicker: React.FC<TimepickerProps> = ({
  label = 'Label',
  required = false,
  placeholder = 'Select Time',
  value = '',
  startTime: initialStartTime = '',
  endTime: initialEndTime = '',
  onChange,
  onRangeChange,
  className = '',
  is24Hour = false,
  mode = 'single',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [selecting, setSelecting] = useState<'start' | 'end' | 'single'>('single');
  const [tempHour, setTempHour] = useState('00');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempPeriod, setTempPeriod] = useState('AM');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'single') {
      setSelectedTime(value);
    } else {
      setStartTime(initialStartTime);
      setEndTime(initialEndTime);
    }
  }, [value, initialStartTime, initialEndTime, mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hours = is24Hour 
    ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i).toString().padStart(2, '0'));
  
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleInputClick = (type: 'start' | 'end' | 'single') => {
    setSelecting(type);
    setIsOpen(true);
    
    // Initialize temp values based on current selection
    const currentVal = type === 'start' ? startTime : type === 'end' ? endTime : selectedTime;
    if (currentVal) {
      const parts = currentVal.split(' ');
      const timeParts = parts[0].split(':');
      setTempHour(timeParts[0]);
      setTempMinute(timeParts[1]);
      if (!is24Hour && parts[1]) {
        setTempPeriod(parts[1]);
      }
    }
  };

  const handleOk = () => {
    const newTime = is24Hour 
      ? `${tempHour}:${tempMinute}`
      : `${tempHour}:${tempMinute} ${tempPeriod}`;
    
    if (mode === 'single') {
      setSelectedTime(newTime);
      onChange?.(newTime);
      setIsOpen(false);
    } else {
      if (selecting === 'start') {
        setStartTime(newTime);
        onRangeChange?.(newTime, endTime);
        setSelecting('end'); // Auto switch to end time selection
      } else {
        setEndTime(newTime);
        onRangeChange?.(startTime, newTime);
        setIsOpen(false);
      }
    }
  };

  const handleNow = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    let timeStr = '';
    
    if (is24Hour) {
      timeStr = `${h.toString().padStart(2, '0')}:${m}`;
    } else {
      const p = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      timeStr = `${h.toString().padStart(2, '0')}:${m} ${p}`;
    }

    if (mode === 'single') {
      setSelectedTime(timeStr);
      onChange?.(timeStr);
      setIsOpen(false);
    } else {
      if (selecting === 'start') {
        setStartTime(timeStr);
        onRangeChange?.(timeStr, endTime);
      } else {
        setEndTime(timeStr);
        onRangeChange?.(startTime, timeStr);
      }
      setIsOpen(false);
    }
  };

  return (
    <div className={`timepicker ${mode === 'range' ? 'timepicker--range' : ''} ${className}`} ref={dropdownRef}>
      {label && (
        <div className="timepicker__label-container">
          <label className="timepicker__label">{label}</label>
          {required && (
            <span className="timepicker__asterisk">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.123 0L3.362 3.189L0.513 1.99L0 3.954L2.94 4.312L0.98 6.8L2.382 8L3.988 5L5.618 8L7.018 6.8L5.06 4.313L8 3.954L7.464 1.99L4.664 3.19L4.9 0H3.123Z" fill="#E73D36" />
              </svg>
            </span>
          )}
        </div>
      )}

      {mode === 'single' ? (
        <div 
          className={`timepicker__input ${isOpen ? 'timepicker__input--open' : ''}`}
          onClick={() => handleInputClick('single')}
        >
          <span className={selectedTime ? 'timepicker__value' : 'timepicker__placeholder'}>
            {selectedTime || placeholder}
          </span>
          <span className="timepicker__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.0001 1.6001C11.5351 1.6001 14.4001 4.4651 14.4001 8.0001C14.4001 11.5351 11.5351 14.4001 8.0001 14.4001C4.4651 14.4001 1.6001 11.5351 1.6001 8.0001C1.6001 4.4651 4.4651 1.6001 8.0001 1.6001ZM7.4001 4.6001V8.0001C7.4001 8.2001 7.5001 8.3876 7.6676 8.5001L10.0676 10.1001C10.3426 10.2851 10.7151 10.2101 10.9001 9.9326C11.0851 9.6551 11.0101 9.2851 10.7326 9.1001L8.6001 7.6801V4.6001C8.6001 4.2676 8.3326 4.0001 8.0001 4.0001C7.6676 4.0001 7.4001 4.2676 7.4001 4.6001Z" fill="#4B4B4A" />
            </svg>
          </span>
        </div>
      ) : (
        <div className={`timepicker__input timepicker__input--range ${isOpen ? 'timepicker__input--open' : ''}`}>
          <div className="timepicker__range-wrapper">
            <span 
              className={`timepicker__range-side ${selecting === 'start' ? 'timepicker__range-side--active' : ''} ${startTime ? 'timepicker__value' : 'timepicker__placeholder'}`}
              onClick={() => handleInputClick('start')}
            >
              {startTime || 'Start time'}
            </span>
            <span className="timepicker__separator">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 7.5C4 7.22386 4.22386 7 4.5 7H10.2929L8.14645 4.85355C7.95118 4.65829 7.95118 4.34171 8.14645 4.14645C8.34171 3.95118 8.65829 3.95118 8.85355 4.14645L11.8536 7.14645C12.0488 7.34171 12.0488 7.65829 11.8536 7.85355L8.85355 10.8536C8.65829 11.0488 8.34171 11.0488 8.14645 10.8536C7.95118 10.6583 7.95118 10.3417 8.14645 10.1464L10.2929 8H4.5C4.22386 8 4 7.77614 4 7.5Z" fill="#4B4B4A"/>
              </svg>
            </span>
            <span 
              className={`timepicker__range-side ${selecting === 'end' ? 'timepicker__range-side--active' : ''} ${endTime ? 'timepicker__value' : 'timepicker__placeholder'}`}
              onClick={() => handleInputClick('end')}
            >
              {endTime || 'End time'}
            </span>
          </div>
          <span className="timepicker__icon" onClick={() => handleInputClick(selecting)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.0001 1.6001C11.5351 1.6001 14.4001 4.4651 14.4001 8.0001C14.4001 11.5351 11.5351 14.4001 8.0001 14.4001C4.4651 14.4001 1.6001 11.5351 1.6001 8.0001C1.6001 4.4651 4.4651 1.6001 8.0001 1.6001ZM7.4001 4.6001V8.0001C7.4001 8.2001 7.5001 8.3876 7.6676 8.5001L10.0676 10.1001C10.3426 10.2851 10.7151 10.2101 10.9001 9.9326C11.0851 9.6551 11.0101 9.2851 10.7326 9.1001L8.6001 7.6801V4.6001C8.6001 4.2676 8.3326 4.0001 8.0001 4.0001C7.6676 4.0001 7.4001 4.2676 7.4001 4.6001Z" fill="#4B4B4A" />
            </svg>
          </span>
        </div>
      )}

      {isOpen && (
        <div className="timepicker__dropdown">
          <div className="timepicker__header">
            {mode === 'range' && (
              <div className="timepicker__tabs">
                <div 
                  className={`timepicker__tab ${selecting === 'start' ? 'timepicker__tab--active' : ''}`}
                  onClick={() => setSelecting('start')}
                >
                  Start Time
                </div>
                <div 
                  className={`timepicker__tab ${selecting === 'end' ? 'timepicker__tab--active' : ''}`}
                  onClick={() => setSelecting('end')}
                >
                  End Time
                </div>
              </div>
            )}
          </div>
          <div className="timepicker__selectors">
            <div className="timepicker__column">
              {hours.map(h => (
                <div 
                  key={h} 
                  className={`timepicker__item ${tempHour === h ? 'timepicker__item--selected' : ''}`}
                  onClick={() => setTempHour(h)}
                >
                  {h}
                </div>
              ))}
            </div>
            <div className="timepicker__column">
              {minutes.map(m => (
                <div 
                  key={m} 
                  className={`timepicker__item ${tempMinute === m ? 'timepicker__item--selected' : ''}`}
                  onClick={() => setTempMinute(m)}
                >
                  {m}
                </div>
              ))}
            </div>
            {!is24Hour && (
              <div className="timepicker__column timepicker__column--period">
                {['AM', 'PM'].map(p => (
                  <div 
                    key={p} 
                    className={`timepicker__item ${tempPeriod === p ? 'timepicker__item--selected' : ''}`}
                    onClick={() => setTempPeriod(p)}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="timepicker__footer">
            <button className="timepicker__btn timepicker__btn--secondary" onClick={handleNow}>NOW</button>
            <button className="timepicker__btn timepicker__btn--primary" onClick={handleOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};
