import * as React from 'react';
import { Switch } from '../../Switch/Switch';
import './SwitchList.css';

export interface SwitchListItem {
  id: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export type SwitchListValue = Record<string, boolean>;

export const SWITCH_LIST_SAMPLE_ITEMS: SwitchListItem[] = [
  {
    id: 'pms-ehr-label-description',
    label: 'Use Separate PMS and EHR Systems',
    description:
      'Enable this if you have separate systems for practice management and electronic health records',
  },
  {
    id: 'pms-ehr-label-only',
    label: 'Use Separate PMS and EHR Systems',
  },
  {
    id: 'pms-ehr-description-only',
    description:
      'Enable this if you have separate systems for practice management and electronic health records',
  },
];

export interface SwitchListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items?: SwitchListItem[];
  value?: SwitchListValue;
  defaultValue?: SwitchListValue;
  onChange?: (next: SwitchListValue) => void;
  ariaLabel?: string;
  name?: string;
}

function useStableId(prefix: string) {
  const id = React.useId();
  return `${prefix}-${id.replace(/:/g, '')}`;
}

export const SwitchList = React.forwardRef<HTMLDivElement, SwitchListProps>(function SwitchList(
  {
    items = SWITCH_LIST_SAMPLE_ITEMS,
    value,
    defaultValue = {},
    onChange,
    ariaLabel,
    name: nameProp,
    className = '',
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<SwitchListValue>(defaultValue);
  const selected = isControlled ? value! : internal;
  const generatedName = useStableId('switch-list');
  const groupName = nameProp ?? generatedName;

  const setSelected = React.useCallback(
    (next: SwitchListValue) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const rootClass = ['switch-list', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} role="group" aria-label={ariaLabel} {...rest}>
      <ul className="switch-list__list" role="list">
        {items.map((item) => {
          const switchId = `${groupName}-${item.id}`;
          const isChecked = Boolean(selected[item.id]);
          const hasLabel = item.label != null && item.label !== '';
          const hasDescription = item.description != null && item.description !== '';
          return (
            <li key={item.id} role="listitem">
              <div className="switch-list__row">
                <div className="switch-list__content">
                  {hasLabel ? <p className="switch-list__label">{item.label}</p> : null}
                  {hasDescription ? <p className="switch-list__description">{item.description}</p> : null}
                </div>
                <Switch
                  className="switch-list__toggle"
                  id={switchId}
                  size="big"
                  colorVariant="teal"
                  checked={isChecked}
                  disabled={item.disabled}
                  readOnly={item.readOnly}
                  onChange={(e) => {
                    setSelected({ ...selected, [item.id]: e.target.checked });
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

SwitchList.displayName = 'SwitchList';
