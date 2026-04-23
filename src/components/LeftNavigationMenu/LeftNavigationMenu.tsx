import * as React from 'react';
import './LeftNavigationMenu.css';
import { cn } from '../../lib/utils';
import { Icons } from '../Icons/Icons';
import logoLightBillingAssistant from '../Logos/logos/logo-light-billing-assistance.svg';
import collapsedMascotLogo from './icons/left-nav-logo-collapsed.svg';

export type LeftNavigationMenuVariant = 'expanded' | 'collapsed';

export interface LeftNavigationMenuItem {
  id: string;
  label: string;
  iconName?: string;
  type?: 'single' | 'dropdown';
  children?: LeftNavigationMenuItem[];
}

export interface LeftNavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  variant?: LeftNavigationMenuVariant;
  hasLogo?: boolean;
  hasBackLink?: boolean;
  heading?: boolean;
  headingText?: string;
  hasSubheading?: boolean;
  subheadingText?: string;
  subText?: string;

  items?: LeftNavigationMenuItem[];
  activeItemId?: string;
  defaultOpenItemId?: string;
  onItemSelect?: (item: LeftNavigationMenuItem) => void;
  onBack?: () => void;
}

const SvgIcon = ({ name, className }: { name: string; className?: string }) => {
  const svg = Icons?.[name];
  if (typeof svg !== 'string') return null;
  return (
    <span
      className={cn('left-navigation-menu__svg', className)}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

const Caret = ({ open }: { open: boolean }) => (
  <svg
    className={cn('left-navigation-menu__caret', open && 'left-navigation-menu__caret--open')}
    width="9"
    height="5"
    viewBox="0 0 9 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4.95729 4.8169C4.70603 5.06104 4.29899 5.06104 4.04774 4.8169L0.188442 1.0669C-0.0628138 0.822755 -0.0628138 0.427245 0.188442 0.183105C0.439698 -0.0610359 0.846732 -0.0610358 1.09799 0.183105L4.5 3.48877L7.90201 0.183105C8.15326 -0.0610352 8.5603 -0.0610352 8.81156 0.183105C9.06281 0.427246 9.06281 0.822756 8.81156 1.0669L4.95226 4.8169L4.95729 4.8169Z"
      fill="currentColor"
    />
  </svg>
);

const defaultItems: LeftNavigationMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', iconName: 'Dashboard', type: 'single' },
  { id: 'insurance', label: 'Insurance Iligibiliy', iconName: 'Colored24_InsuranceEligibility', type: 'dropdown' },
  { id: 'claim', label: 'Claim Submission', iconName: 'Colored_ClaimSubmission', type: 'single' },
  {
    id: 'setup',
    label: 'Setup',
    iconName: 'Colored24_Setup',
    type: 'dropdown',
    children: [
      { id: 'setup-selection', label: 'Selection State', type: 'single' },
      { id: 'setup-general', label: 'General Setup', type: 'single' },
    ],
  },
];

export const LeftNavigationMenu = React.forwardRef<HTMLElement, LeftNavigationMenuProps>(function LeftNavigationMenu(
  {
    className,
    variant = 'expanded',
    hasLogo = true,
    hasBackLink = true,
    heading = true,
    headingText = 'BillingAsstistant',
    hasSubheading = true,
    subheadingText = 'Organization Management',
    subText = 'Enterprise Optical Group',
    items = defaultItems,
    activeItemId,
    defaultOpenItemId = 'setup',
    onItemSelect,
    onBack,
    ...props
  },
  ref,
) {
  const isCollapsed = variant === 'collapsed';
  const [openItemId, setOpenItemId] = React.useState<string | undefined>(defaultOpenItemId);
  const [popoverTop, setPopoverTop] = React.useState<number>(0);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!isCollapsed) return;
      if (!popoverRef.current) return;
      if (popoverRef.current.contains(e.target as Node)) return;
      setOpenItemId(undefined);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [isCollapsed]);

  const handleSelect = (item: LeftNavigationMenuItem) => {
    onItemSelect?.(item);
  };

  const handleItemClick = (item: LeftNavigationMenuItem, e: React.MouseEvent<HTMLButtonElement>) => {
    if (item.type === 'dropdown') {
      if (isCollapsed && rootRef.current) {
        const rootRect = rootRef.current.getBoundingClientRect();
        const targetRect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        setPopoverTop(Math.max(0, Math.round(targetRect.top - rootRect.top)));
      }
      setOpenItemId((prev) => (prev === item.id ? undefined : item.id));
      return;
    }
    setOpenItemId(undefined);
    handleSelect(item);
  };

  const activeOrOpenItemId = activeItemId ?? openItemId;

  return (
    <nav
      ref={(el) => {
        rootRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className={cn('left-navigation-menu', isCollapsed && 'left-navigation-menu--collapsed', className)}
      {...props}
    >
      {hasLogo && (
        <div className={cn('left-navigation-menu__logo-panel', isCollapsed && 'left-navigation-menu__logo-panel--collapsed')}>
          {isCollapsed ? (
            <img className="left-navigation-menu__logo-collapsed" src={collapsedMascotLogo} alt="" />
          ) : (
            <img className="left-navigation-menu__logo-expanded" src={logoLightBillingAssistant} alt="" />
          )}
        </div>
      )}

      <div className="left-navigation-menu__panel">
        {hasBackLink && (
          <button
            type="button"
            className={cn('left-navigation-menu__back', isCollapsed && 'left-navigation-menu__back--collapsed')}
            onClick={onBack}
          >
            <span className="left-navigation-menu__row">
              <SvgIcon name="BackArrow" className="left-navigation-menu__icon-16" />
              {!isCollapsed && <span className="left-navigation-menu__label left-navigation-menu__label--bold">Back to Main</span>}
            </span>
            {!isCollapsed && <span className="left-navigation-menu__subtext">{subText}</span>}
          </button>
        )}

        {heading && !isCollapsed && (
          <div className="left-navigation-menu__heading">
            <div className="left-navigation-menu__label left-navigation-menu__label--h1">{headingText}</div>
            <div className="left-navigation-menu__subtext left-navigation-menu__subtext--medium">{subText}</div>
          </div>
        )}

        {hasSubheading && !isCollapsed && (
          <div className="left-navigation-menu__subheading">
            <div className="left-navigation-menu__subtext left-navigation-menu__subtext--medium">{subheadingText}</div>
          </div>
        )}

        <div className="left-navigation-menu__items">
          {items.map((item) => {
            const isOpen = openItemId === item.id;
            const isActive = activeItemId === item.id;
            const showInlineChildren = !isCollapsed && item.type === 'dropdown' && isOpen && item.children?.length;

            return (
              <div key={item.id} className="left-navigation-menu__item-wrap">
                <button
                  type="button"
                  className={cn(
                    'left-navigation-menu__item',
                    item.type === 'dropdown' && 'left-navigation-menu__item--dropdown',
                    isCollapsed && item.type === 'dropdown' && 'left-navigation-menu__item--collapsed-dropdown',
                    (isActive || (item.type === 'dropdown' && isOpen)) && 'left-navigation-menu__item--active',
                  )}
                  onClick={(e) => handleItemClick(item, e)}
                  aria-expanded={item.type === 'dropdown' ? isOpen : undefined}
                >
                  <span className="left-navigation-menu__row">
                    {item.iconName && <SvgIcon name={item.iconName} className="left-navigation-menu__icon-22" />}
                    {!isCollapsed && <span className="left-navigation-menu__label left-navigation-menu__label--bold">{item.label}</span>}
                  </span>
                  {item.type === 'dropdown' && <Caret open={isOpen} />}
                </button>

                {showInlineChildren && (
                  <div className="left-navigation-menu__children">
                    {item.children!.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        className={cn(
                          'left-navigation-menu__child',
                          activeItemId === child.id && 'left-navigation-menu__child--selected',
                        )}
                        onClick={() => handleSelect(child)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isCollapsed && openItemId && (
        <div ref={popoverRef} className="left-navigation-menu__popover" style={{ top: popoverTop }}>
          {items
            .filter((it) => it.id === openItemId && it.type === 'dropdown')
            .flatMap((it) => it.children ?? [])
            .map((child) => (
              <button
                key={child.id}
                type="button"
                className={cn(
                  'left-navigation-menu__popover-item',
                  activeOrOpenItemId === child.id && 'left-navigation-menu__popover-item--selected',
                )}
                onClick={() => handleSelect(child)}
              >
                {child.label}
              </button>
            ))}
        </div>
      )}
    </nav>
  );
});
