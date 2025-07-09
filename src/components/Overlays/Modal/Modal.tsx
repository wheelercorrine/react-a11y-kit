import styles from "./Modal.module.css";

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useId,
} from "react";

import type { ReactNode, RefObject } from "react";
import ReactDOM from "react-dom";

interface ModalContextProps {
  onClose: () => void;
  titleId: string;
  descriptionId: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal components must be used within <Modal>");
  return context;
}

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  initialFocusRef?: RefObject<HTMLElement>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export const Modal: React.FC<ModalRootProps> & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Footer: typeof ModalFooter;
} = ({ isOpen, onClose, children, initialFocusRef, returnFocusRef }) => {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const returnElem = returnFocusRef?.current;

    return () => {
      returnElem?.focus();
    };
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContext.Provider
      value={{ onClose, titleId, descriptionId, initialFocusRef }}
    >
      <div className={styles.root}>{children}</div>
    </ModalContext.Provider>,
    document.body
  );
};

const ModalOverlay: React.FC<{ className?: string }> = () => {
  const { onClose } = useModalContext();
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalContent: React.FC<{ className?: string; children: ReactNode }> = ({
  children,
  // className = "",
}) => {
  const { onClose, titleId, descriptionId, initialFocusRef } =
    useModalContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusable = contentRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = initialFocusRef?.current || focusable?.[0];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && focusable && focusable.length > 0) {
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, initialFocusRef]);

  return (
    <div
      ref={contentRef}
      className={styles.content}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(e) => e.stopPropagation()} // Prevent overlay click
    >
      {children}
    </div>
  );
};

const ModalTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const { titleId } = useModalContext();
  return (
    <h2
      id={titleId}
      className={`modal-title text-xl font-semibold mb-2 ${className}`}
    >
      {children}
    </h2>
  );
};

const ModalDescription: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { descriptionId } = useModalContext();
  return (
    <p
      id={descriptionId}
      className={`modal-description text-sm text-gray-600 ${className}`}
    >
      {children}
    </p>
  );
};

const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`modal-footer mt-4 flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};

// Attach compound components
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
