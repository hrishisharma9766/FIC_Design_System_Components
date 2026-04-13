import * as React from 'react';
import { PillBadge, type PillBadgeProps } from '../../PillBadge/PillBadge';
import { ProgressBar, type ProgressBarProps } from '../../ProgressBar/ProgressBar';
import './UsageCardHorizontal.css';

/** Storage / server glyph (13×12 viewBox) — `currentColor` for footer columns. */
export function UsageCardHorizontalDriveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={12}
      viewBox="0 0 13 12"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.366719 7.28314L1.43778 1.34828C1.57886 0.566512 2.23587 0 3.00144 0H9.72581C10.4914 0 11.1484 0.566512 11.2895 1.34828L12.3606 7.28314C12.1431 7.20501 11.9097 7.16253 11.6667 7.16253H1.06061C0.8176 7.16253 0.584139 7.20501 0.366719 7.28314ZM1.06061 8.26446H11.6667C12.2524 8.26446 12.7273 8.7578 12.7273 9.36639V10.4683C12.7273 11.0769 12.2524 11.5702 11.6667 11.5702H1.06061C0.474849 11.5702 0 11.0769 0 10.4683V9.36639C0 8.7578 0.474849 8.26446 1.06061 8.26446ZM11.1364 10.4683C11.4292 10.4683 11.6667 10.2217 11.6667 9.91736C11.6667 9.61306 11.4292 9.36639 11.1364 9.36639C10.8435 9.36639 10.6061 9.61306 10.6061 9.91736C10.6061 10.2217 10.8435 10.4683 11.1364 10.4683ZM9.54545 10.4683C9.83834 10.4683 10.0758 10.2217 10.0758 9.91736C10.0758 9.61306 9.83834 9.36639 9.54545 9.36639C9.25257 9.36639 9.01515 9.61306 9.01515 9.91736C9.01515 10.2217 9.25257 10.4683 9.54545 10.4683Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface UsageCardHorizontalMetric {
  icon?: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}

const DEFAULT_METRICS: UsageCardHorizontalMetric[] = [
  {
    icon: <UsageCardHorizontalDriveIcon />,
    label: 'Total recordings',
    value: '1,847',
    subtext: 'Avg. 142 MB each',
  },
  {
    icon: <UsageCardHorizontalDriveIcon />,
    label: 'Added Last Month',
    value: '38 GB',
    subtext: 'In the last 30 days',
  },
  {
    icon: <UsageCardHorizontalDriveIcon />,
    label: 'Projected Full',
    value: 'March 2026',
    subtext: 'At current usage rate',
  },
];

export interface UsageCardHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  /** Primary usage figure (e.g. “256 GB”) — warning orange in Figma. */
  capacityText?: string;
  /** Shown next to `capacityText` (e.g. custom `PillBadge`). Overrides `statusPillLabel` + `pillBadgeProps`. */
  statusPill?: React.ReactNode;
  /** Label inside the default blue pill when `statusPill` is not set. */
  statusPillLabel?: string;
  pillBadgeProps?: Omit<PillBadgeProps, 'children'>;
  /** e.g. “of 500 GB used (51.2%)”. */
  usageNote?: string;
  availableValue?: string;
  availableLabel?: string;
  showCapacity?: boolean;
  showPill?: boolean;
  showUsageNote?: boolean;
  showAvailable?: boolean;
  progressPercent?: number;
  progressMinLabel?: string;
  progressMaxLabel?: string;
  showProgress?: boolean;
  /** Footer columns; defaults to three storage stats from Figma. */
  metrics?: UsageCardHorizontalMetric[];
  showFooter?: boolean;
  progressBarProps?: Omit<ProgressBarProps, 'percentage' | 'hideHeader' | 'label'>;
}

export const UsageCardHorizontal = React.forwardRef<HTMLDivElement, UsageCardHorizontalProps>(
  function UsageCardHorizontal(
    {
      title = 'Storage Usage',
      subtitle = 'Monitor your recording storage capacity and usage',
      capacityText = '256 GB',
      statusPill,
      statusPillLabel = 'Moderate',
      pillBadgeProps,
      usageNote = 'of 500 GB used (51.2%)',
      availableValue = '244 GB',
      availableLabel = 'Available',
      showCapacity = true,
      showPill = true,
      showUsageNote = true,
      showAvailable = true,
      progressPercent = 51.2,
      progressMinLabel = '0 GB',
      progressMaxLabel = '500 GB',
      showProgress = true,
      metrics = DEFAULT_METRICS,
      showFooter = true,
      progressBarProps,
      className = '',
      ...rest
    },
    ref,
  ) {
    const rootClass = ['usage-card-horizontal', className].filter(Boolean).join(' ');

    const pillContent =
      statusPill ??
      (showPill ? (
        <PillBadge variant="blue" size="sm" {...pillBadgeProps}>
          {statusPillLabel}
        </PillBadge>
      ) : null);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <header className="usage-card-horizontal__header">
          <h2 className="usage-card-horizontal__title">{title}</h2>
          <p className="usage-card-horizontal__subtitle">{subtitle}</p>
        </header>

        <div className="usage-card-horizontal__body">
          <div className="usage-card-horizontal__summary">
            <div className="usage-card-horizontal__summary-top">
              <div className="usage-card-horizontal__summary-left">
                <div className="usage-card-horizontal__capacity-row">
                  {showCapacity && capacityText != null && capacityText !== '' && (
                    <p className="usage-card-horizontal__capacity">{capacityText}</p>
                  )}
                  {pillContent}
                </div>
                {showUsageNote && usageNote != null && usageNote !== '' && (
                  <p className="usage-card-horizontal__usage-note">{usageNote}</p>
                )}
              </div>
              {showAvailable && (
                <div className="usage-card-horizontal__summary-right">
                  <p className="usage-card-horizontal__available-value">{availableValue}</p>
                  <p className="usage-card-horizontal__available-label">{availableLabel}</p>
                </div>
              )}
            </div>

            {showProgress && (
              <div className="usage-card-horizontal__progress">
                <ProgressBar
                  hideHeader
                  percentage={progressPercent}
                  variant="default"
                  size="lg"
                  usedText={progressMinLabel}
                  remainingText={progressMaxLabel}
                  {...progressBarProps}
                />
              </div>
            )}
          </div>

          {showFooter && metrics != null && metrics.length > 0 && (
            <footer className="usage-card-horizontal__footer">
              <div className="usage-card-horizontal__metrics">
                {metrics.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="usage-card-horizontal__metric">
                    <div className="usage-card-horizontal__metric-head">
                      {m.icon != null && (
                        <span className="usage-card-horizontal__metric-icon" aria-hidden>
                          {m.icon}
                        </span>
                      )}
                      <p className="usage-card-horizontal__metric-label">{m.label}</p>
                    </div>
                    <p className="usage-card-horizontal__metric-value">{m.value}</p>
                    {m.subtext != null && m.subtext !== '' && (
                      <p className="usage-card-horizontal__metric-sub">{m.subtext}</p>
                    )}
                  </div>
                ))}
              </div>
            </footer>
          )}
        </div>
      </div>
    );
  },
);

UsageCardHorizontal.displayName = 'UsageCardHorizontal';
