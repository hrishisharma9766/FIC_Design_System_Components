import * as React from 'react';
import { Logos, type LogosVariant } from '../Logos/Logos';
import './WebsiteNav.css';

export type WebsiteNavVariant = 'compact' | 'full';

export interface WebsiteNavItem {
  id: string;
  label: string;
}

export interface WebsiteNavProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'children'> {
  /** Compact: logo + cart. Full: logo + tab cluster + links + cart (Evaa Design System website nav). */
  variant?: WebsiteNavVariant;
  /** Renders in the left lockup area; defaults to `Logos` when omitted. */
  logo?: React.ReactNode;
  logoVariant?: LogosVariant;
  tabItems?: WebsiteNavItem[];
  /** Controlled selection for tab items. Omit to manage selection internally from `defaultActiveTabId`. */
  activeTabId?: string;
  defaultActiveTabId?: string;
  linkItems?: WebsiteNavItem[];
  cartLabel?: string;
  onTabClick?: (id: string) => void;
  onLinkClick?: (id: string) => void;
  onCartClick?: () => void;
}

const DEFAULT_TABS: WebsiteNavItem[] = [
  { id: 'products', label: 'Products' },
  { id: 'billing', label: 'Billing & Subscriptions' },
];

const DEFAULT_LINKS: WebsiteNavItem[] = [
  { id: 'support', label: 'Support' },
  { id: 'admin', label: 'Admin Console' },
];

function CartIcon() {
  return (
    <svg
      className="website-nav__cart-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M6.35 3.19 12.1 8l-5.75 4.81-.86-1.03L9.96 8 5.49 4.22l.86-1.03z"
      />
    </svg>
  );
}

export const WebsiteNav = React.forwardRef<HTMLElement, WebsiteNavProps>(function WebsiteNav(
  {
    variant = 'compact',
    logo,
    logoVariant = 'EVAA',
    tabItems = DEFAULT_TABS,
    activeTabId: activeTabIdProp,
    defaultActiveTabId = 'billing',
    linkItems = DEFAULT_LINKS,
    cartLabel = 'GO TO CART',
    onTabClick,
    onLinkClick,
    onCartClick,
    className = '',
    ...props
  },
  ref,
) {
  const [internalTab, setInternalTab] = React.useState(defaultActiveTabId);
  const isControlled = activeTabIdProp !== undefined;
  const activeTabId = isControlled ? activeTabIdProp : internalTab;

  const selectTab = (id: string) => {
    if (!isControlled) setInternalTab(id);
    onTabClick?.(id);
  };

  const lockup = logo ?? <Logos theme="light" variant={logoVariant} />;

  return (
    <nav
      ref={ref}
      className={['website-nav', variant === 'full' ? 'website-nav--full' : 'website-nav--compact', className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Website"
      {...props}
    >
      <div className="website-nav__row">
        <div className="website-nav__logo">{lockup}</div>

        {variant === 'full' ? (
          <>
            <div className="website-nav__center" role="group" aria-label="Main menu">
              {tabItems.map((item) => (
                <button
                  key={`tab-${item.id}`}
                  type="button"
                  aria-current={activeTabId === item.id ? 'page' : undefined}
                  className={[
                    'website-nav__tab',
                    activeTabId === item.id ? 'website-nav__tab--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => selectTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
              {linkItems.map((item) => (
                <button
                  key={`link-${item.id}`}
                  type="button"
                  className="website-nav__link"
                  onClick={() => onLinkClick?.(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button type="button" className="website-nav__cart" onClick={onCartClick}>
              <span>{cartLabel}</span>
              <CartIcon />
            </button>
          </>
        ) : (
          <button type="button" className="website-nav__cart" onClick={onCartClick}>
            <span>{cartLabel}</span>
            <CartIcon />
          </button>
        )}
      </div>
    </nav>
  );
});
