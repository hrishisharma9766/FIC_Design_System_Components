import * as React from 'react';
import { Button } from '../../Button/Button';
import './ContactCard.css';

export type ContactCardVisualVariant = 'default' | 'inverse';

/** `text` — phone / email line; `button` — secondary CTA (e.g. Book Now). */
export type ContactCardMode = 'text' | 'button';

export type ContactCardIcon = 'phone' | 'email' | 'calendar' | 'none';

export interface ContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  /** `mode="text"`: primary line (phone number, email, etc.). */
  actionText?: string;
  /** Optional link for `actionText` (`tel:`, `mailto:`, `https:`). */
  actionHref?: string;
  mode?: ContactCardMode;
  /** `mode="button"`: label on the secondary pill button. */
  buttonLabel?: string;
  onButtonClick?: () => void;
  /** `default` — light card; `inverse` — teal fill, white type (Evaa contact tiles). */
  visualVariant?: ContactCardVisualVariant;
  icon?: ContactCardIcon;
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
        fill="currentColor"
      />
    </svg>
  );
}

function renderIcon(kind: ContactCardIcon): React.ReactNode {
  switch (kind) {
    case 'phone':
      return <PhoneIcon />;
    case 'email':
      return <EmailIcon />;
    case 'calendar':
      return <CalendarIcon />;
    default:
      return null;
  }
}

export const ContactCard = React.forwardRef<HTMLDivElement, ContactCardProps>(function ContactCard(
  {
    title,
    subtitle,
    actionText,
    actionHref,
    mode = 'text',
    buttonLabel = 'Book Now',
    onButtonClick,
    visualVariant = 'default',
    icon = 'phone',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const showIcon = icon !== 'none';

  const actionEl =
    mode === 'text' && actionText ? (
      actionHref ? (
        <a className="contact-card__action-text" href={actionHref}>
          {actionText}
        </a>
      ) : (
        <span className="contact-card__action-text">{actionText}</span>
      )
    ) : mode === 'button' ? (
      <div className="contact-card__action-btn">
        <Button type="button" variant="secondary" size="sm" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    ) : null;

  return (
    <div
      ref={ref}
      className={[
        'contact-card',
        visualVariant === 'inverse' ? 'contact-card--inverse' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {showIcon ? <div className="contact-card__icon">{renderIcon(icon)}</div> : null}
      <h3 className="contact-card__title">{title}</h3>
      <p className="contact-card__subtitle">{subtitle}</p>
      {actionEl ? <div className="contact-card__action">{actionEl}</div> : null}
      {children}
    </div>
  );
});
