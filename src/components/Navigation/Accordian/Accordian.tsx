import React, { createContext, useContext, useState, useRef } from "react";

import type { ReactNode, KeyboardEvent } from "react";

import styles from "./Accordian.module.css";

type AccordionContextType = {
  openIndexes: number[];
  toggleIndex: (index: number) => void;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error(
      "Accordion components must be used within <Accordion.Root>"
    );
  return ctx;
}

interface AccordionRootProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
}

export const Accordion: React.FC<AccordionRootProps> & {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Panel: typeof AccordionPanel;
} = ({ children, allowMultiple = false, defaultOpenIndexes = [] }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      } else {
        return isOpen ? [] : [index];
      }
    });
  };

  return (
    <AccordionContext.Provider
      value={{ openIndexes, toggleIndex, allowMultiple }}
    >
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className = "",
  index,
}) => {
  return (
    <div className={`accordion-item ${className}`} data-accordion-index={index}>
      {children}
    </div>
  );
};

interface AccordionHeaderProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  index,
  className = "",
}) => {
  const { openIndexes, toggleIndex } = useAccordionContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isOpen = openIndexes.includes(index);
  const buttonId = `accordion-header-${index}`;
  const panelId = `accordion-panel-${index}`;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const headers = document.querySelectorAll<HTMLButtonElement>(
      '[role="button"][data-accordion-header]'
    );
    const currentIndex = Array.from(headers).findIndex(
      (el) => el === buttonRef.current
    );

    let newIndex = currentIndex;

    if (e.key === "ArrowDown") newIndex = (currentIndex + 1) % headers.length;
    if (e.key === "ArrowUp")
      newIndex = (currentIndex - 1 + headers.length) % headers.length;
    if (e.key === "Home") newIndex = 0;
    if (e.key === "End") newIndex = headers.length - 1;

    if (newIndex !== currentIndex) {
      e.preventDefault();
      headers[newIndex]?.focus();
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  return (
    <div className={`accordion-header ${className}`}>
      <button
        ref={buttonRef}
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => toggleIndex(index)}
        onKeyDown={handleKeyDown}
        data-accordion-header
        className={styles.header}
        // className="w-full text-left"
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

interface AccordionPanelProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  index,
  className = "",
}) => {
  const { openIndexes } = useAccordionContext();
  const isOpen = openIndexes.includes(index);
  const panelId = `accordion-panel-${index}`;
  const headerId = `accordion-header-${index}`;

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      hidden={!isOpen}
      className={`accordion-panel ${className}`}
    >
      {isOpen && children}
    </div>
  );
};

// Compound component attachments
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
