import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useId,
} from "react";

import type { ReactNode, KeyboardEvent } from "react";

import styles from "./Combobox.module.css";

type ComboboxContextType = {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  selectOption: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listboxId: string;
  options: string[];
  filteredOptions: string[];
  setFilteredOptions: (o: string[]) => void;
  selectedValue: string;
  setSelectedValue: (val: string) => void;
};

const ComboboxContext = createContext<ComboboxContextType | null>(null);
function useComboboxContext() {
  const ctx = useContext(ComboboxContext);
  if (!ctx)
    throw new Error("Combobox components must be used inside <Combobox.Root>");
  return ctx;
}

interface ComboboxRootProps {
  options: string[];
  children: ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Combobox: React.FC<ComboboxRootProps> & {
  Input: typeof ComboboxInput;
  Listbox: typeof ComboboxListbox;
  Option: typeof ComboboxOption;
} = ({ options, children, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [selectedValue, setSelectedValue] = useState("");

  const listboxId = useId();

  const selectOption = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    inputRef.current?.focus();
    if (onChange) onChange(value);
  };

  return (
    <ComboboxContext.Provider
      value={{
        isOpen,
        setIsOpen,
        activeIndex,
        setActiveIndex,
        selectOption,
        inputRef,
        listboxId,
        options,
        filteredOptions,
        setFilteredOptions,
        selectedValue,
        setSelectedValue,
      }}
    >
      <div className={styles.combobox}>{children}</div>
    </ComboboxContext.Provider>
  );
};

const ComboboxInput: React.FC<{ className?: string }> = () => {
  const {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    selectOption,
    inputRef,
    listboxId,
    options,
    filteredOptions,
    setFilteredOptions,
    selectedValue,
    setSelectedValue,
  } = useComboboxContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    const newOptions = options.filter((opt) =>
      opt.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(newOptions);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      setIsOpen(true);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, filteredOptions.length - 1)
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex !== null) {
        selectOption(filteredOptions[activeIndex]);
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setActiveIndex(null);
      setIsOpen(false);
    }
  };

  return (
    <input
      ref={inputRef}
      className={styles.input}
      type="text"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={filteredOptions.length > 0}
      aria-controls={listboxId}
      aria-activedescendant={
        filteredOptions.length > 0 ? `option-${listboxId}-0` : undefined
      }
      value={selectedValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      aria-haspopup="listbox"
      autoComplete="off"
    />
  );
};

const ComboboxListbox: React.FC<{ className?: string }> = () => {
  const { isOpen, listboxId, filteredOptions } = useComboboxContext();

  if (filteredOptions.length === 0) return null;

  return (
    <ul
      tabIndex={0}
      id={listboxId}
      role="listbox"
      className={`${styles.listbox} ${isOpen ? styles.open : ""}`}
    >
      {filteredOptions.map((option, i) => (
        <ComboboxOption key={option} index={i} value={option} />
      ))}
    </ul>
  );
};

const ComboboxOption: React.FC<{
  index: number;
  value: string;
  className?: string;
}> = ({ index, value }) => {
  const { activeIndex, setActiveIndex, selectOption, listboxId } =
    useComboboxContext();

  const isActive = activeIndex === index;

  return (
    <li
      tabIndex={0}
      id={`option-${listboxId}-${index}`}
      role="option"
      aria-selected={isActive}
      className={styles.option}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => selectOption(value)}
      onKeyDown={(e: KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          selectOption(value);
        }
      }}
    >
      {value}
    </li>
  );
};

// Attach subcomponents
Combobox.Input = ComboboxInput;
Combobox.Listbox = ComboboxListbox;
Combobox.Option = ComboboxOption;
