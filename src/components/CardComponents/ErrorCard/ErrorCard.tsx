import * as React from 'react';
import './ErrorCard.css';

type SvgProps = React.SVGProps<SVGSVGElement>;

/** Evaa DS export — error (21×20). */
export function ErrorCardIconError(props: SvgProps) {
  return (
    <svg
      className="error-card__icon error-card__icon--error-glyph"
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.2453 0C10.8353 0 11.3753 0.32 11.6553 0.84L20.2853 16.83C20.5553 17.33 20.5453 17.93 20.2553 18.41C19.9653 18.89 19.4453 19.19 18.8753 19.19H1.60526C1.04526 19.19 0.525267 18.89 0.225267 18.41C-0.0647328 17.93 -0.0747316 17.33 0.195268 16.83L8.82527 0.84C9.10527 0.32 9.64526 0 10.2353 0H10.2453ZM10.2453 6.72C9.71527 6.72 9.28526 7.15 9.28526 7.68V12.16C9.28526 12.69 9.71527 13.12 10.2453 13.12C10.7753 13.12 11.2053 12.69 11.2053 12.16V7.68C11.2053 7.15 10.7753 6.72 10.2453 6.72ZM11.3053 15.35C11.3253 14.95 11.1353 14.58 10.7953 14.37C10.4553 14.17 10.0253 14.17 9.68527 14.37C9.34527 14.58 9.14526 14.95 9.17526 15.35C9.15526 15.75 9.34527 16.12 9.68527 16.33C10.0253 16.53 10.4553 16.53 10.7953 16.33C11.1353 16.12 11.3353 15.75 11.3053 15.35Z"
      />
    </svg>
  );
}

/** Evaa DS export — warning (21×21). */
export function ErrorCardIconWarning(props: SvgProps) {
  return (
    <svg
      className="error-card__icon error-card__icon--warning-glyph"
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.23 20.46C15.88 20.46 20.46 15.88 20.46 10.23C20.46 4.58 15.88 0 10.23 0C4.58 0 0 4.58 0 10.23C0 15.88 4.58 20.46 10.23 20.46ZM10.23 5.42C10.76 5.42 11.19 5.85 11.19 6.38V10.86C11.19 11.39 10.76 11.82 10.23 11.82C9.7 11.82 9.27 11.39 9.27 10.86V6.38C9.27 5.85 9.7 5.42 10.23 5.42ZM9.16 14.06C9.14 13.66 9.33 13.29 9.67 13.08C10.01 12.88 10.44 12.88 10.78 13.08C11.12 13.29 11.32 13.66 11.29 14.06C11.31 14.46 11.12 14.83 10.78 15.04C10.44 15.24 10.01 15.24 9.67 15.04C9.33 14.83 9.13 14.46 9.16 14.06Z"
      />
    </svg>
  );
}

/** Evaa DS export — alert bell (18×21). */
export function ErrorCardIconAlert(props: SvgProps) {
  return (
    <svg
      className="error-card__icon error-card__icon--alert-glyph"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.95 0C8.24 0 7.67 0.569999 7.67 1.28V1.41C4.75 2 2.55 4.58 2.55 7.68V8.55C2.55 10.47 1.89 12.34 0.699997 13.84L0.309998 14.33C0.109998 14.58 0 14.89 0 15.22C0 16 0.639998 16.64 1.42 16.64H16.49C17.27 16.64 17.91 16 17.91 15.22C17.91 14.9 17.8 14.58 17.6 14.33L17.21 13.84C16.01 12.34 15.36 10.47 15.36 8.55V7.68C15.36 4.59 13.16 2 10.24 1.41V1.28C10.24 0.569999 9.67001 0 8.96001 0H8.95ZM6.47 18.55C6.75 19.65 7.76 20.47 8.95 20.47C10.14 20.47 11.14 19.65 11.43 18.55H6.47Z"
      />
    </svg>
  );
}

/** Evaa DS export — info / stat arrow (24×14). */
export function ErrorCardIconInfo(props: SvgProps) {
  return (
    <svg
      className="error-card__icon error-card__icon--info-glyph"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={14}
      viewBox="0 0 24 14"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.8663 2.64C15.1363 2.64 14.5463 2.05 14.5463 1.32C14.5463 0.59 15.1363 0 15.8663 0H22.4763C23.2063 0 23.7963 0.59 23.7963 1.32V7.93C23.7963 8.66 23.2063 9.25 22.4763 9.25C21.7463 9.25 21.1563 8.66 21.1563 7.93V4.51L14.1563 11.51C13.6363 12.03 12.7963 12.03 12.2863 11.51L7.93626 7.16L2.25626 12.83C1.73626 13.35 0.896259 13.35 0.386259 12.83C-0.123741 12.31 -0.133741 11.47 0.386259 10.96L6.99626 4.35C7.51626 3.83 8.35626 3.83 8.86626 4.35L13.2163 8.7L19.2763 2.64H15.8563H15.8663Z"
      />
    </svg>
  );
}

/**
 * Evaa Error Card strip variants (Figma node 9851-1978).
 * - `error` — red (trial / critical)
 * - `warning` — orange
 * - `alert` — yellow
 * - `info` — teal “focus” informational strip
 */
export type ErrorCardVariant = 'error' | 'warning' | 'alert' | 'info';

const defaultIcon: Record<ErrorCardVariant, React.ReactNode> = {
  error: <ErrorCardIconError />,
  warning: <ErrorCardIconWarning />,
  alert: <ErrorCardIconAlert />,
  info: <ErrorCardIconInfo />,
};

export interface ErrorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ErrorCardVariant;
  /** Bold primary line (Figma: 14px / 800). */
  title?: string;
  /** Supporting line (Figma: 12px / 400). */
  description?: string;
  /** Replace the default leading glyph for this variant. */
  icon?: React.ReactNode;
}

export const ErrorCard = React.forwardRef<HTMLDivElement, ErrorCardProps>(function ErrorCard(
  {
    variant = 'error',
    title = 'Trial will end in 5 days.',
    description = 'Upgrade to continue using all features.',
    icon,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const rootClass = ['error-card', `error-card--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} role="alert" {...rest}>
      <div className="error-card__icon-wrap" aria-hidden>
        {icon ?? defaultIcon[variant]}
      </div>
      <div className="error-card__body">
        {title != null && title !== '' && <p className="error-card__title">{title}</p>}
        {description != null && description !== '' && (
          <p className="error-card__description">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
});

ErrorCard.displayName = 'ErrorCard';
