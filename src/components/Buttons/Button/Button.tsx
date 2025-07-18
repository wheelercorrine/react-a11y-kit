import type { RefObject } from "react";
import styles from "./Button.module.css";
import { Spinner } from "../../Spinner/Spinner";
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement | null>;
  variant?: "primary" | "secondary" | "destructive";
  disabled?: boolean;
  className?: string;
  onClick: () => void;
  isLoading?: boolean;
  loadingText?: string;
}

type TextButton = BaseButtonProps & {
  kind: "text";
  children: React.ReactNode;
  icon?: React.ReactNode;
};

type IconButton = BaseButtonProps & {
  kind: "icon";
  icon: React.ReactNode;
  "aria-label": string;
  children?: never;
};

export type ButtonProps = TextButton | IconButton;

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    isLoading = false,
    loadingText,
    onClick,
    disabled,
    className,
    variant = "primary",
  } = props;

  const handleClick = (/*e: React.MouseEvent*/) => {
    if (isLoading) return;
    onClick();
  };

  const isButtonDisabled = disabled || isLoading;

  if (props.kind === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isButtonDisabled}
        aria-label={isLoading ? loadingText : props["aria-label"]}
        className={className ? className : styles[variant]}
      >
        {isLoading ? <Spinner size="small" /> : props.icon}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={className ? className : styles[variant]}
      aria-label={isLoading ? loadingText : ""}
    >
      {isLoading ? <Spinner size="small" /> : props.children}
    </button>
  );
};
