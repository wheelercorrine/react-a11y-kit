import type { RefObject } from "react";
import styles from "./Button.module.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement | null>;
  variant?: "primary" | "secondary";
}

/*
 *  TODO:
 *  Add secondary button
 *  Add disabled state
 *  Add loading state
 *  Add optional class
 */
export const Button: React.FC<ButtonProps> = ({
  ref,
  variant = "primary",
  ...props
}) => {
  return (
    <button ref={ref} className={styles[variant]} {...props}>
      {props.children}
    </button>
  );
};
