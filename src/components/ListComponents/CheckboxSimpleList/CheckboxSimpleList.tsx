import * as React from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import './CheckboxSimpleList.css';

export interface CheckboxSimpleListItem {
  id: string;
  label: string;
  disabled?: boolean;
}

/** Sample data from Figma — role filters. */
export const CHECKBOX_SIMPLE_LIST_SAMPLE_ITEMS: CheckboxSimpleListItem[] = [
  { id: 'optometrists', label: 'Optometrists' },
  { id: 'ophthalmologists', label: 'Ophthalmologists' },
  { id: 'front-desk', label: 'Front Desk Staff' },
  { id: 'billing', label: 'Billing Specialists' },
  { id: 'optical-tech', label: 'Optical Technicians' },
  { id: 'practice-managers', label: 'Practice Managers' },
];

export type CheckboxSimpleListOrientation = 'vertical' | 'horizontal';

export interface CheckboxSimpleListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: CheckboxSimpleListItem[];
  /** Selected item ids (controlled). */
  value?: string[];
  /** Uncontrolled initial selection. */
  defaultValue?: string[];
  onChange?: (selectedIds: string[]) => void;
  orientation?: CheckboxSimpleListOrientation;
  /** Accessible name for the group (recommended). */
  ariaLabel?: string;
  /** Prefix for input `name` / `id` (defaults to a stable id). */
  name?: string;
}

function useListId() {
  const id = React.useId();
  return id.replace(/:/g, '');
}

export const CheckboxSimpleList = React.forwardRef<HTMLDivElement, CheckboxSimpleListProps>(
  function CheckboxSimpleList(
    {
      items = CHECKBOX_SIMPLE_LIST_SAMPLE_ITEMS,
      value,
      defaultValue = [],
      onChange,
      orientation = 'vertical',
      ariaLabel,
      name: nameProp,
      className = '',
      ...rest
    },
    ref,
  ) {
    const baseId = useListId();
    const groupName = nameProp ?? `checkbox-simple-list-${baseId}`;
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string[]>(defaultValue);
    const selected = isControlled ? value! : internal;

    const setSelected = React.useCallback(
      (next: string[]) => {
        if (!isControlled) {
          setInternal(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const handleToggle = (itemId: string, checked: boolean) => {
      const next = checked ? [...selected, itemId] : selected.filter((id) => id !== itemId);
      setSelected(next);
    };

    const rootClass = [
      'checkbox-simple-list',
      orientation === 'vertical' ? 'checkbox-simple-list--vertical' : 'checkbox-simple-list--horizontal',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={rootClass}
        role="group"
        aria-label={ariaLabel}
        {...rest}
      >
        <ul className="checkbox-simple-list__list">
          {items.map((item) => {
            const inputId = `${groupName}-${item.id}`;
            const isChecked = selected.includes(item.id);
            return (
              <li key={item.id} className="checkbox-simple-list__item">
                <Checkbox
                  id={inputId}
                  name={groupName}
                  value={item.id}
                  variant="square"
                  label={item.label}
                  checked={isChecked}
                  disabled={item.disabled}
                  onChange={(e) => handleToggle(item.id, e.target.checked)}
                  className="checkbox-simple-list__checkbox"
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

CheckboxSimpleList.displayName = 'CheckboxSimpleList';
