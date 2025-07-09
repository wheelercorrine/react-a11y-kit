import React, { createContext, useContext, useState, useRef } from "react";

import type { ReactNode, KeyboardEvent } from "react";

import styles from "./Tabs.module.css";

type TabsContextType = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  orientation: "horizontal" | "vertical";
  manual: boolean;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx)
    throw new Error("Tabs compound components must be used within <Tabs.Root>");
  return ctx;
}

interface TabsRootProps {
  children: ReactNode;
  defaultIndex?: number;
  orientation?: "horizontal" | "vertical";
  manual?: boolean; // if true, arrow keys change focus but not selection
}

export const Tabs: React.FC<TabsRootProps> & {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
} = ({
  children,
  defaultIndex = 0,
  orientation = "horizontal",
  manual = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider
      value={{ selectedIndex, setSelectedIndex, orientation, manual }}
    >
      {children}
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className = "" }) => {
  const { orientation } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`tabs-list ${className}`}
      role="tablist"
      aria-orientation={orientation}
      ref={listRef}
    >
      {children}
    </div>
  );
};

interface TabsTabProps {
  children: ReactNode;
  index: number;
  className?: string;
  id?: string;
}

const TabsTab: React.FC<TabsTabProps> = ({ children, index, id }) => {
  const { selectedIndex, setSelectedIndex, orientation, manual } =
    useTabsContext();
  const isSelected = selectedIndex === index;
  const tabId = id || `tab-${index}`;
  const panelId = `panel-${index}`;
  const tabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const direction =
      orientation === "horizontal"
        ? e.key === "ArrowRight"
          ? 1
          : e.key === "ArrowLeft"
          ? -1
          : 0
        : e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowUp"
        ? -1
        : 0;

    if (direction !== 0) {
      e.preventDefault();
      const tabs =
        tabRef.current?.parentElement?.querySelectorAll<HTMLElement>(
          '[role="tab"]'
        );
      if (!tabs) return;

      const newIndex = (index + direction + tabs.length) % tabs.length;
      (tabs[newIndex] as HTMLElement)?.focus();

      if (!manual) {
        setSelectedIndex(newIndex);
      }
    }

    if (e.key === "Home") {
      e.preventDefault();
      const tabs =
        tabRef.current?.parentElement?.querySelectorAll<HTMLElement>(
          '[role="tab"]'
        );
      tabs?.[0]?.focus();
      if (!manual) setSelectedIndex(0);
    }

    if (e.key === "End") {
      e.preventDefault();
      const tabs =
        tabRef.current?.parentElement?.querySelectorAll<HTMLElement>(
          '[role="tab"]'
        );
      tabs?.[tabs.length - 1]?.focus();
      if (tabs && !manual) setSelectedIndex(tabs.length - 1);
    }

    if (manual && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setSelectedIndex(index);
    }
  };

  return (
    <button
      ref={tabRef}
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      className={`${styles.tab} ${isSelected ? styles.selected : ""}`}
      onClick={() => setSelectedIndex(index)}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {children}
    </button>
  );
};

interface TabsPanelProps {
  children: ReactNode;
  index: number;
  className?: string;
  id?: string;
}

const TabsPanel: React.FC<TabsPanelProps> = ({
  children,
  index,
  className = "",
  id,
}) => {
  const { selectedIndex } = useTabsContext();
  const panelId = id || `panel-${index}`;
  const tabId = `tab-${index}`;

  return selectedIndex === index ? (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={`tabs-panel ${className}`}
    >
      {children}
    </div>
  ) : null;
};

// Attach compound components
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
