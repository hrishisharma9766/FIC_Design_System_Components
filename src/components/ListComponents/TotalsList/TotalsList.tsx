import * as React from 'react';
import './TotalsList.css';

export interface TotalsListItem {
  id: string;
  label: string;
  value: string;
  /** If true, the value text is rendered black (e.g. for final amounts/summaries) instead of default dark grey */
  isBlack?: boolean;
}

export interface TotalsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top rows before the divider */
  items: TotalsListItem[];
  /** Optional summary row rendered below a divider */
  summary?: {
    label: string;
    value: string;
  };
}

export const TOTALS_LIST_SAMPLE_NUMBERS: TotalsListItem[] = [
  { id: 't1', label: 'Total Licenses:', value: '5' },
  { id: 't2', label: 'Assigned:', value: '800' },
  { id: 't3', label: 'Remaining:', value: '800' },
];

export const TOTALS_LIST_SAMPLE_AMOUNTS: TotalsListItem[] = [
  { id: 'a1', label: 'Total Licenses:', value: '$100.00' },
  { id: 'a2', label: 'Assigned:', value: '$150.00' },
  { id: 'a3', label: 'Remaining:', value: '$10.00', isBlack: true },
];

export const TotalsList = React.forwardRef<HTMLDivElement, TotalsListProps>(
  ({ items, summary, className, ...rest }, ref) => {
    const rootClass = ['totals-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {items.map((item) => (
          <div key={item.id} className="totals-list__row">
            <p className="totals-list__label">{item.label}</p>
            <p className={`totals-list__value ${item.isBlack ? 'totals-list__value--black' : ''}`}>
              {item.value}
            </p>
          </div>
        ))}
        {summary && (
          <>
            <hr className="totals-list__divider" />
            <div className="totals-list__row">
              <p className="totals-list__label">{summary.label}</p>
              <p className="totals-list__value totals-list__value--black">{summary.value}</p>
            </div>
          </>
        )}
      </div>
    );
  }
);

TotalsList.displayName = 'TotalsList';
