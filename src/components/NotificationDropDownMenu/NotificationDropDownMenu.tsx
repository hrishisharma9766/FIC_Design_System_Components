import React from 'react';
import './NotificationDropDownMenu.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { SimpleTab } from '../SimpleTab/SimpleTab';

interface NotificationItem {
  id: string;
  type: 'warning' | 'error';
  subject: string;
  heading: string;
  body: string;
  time: string;
  isNew?: boolean;
  read?: boolean;
  onLinkClick?: (id: string) => void;
}

export interface NotificationDropDownMenuProps {
  className?: string;
  notifications?: NotificationItem[];
  tabs?: 'two-tabs' | 'more-than-2-tabs';
  theme?: 'fusia' | 'neutral' | 'teal';
  defaultTab?: 'unread' | 'all';
  onTabChange?: (tab: 'unread' | 'all') => void;
  onLinkClick?: (id: string) => void;
}

const AlertIcon = ({ type, read }: { type: 'warning' | 'error'; read?: boolean }) => {
  if (read) {
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="42" height="42" rx="21" fill="var(--Colors-PrimitiveColorTokens-Neutrals-Bkg-300, #E5E4DD)"/>
        <path d="M20.95 10.765C20.24 10.765 19.67 11.335 19.67 12.045V12.175C16.75 12.765 14.55 15.345 14.55 18.445V19.315C14.55 21.235 13.89 23.105 12.7 24.605L12.31 25.095C12.11 25.345 12 25.655 12 25.985C12 26.765 12.64 27.405 13.42 27.405H28.49C29.27 27.405 29.91 26.765 29.91 25.985C29.91 25.665 29.8 25.345 29.6 25.095L29.21 24.605C28.01 23.105 27.36 21.235 27.36 19.315V18.445C27.36 15.355 25.16 12.765 22.24 12.175V12.045C22.24 11.335 21.67 10.765 20.96 10.765H20.95ZM18.47 29.315C18.75 30.415 19.76 31.235 20.95 31.235C22.14 31.235 23.14 30.415 23.43 29.315H18.47Z" fill="var(--Colors-PrimitiveColorTokens-Neutrals-Bkg-500, #959490)"/>
      </svg>
    );
  }
  if (type === 'warning') {
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="21" fill="var(--Colors-Functional-Input-Icons-Icon_Warning-Light, #FFD3B1)"/>
        <path d="M21.23 31.46C26.88 31.46 31.46 26.88 31.46 21.23C31.46 15.58 26.88 11 21.23 11C15.58 11 11 15.58 11 21.23C11 26.88 15.58 31.46 21.23 31.46ZM21.23 16.42C21.76 16.42 22.19 16.85 22.19 17.38V21.86C22.19 22.39 21.76 22.82 21.23 22.82C20.7 22.82 20.27 22.39 20.27 21.86V17.38C20.27 16.85 20.7 16.42 21.23 16.42ZM20.16 25.06C20.14 24.66 20.33 24.29 20.67 24.08C21.01 23.88 21.44 23.88 21.78 24.08C22.12 24.29 22.32 24.66 22.29 25.06C22.31 25.46 22.12 25.83 21.78 26.04C21.44 26.24 21.01 26.24 20.67 26.04C20.33 25.83 20.13 25.46 20.16 25.06Z" fill="var(--Colors-Navigation-Icons-Alert-Warning-Orange500, #F27E25)"/>
      </svg>
    );
  }
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="21" fill="var(--Colors-Functional-Input-Icons-Icon_Error-Light, #FFD3D2)"/>
      <path d="M21.2453 10.2439C21.8353 10.2439 22.3753 10.5717 22.6553 11.1044L31.2853 27.4844C31.5553 27.9966 31.5453 28.6112 31.2553 29.1029C30.9653 29.5946 30.4453 29.9019 29.8753 29.9019H12.6053C12.0453 29.9019 11.5253 29.5946 11.2253 29.1029C10.9353 28.6112 10.9253 27.9966 11.1953 27.4844L19.8253 11.1044C20.1053 10.5717 20.6453 10.2439 21.2353 10.2439H21.2453ZM21.2453 17.1278C20.7153 17.1278 20.2853 17.5683 20.2853 18.1112V22.7005C20.2853 23.2434 20.7153 23.6839 21.2453 23.6839C21.7753 23.6839 22.2053 23.2434 22.2053 22.7005V18.1112C22.2053 17.5683 21.7753 17.1278 21.2453 17.1278ZM22.3053 25.9683C22.3253 25.5585 22.1353 25.1795 21.7953 24.9644C21.4553 24.7595 21.0253 24.7595 20.6853 24.9644C20.3453 25.1795 20.1453 25.5585 20.1753 25.9683C20.1553 26.378 20.3453 26.7571 20.6853 26.9722C21.0253 27.1771 21.4553 27.1771 21.7953 26.9722C22.1353 26.7571 22.3353 26.378 22.3053 25.9683Z" fill="var(--Colors-Navigation-Icons-Alert-High-Red500, #E73D36)"/>
    </svg>
  );
};

const NotificationStatusDot = ({ isNew, read }: { isNew?: boolean; read?: boolean }) => {
  if (!isNew && !read) return null;
  
  if (read) {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="6.5" fill="var(--Colors-Navigation-Icons-Alert-Count_Inactive-400, #8BA1B9)"/>
      </svg>
    );
  }

  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5" cy="6.5" r="6.5" fill="var(--Colors-Navigation-Icons-Alert-High-Red500, #E73D36)"/>
    </svg>
  );
};

const NotificationCard = ({ notification }: { notification: NotificationItem }) => {
  const { type, subject, heading, body, time, isNew, read, onLinkClick, id } = notification;
  
  const cardClass = read ? 'notification-card--read' : `notification-card--${type}`;
  const subjectClass = read ? 'notification-card__subject--read' : `notification-card__subject--${type}`;
  
  return (
    <div className={`notification-card ${cardClass}`}>
      <div className="notification-card__content">
        <div className="notification-card__icon">
          <AlertIcon type={type} read={read} />
        </div>
        <div className="notification-card__details">
          <span className={`notification-card__subject ${subjectClass}`}>{subject}</span>
          <span className="notification-card__heading">{heading}</span>
          <div className="notification-card__footer">
            <span className="notification-card__body">{body}</span>
            <LinkButton 
              variant={read ? 'readonly' : (type === 'warning' ? 'warning' : 'error')} 
              label="View Licenses & Billing"
              onClick={() => onLinkClick?.(id)}
            />
            <span className="notification-card__time">{time}</span>
          </div>
        </div>
        <div className="notification-card__status">
          <NotificationStatusDot isNew={isNew} read={read} />
        </div>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.9841 24.9841C29.672 20.2961 29.672 12.7039 24.9841 8.01594C20.2961 3.32802 12.7039 3.32802 8.01594 8.01594C3.32802 12.7039 3.32802 20.2961 8.01594 24.9841C12.7039 29.672 20.2961 29.672 24.9841 24.9841ZM18.619 20.2062L16.5 18.0872L14.381 20.2062C13.9392 20.6479 13.2356 20.6479 12.7938 20.2062C12.3521 19.7644 12.3521 19.0608 12.7938 18.619L14.9128 16.5L12.7938 14.381C12.3521 13.9392 12.3521 13.2356 12.7938 12.7938C13.2356 12.3521 13.9392 12.3521 14.381 12.7938L16.5 14.9128L18.619 12.7938C19.0608 12.3521 19.7644 12.3521 20.2062 12.7938C20.6479 13.2356 20.6479 13.9392 20.2062 14.381L18.0872 16.5L20.2062 18.619C20.6479 19.0608 20.6479 19.7644 20.2062 20.2062C19.7644 20.6479 19.0608 20.6479 18.619 20.2062Z" fill="var(--Colors-Navigation-Icons-Gray-Bkg--400, #959490)"/>
  </svg>
);

const BellIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5073 6.72842C22.8643 6.33294 22.0306 6.53163 21.6351 7.1746L21.5627 7.29233C18.5897 6.20014 15.1603 7.31115 13.4335 10.1185L12.9489 10.9064C11.8795 12.6451 10.2401 13.9709 8.32695 14.6665L7.70083 14.893C7.38045 15.008 7.10816 15.2275 6.92435 15.5263C6.48987 16.2327 6.71296 17.1687 7.41933 17.6032L21.0667 25.9975C21.7731 26.432 22.7091 26.2089 23.1436 25.5025C23.3219 25.2127 23.4005 24.8616 23.3586 24.5238L23.2784 23.8629C23.0272 21.836 23.4802 19.7805 24.5496 18.0418L25.0342 17.2539C26.7554 14.4556 26.2058 10.8847 23.8901 8.72387L23.9625 8.60614C24.358 7.96317 24.1593 7.12948 23.5163 6.734L23.5073 6.72842ZM10.9287 22.1459C10.5695 23.298 11.0274 24.6032 12.1051 25.266C13.1828 25.9289 14.5451 25.7433 15.4205 24.9087L10.9287 22.1459Z" fill="var(--Colors-Navigation-Icons-Yellow600, #F3B51E)"/>
  </svg>
);

const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'warning',
    subject: 'Billing Assistant',
    heading: 'Trial will end in 5 days.',
    body: 'Upgrade to continue using all feature.',
    time: '10 minutes ago',
    isNew: true,
  },
  {
    id: '2',
    type: 'error',
    subject: 'Billing Assistant',
    heading: 'Trial will end in 5 days.',
    body: 'Upgrade to continue using all feature.',
    time: '10 minutes ago',
    isNew: true,
  },
  {
    id: '3',
    type: 'warning',
    subject: 'Billing Assistant',
    heading: 'Trial will end in 5 days.',
    body: 'Upgrade to continue using all feature.',
    time: '10 minutes ago',
    isNew: false,
    read: true,
  },
];

export const NotificationDropDownMenu: React.FC<NotificationDropDownMenuProps> = ({
  className = '',
  notifications: propNotifications,
  tabs = 'two-tabs',
  theme = 'teal',
  defaultTab = 'unread',
  onTabChange,
  onLinkClick,
}) => {
  const [internalActiveTab, setInternalActiveTab] = React.useState<'unread' | 'all'>(defaultTab);

  const isControlled = defaultTab !== undefined;
  const activeTab = isControlled ? internalActiveTab : internalActiveTab;

  const handleTabChange = (tab: 'inbox' | 'unread' | 'all') => {
    const mappedTab = tab === 'inbox' ? 'unread' : tab;
    setInternalActiveTab(mappedTab);
    onTabChange?.(mappedTab);
  };

  const notifications = propNotifications || sampleNotifications;

  const filteredNotifications = activeTab === 'unread'
    ? notifications.filter(n => n.isNew)
    : notifications;

  return (
    <div className={`notification-dropdown-menu ${className}`}>
      <div className="notification-dropdown-menu__header">
        <div className="notification-dropdown-menu__title-section">
          <div className="notification-dropdown-menu__bell-icon">
            <BellIcon />
          </div>
          <span className="notification-dropdown-menu__title">Alerts</span>
        </div>
        <div className="notification-dropdown-menu__close-icon">
          <CloseIcon />
        </div>
      </div>

      <div className="notification-dropdown-menu__tab-band">
        <SimpleTab
          tabs={tabs}
          theme={theme}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
        <LinkButton hasIcon={false} variant="teal" label="Mark all as read" />
      </div>

      <div className="notification-dropdown-menu__notifications">
        {filteredNotifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={{ ...notification, onLinkClick }}
          />
        ))}
      </div>
    </div>
  );
};