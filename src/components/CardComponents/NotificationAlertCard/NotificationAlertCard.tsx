import * as React from 'react';
import { LinkButton, type LinkButtonProps } from '../../LinkButton/LinkButton';
import { ErrorCardIconAlert, ErrorCardIconError, ErrorCardIconWarning } from '../ErrorCard/ErrorCard';
import './NotificationAlertCard.css';

/**
 * Matches Figma Notification Alerts (node 12175-4278).
 * - `read` — neutral / read state (bell, gray link button)
 * - `error` — critical (triangle, red link button)
 * - `warning` — urgent / orange (circle + exclamation, warning link button)
 */
export type NotificationAlertCardVariant = 'read' | 'error' | 'warning';

const VARIANT_ICONS: Record<NotificationAlertCardVariant, React.ReactNode> = {
  read: <ErrorCardIconAlert />,
  error: <ErrorCardIconError />,
  warning: <ErrorCardIconWarning />,
};

const LINK_VARIANT: Record<NotificationAlertCardVariant, NonNullable<LinkButtonProps['variant']>> = {
  read: 'readonly',
  error: 'error',
  warning: 'warning',
};

export interface NotificationAlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NotificationAlertCardVariant;
  subject?: string;
  heading?: string;
  bodyText?: string;
  linkLabel?: string;
  timeStamp?: string;
  showSubject?: boolean;
  showHeading?: boolean;
  showBodyText?: boolean;
  showLinkButton?: boolean;
  showTimeStamp?: boolean;
  showIcon?: boolean;
  /** Custom leading icon; defaults to bell / triangle / circle by `variant`. */
  icon?: React.ReactNode;
  /** Forwarded to `LinkButton` (variant is controlled by this card). */
  linkButtonProps?: Omit<LinkButtonProps, 'variant'>;
}

export const NotificationAlertCard = React.forwardRef<HTMLDivElement, NotificationAlertCardProps>(
  function NotificationAlertCard(
    {
      variant = 'warning',
      subject = 'Billing Assistant',
      heading = 'Trial will end in 5 days.',
      bodyText = 'Upgrade to continue using all feature.',
      linkLabel = 'View Licenses & Billing',
      timeStamp = '10 minutes ago',
      showSubject = true,
      showHeading = true,
      showBodyText = true,
      showLinkButton = true,
      showTimeStamp = true,
      showIcon = true,
      icon,
      linkButtonProps,
      className = '',
      ...rest
    },
    ref,
  ) {
    const rootClass = ['notification-alert-card', `notification-alert-card--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const {
      className: linkClassName,
      label: linkLabelFromProps,
      type: linkType = 'button',
      ...linkRest
    } = linkButtonProps ?? {};

    return (
      <div ref={ref} className={rootClass} role="region" {...rest}>
        <div className="notification-alert-card__row">
          {showIcon && (
            <div className="notification-alert-card__icon-wrap" aria-hidden>
              {icon ?? VARIANT_ICONS[variant]}
            </div>
          )}
          <div className="notification-alert-card__main">
            {showSubject && subject != null && subject !== '' && (
              <p className="notification-alert-card__subject">{subject}</p>
            )}
            {showHeading && heading != null && heading !== '' && (
              <p className="notification-alert-card__heading">{heading}</p>
            )}
            <div className="notification-alert-card__details">
              {showBodyText && bodyText != null && bodyText !== '' && (
                <p className="notification-alert-card__body">{bodyText}</p>
              )}
              {showLinkButton && (
                <LinkButton
                  type={linkType}
                  variant={LINK_VARIANT[variant]}
                  label={linkLabelFromProps ?? linkLabel}
                  className={['notification-alert-card__link', linkClassName].filter(Boolean).join(' ')}
                  {...linkRest}
                />
              )}
              {showTimeStamp && timeStamp != null && timeStamp !== '' && (
                <p className="notification-alert-card__time">{timeStamp}</p>
              )}
            </div>
          </div>
          <div className="notification-alert-card__status" aria-hidden>
            <span className="notification-alert-card__dot" />
          </div>
        </div>
      </div>
    );
  },
);

NotificationAlertCard.displayName = 'NotificationAlertCard';
