import React, { useState } from 'react';

const dmSans = { fontFamily: "'DM Sans', sans-serif" };

interface TimePickerProps {
  label?: string;
  type?: 'single' | 'range';
  format?: '12h' | '24h';
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export function TimePicker({ label, type = 'single', format = '12h', required = true, disabled = false, error }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isError = !!error;

  return (
    <div className={`relative inline-block w-[199px] ${disabled ? 'opacity-60' : ''}`} style={dmSans}>
      {/* Input Label */}
      {label && (
        <div className="flex items-start gap-1 mb-1">
          <span className="text-[14px] font-semibold text-[#4B4B4A]">{label}</span>
          {required && <span className="text-[#E73D36] text-[14px]">*</span>}
        </div>
      )}

      {/* Input Box */}
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-[10px] py-[6px] bg-white border rounded-[13px] transition-all h-[36px] ${
          isError 
            ? 'border-[var(--colors-input-field-border-error)]' 
            : 'border-[#C3C1B5] hover:border-[#118082]'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          if (isError) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(255, 211, 210, 0.25)';
          } else if (!disabled) {
            e.currentTarget.style.boxShadow = '0px 0px 0px 4px rgba(39, 188, 183, 0.25)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
        tabIndex={disabled ? -1 : 0}
      >
        {type === 'single' ? (
          <span className="text-[14px] text-[#71706C]">Select Time</span>
        ) : (
          <div className="flex items-center gap-1 text-[14px] text-[#71706C]">
            <span>Start time</span>
            <i className="fa-solid fa-arrow-right text-[10px] text-[#4B4B4A]"></i>
            <span>End time</span>
          </div>
        )}
        <i className="fa-solid fa-clock text-[#4B4B4A] text-[14px]"></i>
      </div>

      {/* Error Message */}
      {isError && (
        <span className="mt-1 text-[11px] px-1 block" style={{ color: 'var(--colors-input-field-text-helper-error)' }}>
          {error}
        </span>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[65px] left-0 z-50 bg-white border border-[#C3C1B5] rounded-[13px] shadow-lg overflow-hidden flex flex-col w-[192px]">
          <div className="flex h-[200px]">
            <ScrollColumn items={genArray(format === '24h' ? 24 : 12)} label="Hrs" />
            <ScrollColumn items={genArray(60)} label="Min" borderLeft />
            {format === '12h' && <ScrollColumn items={['AM', 'PM']} label="Period" borderLeft />}
          </div>
          
          {/* Footer Actions */}
          <div className="flex justify-between items-center p-2 border-t border-[#C3C1B5] bg-white">
            <button className="text-[12px] font-extrabold text-[#4B4B4A] border border-[#118082] px-3 py-1 rounded-[6px] hover:bg-gray-50">
              NOW
            </button>
            <button className="text-[12px] font-extrabold text-white bg-[#118082] px-4 py-1 rounded-[8px] hover:opacity-90">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper: Scrolling Columns ---
function ScrollColumn({ items, borderLeft = false }: { items: string[], label: string, borderLeft?: boolean }) {
  return (
    <div className={`flex-1 overflow-y-auto py-2 ${borderLeft ? 'border-l border-[#C3C1B5]' : ''}`}>
      {items.map((item) => (
        <div key={item} className="h-7 flex items-center justify-center text-[14px] text-[#303030] hover:bg-[#EDF8FF] cursor-pointer">
          {item}
        </div>
      ))}
    </div>
  );
}

const genArray = (n: number) => Array.from({ length: n }, (_, i) => i.toString().padStart(2, '0'));