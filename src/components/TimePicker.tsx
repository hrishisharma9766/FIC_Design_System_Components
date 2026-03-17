import React, { useState } from 'react';
import { cn } from '../lib/utils';

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
    <div className={cn("relative inline-block w-[199px] font-sans", disabled && "opacity-60")}>
      {/* Input Label */}
      {label && (
        <div className="flex items-start gap-1 mb-1">
          <span className="text-sm font-semibold text-secondary">{label}</span>
          {required && <span className="text-destructive text-sm">*</span>}
        </div>
      )}

      {/* Input Box */}
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between px-2.5 py-1.5 bg-background border rounded-[13px] h-9 outline-none",
          isError 
            ? 'border-destructive' 
            : 'border-border focus-within:border-primary',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
        tabIndex={disabled ? -1 : 0}
      >
        {type === 'single' ? (
          <span className="text-sm text-muted-foreground">Select Time</span>
        ) : (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Start time</span>
            <i className="fa-solid fa-arrow-right text-[10px] text-secondary"></i>
            <span>End time</span>
          </div>
        )}
        <i className="fa-solid fa-clock text-secondary text-sm"></i>
      </div>

      {/* Error Message */}
      {isError && (
        <span className="mt-1 text-[11px] px-1 block text-destructive">
          {error}
        </span>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 z-50 bg-background border border-border rounded-[13px] overflow-hidden flex flex-col w-[192px]">
          <div className="flex h-[200px]">
            <ScrollColumn items={genArray(format === '24h' ? 24 : 12)} label="Hrs" />
            <ScrollColumn items={genArray(60)} label="Min" borderLeft />
            {format === '12h' && <ScrollColumn items={['AM', 'PM']} label="Period" borderLeft />}
          </div>
          
          {/* Footer Actions */}
          <div className="flex justify-between items-center p-2 border-t border-border bg-background">
            <button className="text-[12px] font-extrabold text-secondary border border-primary px-3 py-1 rounded-[6px]">
              NOW
            </button>
            <button className="text-[12px] font-extrabold text-white bg-primary px-4 py-1 rounded-[8px]">
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
    <div className={cn(
      "flex-1 overflow-y-auto py-2 custom-scrollbar",
      borderLeft && "border-l border-border"
    )}>
      {items.map((item) => (
        <div key={item} className="h-7 flex items-center justify-center text-sm text-foreground hover:bg-muted/10 cursor-pointer">
          {item}
        </div>
      ))}
    </div>
  );
}

const genArray = (n: number) => Array.from({ length: n }, (_, i) => i.toString().padStart(2, '0'));
