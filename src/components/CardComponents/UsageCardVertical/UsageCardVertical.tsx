import * as React from 'react';
import { Button, type ButtonProps } from '../../Button/Button';
import { ErrorCard, type ErrorCardProps, ErrorCardIconInfo } from '../ErrorCard/ErrorCard';
import { ProgressBar, type ProgressBarProps } from '../../ProgressBar/ProgressBar';
import { StateBadge, type StateBadgeProps } from '../../StateBadge/StateBadge';
import usageIconUrl from './usageIcon.jpg';
import './UsageCardVertical.css';

/** Default header illustration — replace via `headerIcon`. */
function DefaultHeaderIcon() {
  return (
    <img
      src={usageIconUrl}
      alt=""
      className="usage-card-vertical__header-img"
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
    />
  );
}

export type UsageCardVerticalVariant = 'default' | 'high-usage';

export interface UsageCardVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: UsageCardVerticalVariant;
  title?: string;
  subtitle?: string;
  topRightValue?: string;
  topRightLabel?: string;
  statUsed?: string;
  statRemaining?: string;
  statTotal?: string;
  statUsedLabel?: string;
  statRemainingLabel?: string;
  statTotalLabel?: string;
  /** Shown when `variant="high-usage"` via `ErrorCard` warning. */
  alertTitle?: string;
  alertDescription?: string;
  buttonLabel?: string;
  progressLabel?: string;
  progressPercent?: number;
  trendTitle?: string;
  trendSubtitle?: string;
  licensedLocationsLabel?: string;
  licensedLocationsValue?: string;
  perLocationLabel?: string;
  perLocationValue?: string;
  licenseBadgeLabel?: string;
  licenseStatusNote?: string;
  showHeaderIcon?: boolean;
  headerIcon?: React.ReactNode;
  showAlert?: boolean;
  showStats?: boolean;
  showButton?: boolean;
  showProgress?: boolean;
  showTrendCard?: boolean;
  showSpecs?: boolean;
  showDivider?: boolean;
  showLicenseRow?: boolean;
  errorCardProps?: Partial<ErrorCardProps>;
  buttonProps?: Omit<ButtonProps, 'variant' | 'children'>;
  progressBarProps?: Omit<ProgressBarProps, 'variant' | 'percentage' | 'label'>;
  stateBadgeProps?: Omit<StateBadgeProps, 'children'>;
}

export const UsageCardVertical = React.forwardRef<HTMLDivElement, UsageCardVerticalProps>(
  function UsageCardVertical(
    {
      variant = 'default',
      title = 'Virtual Assistant Usage',
      subtitle = 'Conversations this month',
      topRightValue = '742',
      topRightLabel = 'Used',
      statUsed = '742',
      statRemaining = '258',
      statTotal = '1,000',
      statUsedLabel = 'Used',
      statRemainingLabel = 'Remaining',
      statTotalLabel = 'Total',
      alertTitle = 'High Usage Warning',
      alertDescription = 'Upgrade to continue using all features.',
      buttonLabel = 'ASSIGN LICENSES',
      progressLabel = 'Encounters This Month',
      progressPercent = 74,
      trendTitle = '108 per day',
      trendSubtitle = 'Upgrade Average daily conversations',
      licensedLocationsLabel = 'Licensed Locations',
      licensedLocationsValue = '4',
      perLocationLabel = 'Per Location Limit',
      perLocationValue = '1000/month',
      licenseBadgeLabel = 'Active',
      licenseStatusNote = 'License active for all locations',
      showHeaderIcon = true,
      headerIcon,
      showAlert = true,
      showStats = true,
      showButton = true,
      showProgress = true,
      showTrendCard = true,
      showSpecs = true,
      showDivider = true,
      showLicenseRow = true,
      errorCardProps,
      buttonProps,
      progressBarProps,
      stateBadgeProps,
      className = '',
      ...rest
    },
    ref,
  ) {
    const isHigh = variant === 'high-usage';
    const progressVariant = isHigh ? 'high-usage' : 'default';
    const usedValueClass = isHigh
      ? 'usage-card-vertical__stat-value usage-card-vertical__stat-value--orange'
      : 'usage-card-vertical__stat-value usage-card-vertical__stat-value--teal';

    const rootClass = ['usage-card-vertical', isHigh && 'usage-card-vertical--high-usage', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div className="usage-card-vertical__inner">
          <div className="usage-card-vertical__header">
            {showHeaderIcon && (
              <div className="usage-card-vertical__header-icon">{headerIcon ?? <DefaultHeaderIcon />}</div>
            )}
            <div className="usage-card-vertical__header-text">
              <p className="usage-card-vertical__title">{title}</p>
              <p className="usage-card-vertical__subtitle">{subtitle}</p>
            </div>
            <div className="usage-card-vertical__header-metric">
              <p className="usage-card-vertical__metric-value">{topRightValue}</p>
              <p className="usage-card-vertical__metric-label">{topRightLabel}</p>
            </div>
          </div>

          {isHigh && showAlert && (
            <ErrorCard
              {...(errorCardProps ?? {})}
              variant="warning"
              title={errorCardProps?.title ?? alertTitle}
              description={errorCardProps?.description ?? alertDescription}
              className={['usage-card-vertical__alert', errorCardProps?.className].filter(Boolean).join(' ')}
            />
          )}

          {showStats && (
            <div className="usage-card-vertical__stats">
              <div className="usage-card-vertical__stat">
                <p className={usedValueClass}>{statUsed}</p>
                <p className="usage-card-vertical__stat-label">{statUsedLabel}</p>
              </div>
              <div className="usage-card-vertical__stat">
                <p className="usage-card-vertical__stat-value usage-card-vertical__stat-value--muted">
                  {statRemaining}
                </p>
                <p className="usage-card-vertical__stat-label">{statRemainingLabel}</p>
              </div>
              <div className="usage-card-vertical__stat">
                <p className="usage-card-vertical__stat-value usage-card-vertical__stat-value--strong">
                  {statTotal}
                </p>
                <p className="usage-card-vertical__stat-label">{statTotalLabel}</p>
              </div>
            </div>
          )}

          {showButton && (
            <Button
              variant="secondary"
              size="sm"
              type="button"
              className="usage-card-vertical__cta"
              {...buttonProps}
            >
              {buttonLabel}
            </Button>
          )}

          {showProgress && (
            <div className="usage-card-vertical__progress">
              <ProgressBar
                label={progressLabel}
                percentage={progressPercent}
                variant={progressVariant}
                size="sm"
                hideHeader={false}
                {...progressBarProps}
              />
            </div>
          )}

          {showTrendCard && (
            <div className="usage-card-vertical__trend">
              <div className="usage-card-vertical__trend-icon" aria-hidden>
                <ErrorCardIconInfo />
              </div>
              <div className="usage-card-vertical__trend-text">
                <p className="usage-card-vertical__trend-title">{trendTitle}</p>
                <p className="usage-card-vertical__trend-sub">{trendSubtitle}</p>
              </div>
            </div>
          )}

          {showDivider && <hr className="usage-card-vertical__divider" />}

          {showSpecs && (
            <>
              <div className="usage-card-vertical__specs">
                <div className="usage-card-vertical__spec-row">
                  <p className="usage-card-vertical__spec-label">{licensedLocationsLabel}</p>
                  <p className="usage-card-vertical__spec-value">{licensedLocationsValue}</p>
                </div>
                <div className="usage-card-vertical__spec-row">
                  <p className="usage-card-vertical__spec-label">{perLocationLabel}</p>
                  <p className="usage-card-vertical__spec-value">{perLocationValue}</p>
                </div>
              </div>
              {showLicenseRow && (
                <div className="usage-card-vertical__license">
                  <StateBadge variant="active" {...stateBadgeProps}>
                    {licenseBadgeLabel}
                  </StateBadge>
                  <p className="usage-card-vertical__license-note">{licenseStatusNote}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

UsageCardVertical.displayName = 'UsageCardVertical';
