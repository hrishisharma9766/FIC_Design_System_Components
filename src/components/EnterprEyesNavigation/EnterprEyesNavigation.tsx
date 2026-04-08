import React, { useState, useEffect } from 'react';
import { Logos } from '../Logos/Logos';
import './EnterprEyesNavigation.css';

export interface NavItem {
  id: string;
  label: string;
  icon: string; // FontAwesome class name
  badge?: string;
}

export interface EnterprEyesNavigationProps {
  primaryItems?: NavItem[];
  activePrimaryId?: string;
  secondaryItemsMap?: Record<string, string[]>;
  activeSecondaryId?: string;
  userName?: string;
  userInitials?: string;
  onPrimaryClick?: (id: string) => void;
  onSecondaryClick?: (id: string) => void;
  className?: string;
}

const DEFAULT_SECONDARY_MAP: Record<string, string[]> = {
  'dashboard': ['Overview', 'Analytics', 'Reports'],
  'practice-hub': ['Practice Locations', 'Staff Management', 'Patient Portal'],
  'inventory-hub': ['Stock Levels', 'Suppliers', 'Orders'],
  'access-gateway': ['Security Logs', 'Permissions', 'User Roles'],
  'insight-engine': ['Data Trends', 'Performance', 'Predictions'],
  'tasks': ['My Tasks', 'Team Tasks', 'Completed'],
};

export const EnterprEyesNavigation: React.FC<EnterprEyesNavigationProps> = ({
  primaryItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-table-columns', badge: '99+' },
    { id: 'practice-hub', label: 'Practice Hub', icon: 'fa-solid fa-building-user' },
    { id: 'inventory-hub', label: 'Inventory Hub', icon: 'fa-solid fa-box-archive' },
    { id: 'access-gateway', label: 'Access Gateway', icon: 'fa-solid fa-shield-halved' },
    { id: 'insight-engine', label: 'Insight Engine', icon: 'fa-solid fa-chart-area' },
    { id: 'tasks', label: 'Tasks', icon: 'fa-solid fa-square-check' },
  ],
  activePrimaryId: initialActivePrimaryId = 'practice-hub',
  secondaryItemsMap = DEFAULT_SECONDARY_MAP,
  activeSecondaryId: initialActiveSecondaryId,
  userInitials = 'AD',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
}) => {
  const [activePrimary, setActivePrimary] = useState(initialActivePrimaryId);
  const [activeSecondary, setActiveSecondary] = useState(initialActiveSecondaryId || (secondaryItemsMap[initialActivePrimaryId]?.[0] || ''));

  useEffect(() => {
    setActivePrimary(initialActivePrimaryId);
  }, [initialActivePrimaryId]);

  useEffect(() => {
    if (initialActiveSecondaryId) {
      setActiveSecondary(initialActiveSecondaryId);
    }
  }, [initialActiveSecondaryId]);

  const handlePrimaryClick = (id: string) => {
    setActivePrimary(id);
    const newSecondary = secondaryItemsMap[id]?.[0] || '';
    setActiveSecondary(newSecondary);
    onPrimaryClick?.(id);
  };

  const handleSecondaryClick = (id: string) => {
    setActiveSecondary(id);
    onSecondaryClick?.(id);
  };

  const currentSecondaryItems = secondaryItemsMap[activePrimary] || [];

  return (
    <div className={`ehr-navigation ${className}`}>
      {/* Top Primary Navigation Bar */}
      <div className="ehr-navigation__primary">
        {/* Left Section: Logo and Main Nav */}
        <div className="ehr-navigation__left">
          {/* Brand Logo */}
          <div className="ehr-navigation__logo">
            <Logos
              theme="dark"
              variant="MaximEyes Evaa"
              className="h-[26px] w-[104px] shrink-0"
            />
          </div>

          <nav className="ehr-navigation__nav">
            {primaryItems.map((item) => (
              <div
                key={item.id}
                className={`ehr-navigation__item ${
                  activePrimary === item.id ? 'ehr-navigation__item--active' : ''
                }`}
                onClick={() => handlePrimaryClick(item.id)}
              >
                <i className={`${item.icon} ehr-navigation__item-icon`}></i>
                <span className="ehr-navigation__item-label">{item.label}</span>
                {item.badge && (
                  <div className="ehr-navigation__badge">{item.badge}</div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Section: Utilities & User */}
        <div className="ehr-navigation__right">
          <div className="ehr-navigation__utils">
            <div className="ehr-navigation__util-item">
              <i className="fa-solid fa-comment-dots"></i>
              <div className="ehr-navigation__util-badge">3</div>
            </div>
            <div className="ehr-navigation__util-item">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <div className="ehr-navigation__util-item">
              <i className="fa-solid fa-gear"></i>
            </div>
          </div>

          <div className="ehr-navigation__user">
            <div className="ehr-navigation__avatar">{userInitials}</div>
            <i className="fa-solid fa-caret-down ehr-navigation__user-arrow"></i>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      {currentSecondaryItems.length > 0 && (
        <div className="ehr-navigation__secondary">
          {currentSecondaryItems.map((item) => (
            <div
              key={item}
              className={`ehr-navigation__secondary-item ${
                activeSecondary === item ? 'ehr-navigation__secondary-item--active' : ''
              }`}
              onClick={() => handleSecondaryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
