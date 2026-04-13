import * as React from 'react';
import './CouponCard.css';

export type CouponCardVariant = 'success' | 'neutral';

export interface CouponCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Coupon / promo code shown in the lime pill (e.g. `Xmas25`). */
  code: string;
  /** Supporting copy (discount rules, dates, etc.). */
  description: string;
  /** `success` — lime surface + success border; `neutral` — gray surface (Evaa Coupon Card). */
  variant?: CouponCardVariant;
  /** Override the leading glyph (default: circular checkmark from design). */
  icon?: React.ReactNode;
}

function DefaultCouponIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 28C21.7322 28 28 21.7321 28 14C28 6.26783 21.7322 0 14 0C6.26785 0 0 6.26783 0 14C0 21.7321 6.26785 28 14 28ZM18.6256 11.6188L14.2463 18.6256C14.0137 18.9951 13.6168 19.2278 13.1926 19.2414C12.7683 19.2551 12.3441 19.0635 12.0841 18.7214L9.4565 15.218C9.01857 14.6432 9.14175 13.8221 9.71653 13.3842C10.2913 12.9462 11.1124 13.0694 11.5503 13.6442L13.0283 15.6148L16.3812 10.2366C16.7644 9.62072 17.5719 9.42912 18.1877 9.82599C18.8035 10.2092 18.9951 11.0166 18.5982 11.6325L18.6256 11.6188Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const CouponCard = React.forwardRef<HTMLDivElement, CouponCardProps>(function CouponCard(
  { code, description, variant = 'success', icon, className = '', children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={['coupon-card', variant === 'neutral' ? 'coupon-card--neutral' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="coupon-card__icon" aria-hidden>
        {icon ?? <DefaultCouponIcon />}
      </div>
      <div className="coupon-card__body">
        <span className="coupon-card__code">{code}</span>
        <p className="coupon-card__description">{description}</p>
        {children}
      </div>
    </div>
  );
});
