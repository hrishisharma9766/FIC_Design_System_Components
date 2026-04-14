import * as React from 'react';
import { Switch } from '../../Switch/Switch';
import {
  SingleSelectDropDown,
  type SingleSelectDropDownOption,
} from '../../SingleSelectDropDown/SingleSelectDropDown';
import './ComplexListSD.css';

const DEFAULT_INTRO =
  "These settings default to the organization's Default Preferences but can be customized for your workflow";

const ROW_TITLE = 'Use Separate PMS and EHR Systems';
const ROW_DESC =
  'Enable this if you have separate systems for practice management and electronic health records';

/** Default switch rows — four identical rows per Figma. */
export const COMPLEX_LIST_SD_SAMPLE_ROWS: ComplexListSDSwitchRow[] = [1, 2, 3, 4].map((n) => ({
  id: `pms-ehr-${n}`,
  title: ROW_TITLE,
  description: ROW_DESC,
}));

export const COMPLEX_LIST_SD_SAMPLE_LOCATION_OPTIONS: SingleSelectDropDownOption[] = [
  { value: 'downtown', label: 'Downtown Vision Center' },
  { value: 'westside', label: 'Westside Eye Clinic' },
  { value: 'northbrook', label: 'Northbrook Optical' },
];

export interface ComplexListSDSwitchRow {
  id: string;
  title: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface ComplexListSDDropdownConfig {
  label?: string;
  placeholder?: string;
  options: SingleSelectDropDownOption[];
  value?: string;
  onChange?: (value: string) => void;
  subText?: string;
}

export interface ComplexListSDProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lead paragraph above the inset block. */
  intro?: string;
  /** Toggle rows (title + description + switch). */
  rows?: ComplexListSDSwitchRow[];
  /** When false, the Location + helper block is omitted. Default true (matches Figma). */
  showDropdown?: boolean;
  /** Merged onto defaults (`Location`, `Select`, sample options, `Sub Text`). */
  dropdown?: Partial<ComplexListSDDropdownConfig>;
}

/**
 * Complex list — Switch + Dropdown (Figma “Complex List - Switch + Drop Down”, node 11511-2188).
 * Export name **ComplexListSD** (“S-D” = Switch + Dropdown).
 */
export const ComplexListSD = React.forwardRef<HTMLDivElement, ComplexListSDProps>(function ComplexListSD(
  {
    intro = DEFAULT_INTRO,
    rows = COMPLEX_LIST_SD_SAMPLE_ROWS,
    showDropdown = true,
    dropdown: dropdownPartial,
    className = '',
    ...rest
  },
  ref,
) {
  const baseId = React.useId().replace(/:/g, '');
  const rootClass = ['complex-list-sd', className].filter(Boolean).join(' ');

  const ddMerged: ComplexListSDDropdownConfig = {
    label: 'Location',
    placeholder: 'Select',
    options: COMPLEX_LIST_SD_SAMPLE_LOCATION_OPTIONS,
    subText: 'Sub Text',
    ...dropdownPartial,
  };

  return (
    <div ref={ref} className={rootClass} {...rest}>
      {intro != null && intro !== '' && <p className="complex-list-sd__intro">{intro}</p>}

      <div className="complex-list-sd__inset">
        <ul className="complex-list-sd__rows">
          {rows.map((row) => {
            const titleId = `${baseId}-title-${row.id}`;
            const descId = `${baseId}-desc-${row.id}`;
            return (
              <li key={row.id} className="complex-list-sd__row">
                <div className="complex-list-sd__row-inner">
                  <div className="complex-list-sd__copy">
                    <p id={titleId} className="complex-list-sd__title">
                      {row.title}
                    </p>
                    {row.description != null && row.description !== '' && (
                      <p id={descId} className="complex-list-sd__desc">
                        {row.description}
                      </p>
                    )}
                  </div>
                  <div className="complex-list-sd__switch">
                    <Switch
                      id={`${baseId}-sw-${row.id}`}
                      size="big"
                      colorVariant="teal"
                      checked={row.checked}
                      defaultChecked={row.defaultChecked}
                      onChange={(e) => row.onCheckedChange?.(e.target.checked)}
                      aria-labelledby={titleId}
                      aria-describedby={row.description ? descId : undefined}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {showDropdown && (
          <div className="complex-list-sd__dropdown-section">
            <div className="complex-list-sd__dropdown-inner">
              <SingleSelectDropDown
                className="complex-list-sd__dropdown"
                label={ddMerged.label ?? 'Location'}
                placeholder={ddMerged.placeholder ?? 'Select'}
                options={ddMerged.options}
                value={ddMerged.value}
                onChange={ddMerged.onChange}
                size="lg"
              />
              {ddMerged.subText != null && ddMerged.subText !== '' && (
                <p className="complex-list-sd__subtext">{ddMerged.subText}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ComplexListSD.displayName = 'ComplexListSD';
