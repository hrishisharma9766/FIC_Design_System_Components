import * as React from 'react';
import { Button } from '../../Button/Button';
import './DashboardCard.css';

type SvgProps = React.SVGProps<SVGSVGElement>;

/**
 * Figma: Size16(Gray)Icon/Information — stroke icon in 16×16 frame (~14px artwork).
 * Uses `currentColor` (token: Neutrals-Bkg-700 / #4B4B4A via parent).
 */
export function DashboardCardIconInformation(props: SvgProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 10.25V7.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.65" fill="currentColor" />
    </svg>
  );
}

/**
 * Figma: Size16(Gray)Icon/Dollar — subscription header.
 */
export function DashboardCardIconDollar(props: SvgProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M8 2.25v11.5M6.5 5.25h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1 .45-1 1s.45 1 1 1h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * External-link / open — same 14×14 asset as HelpLinkCardIconOpen. `currentColor` for gray or white on solid buttons.
 */
export function DashboardCardIconOpen(props: SvgProps) {
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


/** Evaa dashboard card layout: `standard` (stat, no CTA) or `subscription` (amount + button). */
export type DashboardCardVariant = 'standard' | 'subscription';

/** Three surface styles shared by both variants (neutral / brand / teal focus). */
export type DashboardCardTone = 'neutral' | 'brand' | 'teal';

/** @deprecated Prefer `state`. When `state` is omitted, `emphasized` maps to hover-focus (2px border). */
export type DashboardCardBorderEmphasis = 'default' | 'emphasized';

/** `default` — 1px border. `hover-focus` — 2px emphasized border (same look for hover and focus in Figma). */
export type DashboardCardState = 'default' | 'hover-focus';

/** CTA style when `variant` is `subscription` — maps to `Button` `variant`. */
export type DashboardCardButtonVariant = 'primary' | 'secondary' | 'brand';

function SvgInIconSlot({ children }: { children: React.ReactNode }) {
  return <span className="dashboard-card__icon-slot">{children}</span>;
}

function IconSlot({ children }: { children?: React.ReactNode }) {
  if (children != null && children !== false) {
    return <span className="dashboard-card__icon-slot">{children}</span>;
  }
  return <span className="dashboard-card__icon-slot dashboard-card__icon-slot--ph" aria-hidden />;
}

function resolveCardState(
  state: DashboardCardState | undefined,
  borderEmphasis: DashboardCardBorderEmphasis | undefined,
): DashboardCardState {
  if (state != null) return state;
  if (borderEmphasis === 'emphasized') return 'hover-focus';
  return 'default';
}

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DashboardCardVariant;
  tone?: DashboardCardTone;
  /** `default` or `hover-focus` (2px border only). Overrides `borderEmphasis` when set. */
  state?: DashboardCardState;
  /** @deprecated Use `state="hover-focus"` instead. */
  borderEmphasis?: DashboardCardBorderEmphasis;

  /**
   * Standard: leading icon before title. Default: Figma `Size16(Gray)Icon/Information` (SVG).
   * Pass `null` to omit (no placeholder).
   */
  icon1?: React.ReactNode | null;
  /**
   * Standard: trailing icon after title. Default: same Information icon.
   * Pass `null` to omit.
   */
  icon2?: React.ReactNode | null;
  /**
   * Subscription: icon before amount label only. Default: Figma `Size16(Gray)Icon/Dollar` (SVG).
   * Pass `null` to omit.
   */
  icon3?: React.ReactNode | null;

  /**
   * Standard only — Figma **Rows = 2**: second stacked metric (title + info icon + value max 210px).
   * Ignored for `subscription`. Only this instance’s DOM updates; use `align-items: start` on grid
   * parents (or rely on `.dashboard-card { align-self: start }`) so taller cards don’t stretch siblings.
   */
  row?: boolean;
  /** Second-row title when `row` (default: same as `title`). */
  secondaryRowTitle?: string;
  /** Second-row value when `row` (default: same as `value`). */
  secondaryRowValue?: string | number;

  /* Standard — no buttons */
  title?: string;
  value?: string | number;
  footer?: string;
  /** Default: Figma `Size16(Gray)Icon/Open` (SVG). Pass `null` to hide. */
  menuIcon?: React.ReactNode | null;

  /* Subscription — includes CTA */
  amountLabel?: string;
  amount?: string;
  actionLabel?: string;
  buttonVariant?: DashboardCardButtonVariant;
  onActionClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Default: Figma Open icon (SVG); inherits `currentColor` from button (gray / white). */
  actionRightIcon?: React.ReactNode | null;
}

function DefaultStandardLeadingIcon(icon1: React.ReactNode | null | undefined) {
  if (icon1 === undefined) {
    return (
      <SvgInIconSlot>
        <DashboardCardIconInformation />
      </SvgInIconSlot>
    );
  }
  if (icon1 === null) return null;
  return <IconSlot>{icon1}</IconSlot>;
}

function DefaultStandardTrailingIcon(icon2: React.ReactNode | null | undefined) {
  if (icon2 === undefined) {
    return (
      <SvgInIconSlot>
        <DashboardCardIconInformation />
      </SvgInIconSlot>
    );
  }
  if (icon2 === null) return null;
  return <IconSlot>{icon2}</IconSlot>;
}

function DefaultMenu(menuIcon: React.ReactNode | null | undefined) {
  if (menuIcon === undefined) {
    return (
      <div className="dashboard-card__standard-menu" aria-hidden>
        <DashboardCardIconOpen />
      </div>
    );
  }
  if (menuIcon === null) return null;
  return (
    <div className="dashboard-card__standard-menu" aria-hidden>
      {menuIcon}
    </div>
  );
}

export const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(function DashboardCardInner(
  {
    variant = 'standard',
    tone = 'neutral',
    state,
    borderEmphasis = 'default',
    icon1,
    icon2,
    icon3,
    row = false,
    secondaryRowTitle,
    secondaryRowValue,
    title = 'Action Required',
    value = '—',
    footer = 'Click to view chats',
    menuIcon,
    amountLabel = 'Current Subscription Amount',
    amount = '$0/month',
    actionLabel = 'Purchase/Edit Licenses',
    buttonVariant = 'secondary',
    onActionClick,
    actionRightIcon,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const resolvedState = resolveCardState(state, borderEmphasis);

  const rootClass = [
    'dashboard-card',
    `dashboard-card--variant-${variant}`,
    `dashboard-card--tone-${tone}`,
    `dashboard-card--state-${resolvedState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'standard') {
    const row2Title = secondaryRowTitle ?? title;
    const row2Val = secondaryRowValue ?? value;

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div className="dashboard-card__standard-inner">
          <div className="dashboard-card__standard-top">
            <div className="dashboard-card__standard-head">
              <div className="dashboard-card__standard-header-row">
                {DefaultStandardLeadingIcon(icon1)}
                <p className="dashboard-card__standard-title">{title}</p>
                {DefaultStandardTrailingIcon(icon2)}
              </div>
              {DefaultMenu(menuIcon)}
            </div>
            <div className="dashboard-card__standard-value">{value}</div>
          </div>
          {row && (
            <div className="dashboard-card__standard-row2">
              <div className="dashboard-card__standard-row2-head">
                <p className="dashboard-card__standard-title">{row2Title}</p>
                <SvgInIconSlot>
                  <DashboardCardIconInformation />
                </SvgInIconSlot>
              </div>
              <div className="dashboard-card__standard-row2-value">{row2Val}</div>
            </div>
          )}
          <div className="dashboard-card__standard-footer">{footer}</div>
          {children}
        </div>
      </div>
    );
  }

  const resolvedActionRightIcon: React.ReactNode | undefined =
    actionRightIcon === null
      ? undefined
      : actionRightIcon !== undefined
        ? actionRightIcon
        : <DashboardCardIconOpen />;

  const subscriptionLeading =
    icon3 === undefined ? (
      <SvgInIconSlot>
        <DashboardCardIconDollar />
      </SvgInIconSlot>
    ) : icon3 === null ? null : (
      <IconSlot>{icon3}</IconSlot>
    );

  return (
    <div ref={ref} className={rootClass} {...rest}>
      <div className="dashboard-card__subscription-inner">
        <div className="dashboard-card__subscription-main">
          <div className="dashboard-card__subscription-copy">
            <div className="dashboard-card__subscription-label-row">
              {subscriptionLeading}
              <p className="dashboard-card__subscription-label">{amountLabel}</p>
            </div>
            <p className="dashboard-card__subscription-amount">{amount}</p>
          </div>
          <div className="dashboard-card__subscription-actions">
            <Button
              type="button"
              variant={buttonVariant}
              size="sm"
              rightIcon={resolvedActionRightIcon}
              onClick={onActionClick}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
        <div className="dashboard-card__subscription-footer">{footer}</div>
        {children}
      </div>
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';
