import React, { useState, useRef, useEffect, useMemo } from 'react';
import './DatePicker.css';

// dmSansStyle helper for consistent font-family application
const dmSansStyle = {
  fontFamily: "'DM Sans', sans-serif",
};

// Internal SVG Helper Icons for portability
const Icons = {
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 0L4.8541 3.1459H8L5.44272 5L6.29682 8.1459L4 6.25L1.70318 8.1459L2.55728 5L0 3.1459H3.1459L4 0Z" fill="var(--colors-primitive-color-tokens-red-500, #E73D36)" />
    </svg>
  ),
};

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string | [string, string];
  onChange?: (date: string | [string, string]) => void;
  mode?: 'single' | 'range';
  state?: 'default' | 'hover' | 'focus' | 'disabled' | 'readonly';
}

/**
 * DatePicker - A reusable design system component.
 * Strictly adheres to project's design system architecture.
 * Supports single and range modes with presets.
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label = 'Label',
      required = false,
      placeholder = 'Select Date',
      value = '',
      onChange,
      className = '',
      mode = 'single',
      state = 'default',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(typeof value === 'string' ? value : '');
    const [tempSelectedDate, setTempSelectedDate] = useState<string>(typeof value === 'string' ? value : '');
    const [range, setRange] = useState<[string, string]>(Array.isArray(value) ? value : ['', '']);
    const [tempRange, setTempRange] = useState<[string, string]>(Array.isArray(value) ? value : ['', '']);

    useEffect(() => {
      if (typeof value === 'string') {
        setSelectedDate(value);
        setTempSelectedDate(value);
        if (value) {
          const d = new Date(value);
          if (!isNaN(d.getTime())) {
            setCurrentMonth(d.getMonth());
            setCurrentYear(d.getFullYear());
          }
        }
      } else if (Array.isArray(value)) {
        setRange(value);
        setTempRange(value);
        if (value[0]) {
          const d = new Date(value[0]);
          if (!isNaN(d.getTime())) {
            setCurrentMonth(d.getMonth());
            setCurrentYear(d.getFullYear());
          }
        }
      }
    }, [value]);
    
    // Internal state for calendar navigation
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [hoverDate, setHoverDate] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current!);

    const isRangeMode = mode === 'range';
    const isDisabled = state === 'disabled';
    const isReadOnly = state === 'readonly';

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const presets = [
      {
        label: 'Today',
        getValue: () => {
          const d = new Date();
          const s = d.toISOString().split('T')[0];
          return [s, s] as [string, string];
        },
      },
      {
        label: 'Yesterday',
        getValue: () => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          const s = d.toISOString().split('T')[0];
          return [s, s] as [string, string];
        },
      },
      {
        label: 'Last 7 days',
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 6);
          return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]] as [string, string];
        },
      },
      {
        label: 'Last 14 days',
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 13);
          return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]] as [string, string];
        },
      },
      { label: 'Custom', getValue: () => ['', ''] as [string, string] },
    ];

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
      if (isDisabled || isReadOnly) return;
      if (!isOpen) {
        // Sync temp states when opening
        setTempSelectedDate(selectedDate);
        setTempRange(range);
        // Reset selectors
        setIsMonthDropdownOpen(false);
        setIsYearDropdownOpen(false);
      }
      setIsOpen(!isOpen);
    };

    const handleDateClick = (dateStr: string, isFromOtherMonth: boolean) => {
      if (isFromOtherMonth) return;

      if (isRangeMode) {
        if (!tempRange[0] || (tempRange[0] && tempRange[1])) {
          setTempRange([dateStr, '']);
          setHoverDate(null);
        } else {
          const start = new Date(tempRange[0]);
          const end = new Date(dateStr);
          if (end < start) {
            setTempRange([dateStr, tempRange[0]]);
          } else {
            setTempRange([tempRange[0], dateStr]);
          }
          setHoverDate(null);
        }
      } else {
        setTempSelectedDate(dateStr);
      }
    };

    const handlePresetClick = (preset: (typeof presets)[0]) => {
      const newRange = preset.getValue();
      setTempRange(newRange);
      setHoverDate(null);
      
      // Update calendar view to show the start of the range
      if (newRange[0]) {
        const startDate = new Date(newRange[0]);
        setCurrentMonth(startDate.getMonth());
        setCurrentYear(startDate.getFullYear());
      }
    };

    const handleApply = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isRangeMode) {
        setRange(tempRange);
        if (onChange) {
          onChange(tempRange);
        }
      } else {
        setSelectedDate(tempSelectedDate);
        if (onChange) {
          onChange(tempSelectedDate);
        }
      }
      setIsOpen(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isRangeMode) {
        setTempRange(range);
      } else {
        setTempSelectedDate(selectedDate);
      }
      setIsOpen(false);
    };

    const renderCalendar = (month: number, year: number, isSecondCalendar = false) => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthLastDay = new Date(year, month, 0).getDate();

      // Adjust for Monday start (Figma shows Mon-Sun)
      const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

      const days = [];

      // Previous month days
      for (let i = startOffset - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const m = month === 0 ? 11 : month - 1;
        const y = month === 0 ? year - 1 : year;
        days.push({ day, month: m, year: y, currentMonth: false });
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, month, year, currentMonth: true });
      }

      // Next month days
      const totalDays = 42;
      const remainingDays = totalDays - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const m = month === 11 ? 0 : month + 1;
        const y = month === 11 ? year + 1 : year;
        days.push({ day: i, month: m, year: y, currentMonth: false });
      }

      const years = [];
      const currentYearNum = new Date().getFullYear();
      for (let i = currentYearNum - 10; i <= currentYearNum + 10; i++) {
        years.push(i);
      }

      return (
        <div className="datepicker__calendar">
          <div className="datepicker__header">
            <div className="datepicker__header-selectors">
              <div 
                className="datepicker__header-select"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSecondCalendar) {
                    setIsMonthDropdownOpen(!isMonthDropdownOpen);
                    setIsYearDropdownOpen(false);
                  }
                }}
                style={{ position: 'relative' }}
              >
                {months[month]}
                <span className="datepicker__header-icon">
                  <Icons.ChevronDown />
                </span>
                {!isSecondCalendar && isMonthDropdownOpen && (
                  <div className="datepicker__select-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'var(--Colors-Functional-Bkg-Bkg_Default, white)',
                    border: '1px solid var(--Colors-Functional-Border-Border_Default, #C3C1B5)',
                    borderRadius: '8px',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {months.map((m, idx) => (
                      <div
                        key={m}
                        className="datepicker__select-option"
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          background: month === idx ? 'var(--Colors-Functional-Bkg-Bkg_Default, #F6F6F3)' : 'transparent',
                          fontSize: '14px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMonth(idx);
                          setIsMonthDropdownOpen(false);
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div 
                className="datepicker__header-select"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSecondCalendar) {
                    setIsYearDropdownOpen(!isYearDropdownOpen);
                    setIsMonthDropdownOpen(false);
                  }
                }}
                style={{ position: 'relative' }}
              >
                {year}
                <span className="datepicker__header-icon">
                  <Icons.ChevronDown />
                </span>
                {!isSecondCalendar && isYearDropdownOpen && (
                  <div className="datepicker__select-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'var(--Colors-Functional-Bkg-Bkg_Default, white)',
                    border: '1px solid var(--Colors-Functional-Border-Border_Default, #C3C1B5)',
                    borderRadius: '8px',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {years.map((y) => (
                      <div
                        key={y}
                        className="datepicker__select-option"
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          background: year === y ? 'var(--Colors-Functional-Bkg-Bkg_Default, #F6F6F3)' : 'transparent',
                          fontSize: '14px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentYear(y);
                          setIsYearDropdownOpen(false);
                        }}
                      >
                        {y}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isRangeMode && <div className="datepicker__divider" />}

          <div className="datepicker__weekdays">
            {weekdays.map((wd) => (
              <div key={wd} className="datepicker__weekday">
                {wd}
              </div>
            ))}
          </div>

          <div className="datepicker__days" onMouseLeave={() => setHoverDate(null)}>
            {days.map((d, idx) => {
              const dateStr = `${d.year}-${(d.month + 1).toString().padStart(2, '0')}-${d.day.toString().padStart(2, '0')}`;
              const isSelected = isRangeMode ? tempRange[0] === dateStr || tempRange[1] === dateStr : tempSelectedDate === dateStr;
              
              let isInRange = false;
              if (isRangeMode && tempRange[0]) {
                const start = new Date(tempRange[0]);
                const end = tempRange[1] ? new Date(tempRange[1]) : (hoverDate ? new Date(hoverDate) : null);
                const current = new Date(dateStr);
                
                if (end) {
                  const actualStart = start < end ? start : end;
                  const actualEnd = start < end ? end : start;
                  isInRange = current > actualStart && current < actualEnd;
                }
              }

              return (
                <div
                  key={idx}
                  className={`datepicker__day ${!d.currentMonth ? 'datepicker__day--disabled' : ''} ${
                    isSelected ? 'datepicker__day--selected' : ''
                  } ${isInRange ? 'datepicker__day--in-range' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDateClick(dateStr, !d.currentMonth);
                  }}
                  onMouseEnter={() => {
                    if (isRangeMode && tempRange[0] && !tempRange[1]) {
                      setHoverDate(dateStr);
                    }
                  }}
                >
                  <div className="datepicker__day-text">{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const displayValue = useMemo(() => {
      if (isRangeMode) {
        if (range[0] && range[1]) {
          return `${range[0]} - ${range[1]}`;
        } else if (range[0]) {
          return `${range[0]} - ...`;
        }
        return '';
      }
      return selectedDate;
    }, [isRangeMode, range, selectedDate]);

    const rootClasses = [
      'datepicker',
      isRangeMode ? 'datepicker--range' : '',
      className,
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'datepicker__input-wrapper',
      isOpen ? 'datepicker__input-wrapper--focus' : '',
      `datepicker__input-wrapper--${state}`,
      isDisabled ? 'datepicker__input-wrapper--disabled' : '',
      isReadOnly ? 'datepicker__input-wrapper--readonly' : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={rootClasses} ref={containerRef} style={dmSansStyle} {...props}>
        {label && (
          <div className="datepicker__label-row">
            <span className="datepicker__label">{label}</span>
            {required && (
              <span className="datepicker__required-star">
                <Icons.Star />
              </span>
            )}
          </div>
        )}

        <div className={inputClasses} onClick={handleToggle}>
          {displayValue ? (
            <span className="datepicker__value">{displayValue}</span>
          ) : (
            <span className="datepicker__placeholder">{placeholder}</span>
          )}
          <span className="datepicker__icon-wrapper">
            <Icons.Calendar />
          </span>
        </div>

        {isOpen && (
          <div 
            className={`datepicker__dropdown ${isRangeMode ? 'datepicker__dropdown--range' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isRangeMode ? (
              <div style={{ display: 'flex', flex: 1 }}>
                <div className="datepicker__presets">
                  {presets.map((p) => {
                    const isActive = JSON.stringify(tempRange) === JSON.stringify(p.getValue());
                    return (
                      <div
                        key={p.label}
                        className={`datepicker__preset ${isActive ? 'datepicker__preset--active' : ''}`}
                        onClick={() => handlePresetClick(p)}
                      >
                        {p.label}
                      </div>
                    );
                  })}
                </div>
                <div className="datepicker__vertical-divider" />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="datepicker__calendar-container">
                    {renderCalendar(currentMonth, currentYear, false)}
                    <div className="datepicker__vertical-divider datepicker__vertical-divider--calendar" />
                    {renderCalendar(
                      currentMonth === 11 ? 0 : currentMonth + 1,
                      currentMonth === 11 ? currentYear + 1 : currentYear,
                      true
                    )}
                  </div>
                  <div className="datepicker__footer">
                    <div className="datepicker__divider" />
                    <div className="datepicker__actions">
                      <button
                        className="datepicker__button datepicker__button--cancel"
                        onClick={handleCancel}
                      >
                        CANCEL
                      </button>
                      <button
                        className="datepicker__button datepicker__button--apply"
                        onClick={handleApply}
                        disabled={!tempRange[0] || !tempRange[1]}
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="datepicker__dropdown-main">
                  <div className="datepicker__calendar-container">
                    {renderCalendar(currentMonth, currentYear, false)}
                  </div>
                </div>

                <div className="datepicker__footer">
                  <hr />
                  <div className="datepicker__actions">
                    <button
                      className="datepicker__button datepicker__button--cancel"
                      onClick={handleCancel}
                    >
                      CANCEL
                    </button>
                    <button
                      className="datepicker__button datepicker__button--apply"
                      onClick={handleApply}
                      disabled={!tempSelectedDate}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

