import React from 'react';
import { NavigationDropDown, type NavigationDropDownItem } from './NavigationDropDown';
import './AdminTopNav.css';

export interface NavSelectOption {
  label: string;
  value: string;
}

export interface NavIconAction {
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: string | number;
}

export interface AdminTopNavProps {
  logo?: React.ReactNode;
  leftSelects?: {
    placeholder: string;
    options: NavSelectOption[];
    onSelect?: (value: string) => void;
    value?: string;
  }[];
  actions?: NavIconAction[];
  profileAction?: {
    icon?: React.ReactNode;
    label?: string;
    onClick?: () => void;
    items?: NavigationDropDownItem[];
  };
  className?: string;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({
  logo,
  leftSelects = [],
  actions = [],
  profileAction,
  className = '',
}) => {
  return (
    <nav className={`admin-top-nav ${className}`}>
      <div className="admin-top-nav__left">
        <div className="admin-top-nav__logo">
          {logo || (
            <div className="admin-top-nav__logo-container">
              <div className="admin-top-nav__logo-square" />
              <div className="admin-top-nav__logo-square" />
              <div className="admin-top-nav__logo-square" />
              <div className="admin-top-nav__logo-square" />
            </div>
          )}
        </div>

        <div className="admin-top-nav__selects">
          {leftSelects.map((select, index) => (
            <NavigationDropDown
              key={index}
              label={select.value || select.placeholder}
              items={select.options.map(opt => ({
                label: opt.label,
                onClick: () => select.onSelect?.(opt.value)
              }))}
              hasLabel={true}
              hasDropdownIcon={true}
              className="admin-top-nav__dropdown"
            />
          ))}
        </div>
        
        <div className="admin-top-nav__search-wrapper">
           <div className="admin-top-nav__search-icon-placeholder">
             <div className="admin-top-nav__search-icon" />
           </div>
        </div>
      </div>

      <div className="admin-top-nav__right">
        <div className="admin-top-nav__actions-container">
          {actions.map((action, index) => (
            <div key={index} className="admin-top-nav__icon-action" onClick={action.onClick}>
              <div className="admin-top-nav__icon-box">
                {action.icon}
                {action.badge && <span className="admin-top-nav__badge-count">{action.badge}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="admin-top-nav__profile-group">
          {profileAction && (
            <NavigationDropDown
              label={profileAction.label}
              hasLabel={!!profileAction.label}
              icon={profileAction.icon || <div className="admin-top-nav__avatar admin-top-nav__avatar--purple" />}
              items={profileAction.items || []}
              onSelect={profileAction.onClick ? () => profileAction.onClick?.() : undefined}
              hasDropdownIcon={true}
              menuPlacement="right"
              className="admin-top-nav__profile-dropdown"
            />
          )}

          {!profileAction && (
            <>
              <NavigationDropDown
                hasLabel={false}
                icon={<div className="admin-top-nav__avatar admin-top-nav__avatar--purple" />}
                items={[]}
                hasDropdownIcon={true}
                menuPlacement="right"
                className="admin-top-nav__profile-dropdown"
              />
              <NavigationDropDown
                hasLabel={false}
                icon={<div className="admin-top-nav__avatar admin-top-nav__avatar--gray" />}
                items={[]}
                hasDropdownIcon={true}
                menuPlacement="right"
                className="admin-top-nav__profile-dropdown"
              />
              <NavigationDropDown
                hasLabel={false}
                icon={<div className="admin-top-nav__avatar admin-top-nav__avatar--gray" />}
                items={[]}
                hasDropdownIcon={true}
                menuPlacement="right"
                className="admin-top-nav__profile-dropdown"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
