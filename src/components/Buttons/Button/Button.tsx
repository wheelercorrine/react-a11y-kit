import type { RefObject } from "react";
import styles from "./Button.module.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement | null>;
  variant?: "primary" | "secondary" | "destructive" | "disabled";
  className?: string;
}

/*
 *  TODO:
 *  Add loading state
 */

export const Button: React.FC<ButtonProps> = ({
  ref,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      disabled={variant === "disabled"}
      ref={ref}
      className={className ? className : styles[variant]}
      {...props}
    >
      {props.children}
    </button>
  );
};
