import * as React from 'react';
import './SimpleListHeader.css';

export type SimpleListHeaderSize = 'md' | 'lg';

export type SimpleListHeaderMarker = 'error' | 'success';

export type SimpleListHeaderVariant = 'bullet' | 'numbered' | 'iconFailed' | 'iconSuccessful' | 'iconCheck';

export interface SimpleListHeaderItem {
  id: string;
  label: string;
  marker?: SimpleListHeaderMarker;
}

export interface SimpleListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  /** Multiline copy (newlines preserved). Used when `items` is empty. */
  body?: string;
  /** Rows with leading markers — when non-empty, replaces `body`. */
  items?: SimpleListHeaderItem[];
  /** `md`: 14px heading; `lg`: 16px regular heading + 16px rows (Figma bottom frame). */
  size?: SimpleListHeaderSize;
  /** Maps to the Figma variants in node 11392:238. */
  variant?: SimpleListHeaderVariant;
}

export const SIMPLE_LIST_HEADER_SUPPORT_BODY = `Email: support@evaa.com
Phone: 1-800-EVAA-HELP (1-800-382-2435)
Hours: Monday - Friday, 8:00 AM - 6:00 PM EST`;

export const SIMPLE_LIST_HEADER_SAMPLE_ITEMS_ERROR: SimpleListHeaderItem[] = [
  { id: '1', label: 'Scribe Lite (Monthly)', marker: 'error' },
  { id: '2', label: 'Virtual Assistant - Bundled with Basic Engage (Yearly)', marker: 'error' },
  { id: '3', label: '100 Patient Encounters (Monthly)', marker: 'error' },
];

export const SIMPLE_LIST_HEADER_SAMPLE_ITEMS_SUCCESS: SimpleListHeaderItem[] = [
  { id: '1', label: 'Scribe Lite (Monthly)', marker: 'success' },
  { id: '2', label: 'Virtual Assistant - Bundled with Basic Engage (Yearly)', marker: 'success' },
  { id: '3', label: '100 Patient Encounters (Monthly)', marker: 'success' },
];

function ListMarker({ tone }: { tone: SimpleListHeaderMarker }) {
  const Icon = tone === 'success' ? CheckIcon16 : CrossIcon16;
  return (
    <Icon className={`simple-list-header__marker simple-list-header__marker--${tone}`} />
  );
}

function BulletMarker() {
  return <span className="simple-list-header__marker simple-list-header__marker--bullet" aria-hidden />;
}

function NumberMarker({ value }: { value: number }) {
  return (
    <span className="simple-list-header__marker simple-list-header__marker--number" aria-hidden>
      {value}
    </span>
  );
}

function CrossIcon16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path
        d="M12.949 12.949C15.6837 10.2144 15.6837 5.78558 12.949 3.05096C10.2144 0.316347 5.78558 0.316344 3.05096 3.05096C0.316344 5.78558 0.316347 10.2144 3.05096 12.949C5.78558 15.6837 10.2144 15.6837 12.949 12.949ZM9.23607 10.1619L8 8.92586L6.76394 10.1619C6.50622 10.4196 6.09579 10.4196 5.83808 10.1619C5.58037 9.90421 5.58037 9.49378 5.83808 9.23606L7.07414 8L5.83808 6.76393C5.58036 6.50622 5.58036 6.09579 5.83808 5.83808C6.09579 5.58036 6.50622 5.58036 6.76393 5.83808L8 7.07414L9.23606 5.83808C9.49378 5.58037 9.90421 5.58037 10.1619 5.83808C10.4196 6.09579 10.4196 6.50622 10.1619 6.76394L8.92586 8L10.1619 9.23607C10.4196 9.49378 10.4196 9.90421 10.1619 10.1619C9.90421 10.4196 9.49378 10.4196 9.23607 10.1619Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path
        d="M8.00001 15C11.8661 15 15 11.8661 15 7.99999C15 4.13392 11.8661 1 8.00001 1C4.13393 1 1 4.13392 1 7.99999C1 11.8661 4.13393 15 8.00001 15ZM10.3128 6.80938L8.12317 10.3128C8.00684 10.4975 7.8084 10.6139 7.59628 10.6207C7.38416 10.6276 7.17204 10.5318 7.04203 10.3607L5.72825 8.60899C5.50929 8.3216 5.57087 7.91104 5.85826 7.69208C6.14565 7.47312 6.55621 7.5347 6.77517 7.82209L7.51417 8.80742L9.19061 6.11827C9.38221 5.81036 9.78593 5.71456 10.0938 5.91299C10.4018 6.10459 10.4976 6.50831 10.2991 6.81622L10.3128 6.80938Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckMarkIcon16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <g transform="translate(1 3)">
        <path
          d="M13.7071 0.292923C14.0976 0.683487 14.0976 1.31776 13.7071 1.70833L5.70796 9.70708C5.31738 10.0976 4.68307 10.0976 4.29249 9.70708L0.292936 5.7077C-0.0976453 5.31714 -0.0976453 4.68286 0.292936 4.2923C0.683517 3.90173 1.31782 3.90173 1.7084 4.2923L5.00179 7.58241L12.2947 0.292923C12.6853 -0.097641 13.3196 -0.097641 13.7102 0.292923H13.7071Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/**
 * Simple list with header — tinted panel, title, then body text or icon+label rows (Figma 11392-238).
 */
export const SimpleListHeader = React.forwardRef<HTMLDivElement, SimpleListHeaderProps>(
  function SimpleListHeader(
    {
      heading,
      body,
      items = [],
      size = 'md',
      variant,
      className = '',
      ...rest
    },
    ref,
  ) {
    const rootClass = ['simple-list-header', size === 'lg' && 'simple-list-header--lg', className]
      .filter(Boolean)
      .join(' ');

    const hasList = items.length > 0;
    const isBullet = variant === 'bullet';
    const isNumbered = variant === 'numbered';
    const isIconFailed = variant === 'iconFailed';
    const isIconSuccessful = variant === 'iconSuccessful';
    const isIconCheck = variant === 'iconCheck';
    const showLineList = isBullet || isNumbered;
    const lineItems: string[] = showLineList
      ? (hasList ? items.map((x) => x.label) : (body ?? '').split('\n').filter((x) => x.trim() !== ''))
      : [];

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <p className="simple-list-header__heading">{heading}</p>
        {showLineList ? (
          <ul className="simple-list-header__list" role="list">
            {lineItems.map((label, index) => (
              <li key={`${index}-${label}`} className="simple-list-header__row" role="listitem">
                <span className="simple-list-header__marker-wrap">
                  {isBullet ? <BulletMarker /> : <NumberMarker value={index + 1} />}
                </span>
                <p className="simple-list-header__row-label">{label}</p>
              </li>
            ))}
          </ul>
        ) : hasList ? (
          <ul className="simple-list-header__list" role="list">
            {items.map((item) => (
              <li key={item.id} className="simple-list-header__row" role="listitem">
                <span className="simple-list-header__marker-wrap">
                  {isIconCheck ? (
                    <CheckMarkIcon16 className="simple-list-header__marker simple-list-header__marker--check" />
                  ) : item.marker != null || isIconFailed || isIconSuccessful ? (
                    <ListMarker tone={isIconFailed ? 'error' : isIconSuccessful ? 'success' : item.marker!} />
                  ) : null}
                </span>
                <p className="simple-list-header__row-label">{item.label}</p>
              </li>
            ))}
          </ul>
        ) : (
          body != null &&
          body !== '' && <p className="simple-list-header__body">{body}</p>
        )}
      </div>
    );
  },
);

SimpleListHeader.displayName = 'SimpleListHeader';
