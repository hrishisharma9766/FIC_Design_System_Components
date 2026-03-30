import { useState } from 'react';
import "./SimpleTab.css";

export interface SimpleTabProps {
  tabs: "more-than-2-tabs" | "two-tabs";
  theme: "fusia" | "neutral" | "teal";
  className?: string;
  onTabChange?: (tab: 'inbox' | 'unread' | 'all') => void;
  activeTab?: 'inbox' | 'unread' | 'all';
}

export type TabValue = 'inbox' | 'unread' | 'all';

export const SimpleTab: React.FC<SimpleTabProps> = ({
  tabs = "two-tabs",
  theme = "neutral",
  className = "",
  onTabChange,
  activeTab: controlledActiveTab,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<TabValue>('unread');

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tab: TabValue) => {
    if (!isControlled) {
      setInternalActiveTab(tab);
    }
    onTabChange?.(tab);
  };

  const isInboxActive = () => {
    if (tabs === "more-than-2-tabs" && ["fusia", "neutral"].includes(theme)) {
      return activeTab === 'inbox';
    }
    return activeTab === 'unread';
  };

  const isUnreadActive = () => {
    if (tabs === "more-than-2-tabs" && ["fusia", "neutral"].includes(theme)) {
      return activeTab === 'unread';
    }
    return activeTab === 'all';
  };

  const isAllActive = () => {
    if (tabs === "more-than-2-tabs" && ["fusia", "neutral"].includes(theme)) {
      return activeTab === 'all';
    }
    return false;
  };

  return (
    <div className={`simple-tab-set ${tabs} ${theme} ${className}`}>
      <div
        className={`slected-tab ${isInboxActive() ? 'active' : ''}`}
        onClick={() => {
          const tabValue = (tabs === "more-than-2-tabs" && ["fusia", "neutral"].includes(theme)) ? 'inbox' : 'unread';
          handleTabClick(tabValue);
        }}
      >
        <div className="inbox">
          {tabs === "more-than-2-tabs" &&
            ["fusia", "neutral"].includes(theme) && <>Inbox (12)</>}

          {(tabs === "two-tabs" || theme === "teal") && <>Unread (2)</>}
        </div>
      </div>

      <div
        className={`non-slected-tab ${isUnreadActive() ? 'active' : ''}`}
        onClick={() => {
          const tabValue = (tabs === "more-than-2-tabs" && ["fusia", "neutral"].includes(theme)) ? 'unread' : 'all';
          handleTabClick(tabValue);
        }}
      >
        <div className="all">
          {tabs === "two-tabs" && <>All</>}

          {tabs === "more-than-2-tabs" && <>Unread (2)</>}
        </div>
      </div>

      {tabs === "more-than-2-tabs" && (
        <div
          className={`non-slected-tab ${isAllActive() ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          <div className="text-wrapper">All</div>
        </div>
      )}
    </div>
  );
};