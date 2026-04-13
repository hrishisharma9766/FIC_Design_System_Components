import * as React from 'react';
import './HelpLinkCard.css';

type SvgProps = React.SVGProps<SVGSVGElement>;

/** External-link / open — Evaa 14×14 asset (Neutrals-Bkg-700 via `currentColor`). */
export function HelpLinkCardIconOpen(props: SvgProps) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.94126 0.539697C8.07618 0.212024 8.39743 0 8.7508 0H13.1262C13.6081 0 14 0.391923 14 0.873795V5.2492C14 5.60257 13.788 5.92382 13.4603 6.05874C13.1326 6.19367 12.76 6.11657 12.503 5.87242L10.9353 4.30473L6.73979 8.50023C6.39927 8.84075 5.84029 8.84075 5.49977 8.50023C5.15925 8.15971 5.15925 7.60073 5.49977 7.26021L9.69527 3.06471L8.12758 1.49702C7.87701 1.24644 7.79991 0.873795 7.94126 0.539697ZM0 4.8123C0 3.60441 0.976595 2.62139 2.19091 2.62139H4.38183C4.8637 2.62139 5.25562 3.01331 5.25562 3.49518C5.25562 3.97705 4.8637 4.36898 4.38183 4.36898H2.19091C1.95319 4.36898 1.75402 4.56815 1.75402 4.80587V11.8091C1.75402 12.0468 1.95319 12.246 2.19091 12.246H9.19413C9.43185 12.246 9.63102 12.0468 9.63102 11.8091V9.61817C9.63102 9.1363 10.0229 8.74438 10.5048 8.74438C10.9867 8.74438 11.3786 9.1363 11.3786 9.61817V11.8091C11.3786 13.017 10.402 14 9.1877 14H2.19091C0.98302 14 0 13.0234 0 11.8091V4.8123Z"
      />
    </svg>
  );
}

export interface HelpLinkCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Main label (Figma default: “Admin Console Overview”). Not the HTML `title` attribute. */
  title?: string;
  showTitle?: boolean;
  /** Duration / time pill (Figma default: “9:30”). */
  time?: string;
  showTime?: boolean;
  /** Replaces the default 14×14 open / external-link icon. */
  icon?: React.ReactNode;
  /** When set, the card root renders as `<a>` (help link). */
  href?: string;
  target?: string;
  rel?: string;
}

export const HelpLinkCard = React.forwardRef<HTMLDivElement | HTMLAnchorElement, HelpLinkCardProps>(
  function HelpLinkCard(
  {
    title = 'Admin Console Overview',
    showTitle = true,
    time = '9:30',
    showTime = true,
    icon,
    className = '',
    href,
    target,
    rel,
    ...rest
  },
    ref,
  ) {
  const rootClass = ['help-link-card', className].filter(Boolean).join(' ');

  const body = (
    <>
      {showTitle && title != null && title !== '' && (
        <p className="help-link-card__title">{title}</p>
      )}
      <div className="help-link-card__trail">
        {showTime && time != null && time !== '' && <span className="help-link-card__time">{time}</span>}
        <span className="help-link-card__icon" aria-hidden>
          {icon ?? <HelpLinkCardIconOpen />}
        </span>
      </div>
    </>
  );

  if (href != null && href !== '') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={rootClass}
        {...rest}
      >
        {body}
      </a>
    );
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={rootClass} {...rest}>
      {body}
    </div>
  );
});

HelpLinkCard.displayName = 'HelpLinkCard';
