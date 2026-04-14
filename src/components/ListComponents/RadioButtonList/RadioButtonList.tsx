import * as React from 'react';
import { RadioButton } from '../../RadioButton/RadioButton';
import './RadioButtonList.css';

export interface RadioButtonListItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const RADIO_BUTTON_LIST_SAMPLE_ITEMS: RadioButtonListItem[] = [
  {
    id: 'org-level',
    label: 'Organization Level',
    description: 'Same configuration for all businesses and locations in the organization',
  },
  {
    id: 'org-level-alt',
    label: 'Organization Level',
    description: 'Same configuration for all businesses and locations in the organization',
  },
];

export type RadioButtonListAppearance = 'card' | 'plain';

export interface RadioButtonListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group legend — e.g. “Agent Deployment Model”. Omit for compact single-group UIs. */
  heading?: string;
  showHeading?: boolean;
  items?: RadioButtonListItem[];
  /** Controlled selected value (`item.id`). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** `card`: white panel + border (Figma default). `plain`: no shell (second artboard). */
  appearance?: RadioButtonListAppearance;
  /** Shared `name` for the radio group (defaults to a stable generated id). */
  name?: string;
  /** Used when `showHeading` is false (accessible group label). */
  ariaLabel?: string;
}

export const RadioButtonList = React.forwardRef<HTMLDivElement, RadioButtonListProps>(
  function RadioButtonList(
    {
      heading = 'Agent Deployment Model',
      showHeading = true,
      items = RADIO_BUTTON_LIST_SAMPLE_ITEMS,
      value,
      defaultValue,
      onChange,
      appearance = 'card',
      name: nameProp,
      ariaLabel = 'Radio options',
      className = '',
      ...rest
    },
    ref,
  ) {
    const autoId = React.useId().replace(/:/g, '');
    const groupName = nameProp ?? `radio-button-list-${autoId}`;
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? '');
    const selected = isControlled ? value! : internal;

    const setValue = (next: string) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    };

    const rootClass = ['radio-button-list', `radio-button-list--${appearance}`, className]
      .filter(Boolean)
      .join(' ');

    const showTitle = showHeading && heading != null && heading !== '';

    return (
      <div
        ref={ref}
        className={rootClass}
        role="radiogroup"
        aria-labelledby={showTitle ? `${groupName}-legend` : undefined}
        aria-label={!showTitle ? ariaLabel : undefined}
        {...rest}
      >
        {showTitle && (
          <p id={`${groupName}-legend`} className="radio-button-list__heading">
            {heading}
          </p>
        )}
        <ul className="radio-button-list__list">
          {items.map((item) => {
            const inputId = `${groupName}-${item.id}`;
            const isChecked = selected === item.id;
            return (
              <li key={item.id} className="radio-button-list__item">
                <RadioButton
                  id={inputId}
                  name={groupName}
                  value={item.id}
                  label={item.label}
                  subtext={item.description}
                  checked={isChecked}
                  disabled={item.disabled}
                  className="radio-button-list__radio"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue(item.id);
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

RadioButtonList.displayName = 'RadioButtonList';
