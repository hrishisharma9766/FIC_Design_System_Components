import * as React from 'react';
import { Button, type ButtonProps } from '../../Button/Button';
import { PillBadge } from '../../PillBadge/PillBadge';
import './LicensingList.css';

/** Small alert glyph — matches Figma red warning mark beside assignment line. */
export function LicensingListAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 1.5L14.5 13.5H1.5L8 1.5ZM8 11.25C7.31 11.25 6.75 11.81 6.75 12.5S7.31 13.75 8 13.75 9.25 13.19 9.25 12.5 8.69 11.25 8 11.25ZM8.75 9.25V6.25H7.25V9.25H8.75Z"
      />
    </svg>
  );
}

export interface LicensingListItem {
  id: string;
  /** e.g. “Eligibility Verification” */
  pillLabel: string;
  /** e.g. “$149/provider” */
  priceLabel?: string;
  /** e.g. “3 of 4 licenses assigned” */
  assignmentSummary: string;
  /** Show red alert icon when assignment needs attention (Figma default on). */
  showAlert?: boolean;
  /** Large count on the right, e.g. “4” */
  licenseCount: string;
  /** CTA label — rendered with `Button` secondary. */
  buttonLabel?: string;
  /** Second row in Figma uses white strip background. */
  surface?: 'default' | 'white';
  /** Forwarded to `Button` (variant should stay secondary for this pattern). */
  buttonProps?: Omit<ButtonProps, 'children' | 'variant'>;
}

export const LICENSING_LIST_SAMPLE_ITEMS: LicensingListItem[] = [
  {
    id: 'ev-1',
    pillLabel: 'Eligibility Verification',
    priceLabel: '$149/provider',
    assignmentSummary: '3 of 4 licenses assigned',
    showAlert: true,
    licenseCount: '4',
    buttonLabel: 'ASSIGNED LICENSES',
    surface: 'default',
  },
  {
    id: 'ev-2',
    pillLabel: 'Eligibility Verification',
    priceLabel: '$149/provider',
    assignmentSummary: '3 of 4 licenses assigned',
    showAlert: true,
    licenseCount: '4',
    buttonLabel: 'ASSIGNED LICENSES',
    surface: 'white',
  },
];

export interface LicensingListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: LicensingListItem[];
}

/**
 * Licensing list row — pill + pricing copy, assignment line, count + secondary `Button` (Figma 11392-171).
 */
export const LicensingList = React.forwardRef<HTMLDivElement, LicensingListProps>(function LicensingList(
  { items = LICENSING_LIST_SAMPLE_ITEMS, className = '', ...rest },
  ref,
) {
  const rootClass = ['licensing-list', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} {...rest}>
      {items.map((item) => {
        const { className: btnClass, ...btnRest } = item.buttonProps ?? {};
        const rowClass = [
          'licensing-list__row',
          item.surface === 'white' ? 'licensing-list__row--surface-white' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={item.id} className={rowClass}>
            <div className="licensing-list__main">
              <div className="licensing-list__top">
                <PillBadge variant="blue" size="sm">
                  {item.pillLabel}
                </PillBadge>
                {item.priceLabel != null && item.priceLabel !== '' && (
                  <p className="licensing-list__price">{item.priceLabel}</p>
                )}
              </div>
              <div className="licensing-list__meta">
                <p className="licensing-list__assignment">{item.assignmentSummary}</p>
                {item.showAlert !== false && (
                  <span className="licensing-list__alert-icon" aria-hidden>
                    <LicensingListAlertIcon />
                  </span>
                )}
              </div>
            </div>
            <div className="licensing-list__actions">
              <p className="licensing-list__count">{item.licenseCount}</p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className={['licensing-list__cta', btnClass].filter(Boolean).join(' ')}
                {...btnRest}
              >
                {item.buttonLabel ?? 'ASSIGNED LICENSES'}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
});

LicensingList.displayName = 'LicensingList';
