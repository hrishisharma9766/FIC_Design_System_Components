import * as React from 'react';
import './AdminTopNav.css';
import { cn } from '../../lib/utils';
import { SingleSelectDropDown, type SingleSelectDropDownOption } from '../SingleSelectDropDown/SingleSelectDropDown';
import { NavigationDropDown } from '../NavigationDropDown/NavigationDropDown';
import { Icons } from '../Icons/Icons';
import logoLightEvaa from '../Logos/logos/logo-light-evaa.svg';

export type AdminTopNavSize = 'small' | 'medium' | 'large';

export interface AdminTopNavProps extends React.HTMLAttributes<HTMLElement> {
  size?: AdminTopNavSize;
  enterpriseDropDown?: boolean;
  virtualAssistanceDropdown?: boolean;
  notification?: boolean;
  help?: boolean;
  setup?: boolean;
  profile?: boolean;
  plusButton?: boolean;
  hasLogo?: boolean;

  enterpriseOptions?: SingleSelectDropDownOption[];
  enterpriseValue?: string;
  onEnterpriseChange?: (value: string) => void;

  productOptions?: SingleSelectDropDownOption[];
  productValue?: string;
  onProductChange?: (value: string) => void;
}

const SvgIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const svg = Icons?.[name];
  if (typeof svg !== 'string') return null;

  return <span className={cn('admin-top-nav__svg', className)} aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />;
};

export const AdminTopNav = React.forwardRef<HTMLElement, AdminTopNavProps>(function AdminTopNav(
  {
    className,
    size = 'medium',
    enterpriseDropDown = true,
    virtualAssistanceDropdown = true,
    notification = true,
    help = true,
    setup = true,
    profile = true,
    plusButton = true,
    hasLogo = true,
    enterpriseOptions = [{ value: 'enterprise-optical-group', label: 'Enterprise Optical Group' }],
    enterpriseValue,
    onEnterpriseChange,
    productOptions = [{ value: 'virtual-assistant', label: 'Virtual Assistant' }],
    productValue,
    onProductChange,
    ...props
  },
  ref,
) {
  return (
    <header ref={ref} className={cn('admin-top-nav', `admin-top-nav--${size}`, className)} {...props}>
      <div className="admin-top-nav__left">
        {hasLogo && (
          <div className="admin-top-nav__logo" aria-label="Evaa">
            <img className="admin-top-nav__logo-img" src={logoLightEvaa} alt="" />
          </div>
        )}

        {enterpriseDropDown && (
          <div className="admin-top-nav__dropdown">
            <SingleSelectDropDown
              className="admin-top-nav__singleselect"
              label=""
              placeholder="Enterprise Optical Group"
              options={enterpriseOptions}
              value={enterpriseValue}
              onChange={onEnterpriseChange}
              size="md"
            />
          </div>
        )}

        {virtualAssistanceDropdown && (
          <div className="admin-top-nav__dropdown">
            <SingleSelectDropDown
              className="admin-top-nav__singleselect"
              label=""
              placeholder="Virtual Assistant"
              options={productOptions}
              value={productValue}
              onChange={onProductChange}
              size="md"
            />
          </div>
        )}

        {plusButton && (
          <button type="button" className="admin-top-nav__add-btn" aria-label="Add">
            <SvgIcon name="Add" className="admin-top-nav__add-icon" />
          </button>
        )}
      </div>

      <div className="admin-top-nav__right">
        {notification && (
          <button type="button" className="admin-top-nav__icon-btn" aria-label="Notifications">
            <SvgIcon name="Colored32_AlertCountActive" className="admin-top-nav__icon-32" />
          </button>
        )}

        {help && (
          <NavigationDropDown
            className="admin-top-nav__nav-dropdown"
            hasLabel={false}
            icon={<SvgIcon name="Colored24_Help" className="admin-top-nav__icon-22" />}
            items={[
              { label: 'Help Center', icon: <SvgIcon name="Help" className="admin-top-nav__icon-16" /> },
              { label: 'Contact Support', icon: <SvgIcon name="Message" className="admin-top-nav__icon-16" /> },
            ]}
          />
        )}

        {setup && (
          <NavigationDropDown
            className="admin-top-nav__nav-dropdown"
            hasLabel={false}
            icon={<SvgIcon name="Colored24_Setup" className="admin-top-nav__icon-22" />}
            items={[
              { label: 'Settings', icon: <SvgIcon name="Settings" className="admin-top-nav__icon-16" /> },
              { label: 'Licenses & Billing', icon: <SvgIcon name="Billing_Licenses" className="admin-top-nav__icon-16" /> },
            ]}
          />
        )}

        {profile && (
          <NavigationDropDown
            className="admin-top-nav__nav-dropdown"
            hasLabel={false}
            icon={<SvgIcon name="Colored24_UserIcon" className="admin-top-nav__icon-22" />}
            items={[
              { label: 'Profile', icon: <SvgIcon name="UserIcon" className="admin-top-nav__icon-16" /> },
              { label: 'Sign out', icon: <SvgIcon name="SignOff" className="admin-top-nav__icon-16" /> },
            ]}
            menuPlacement="right"
          />
        )}
      </div>
    </header>
  );
});
