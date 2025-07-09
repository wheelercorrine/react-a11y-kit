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
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  ref,
  variant = "primary",
  ...props
}) => {
  console.log(variant);
  return (
    <button ref={ref} className={styles.primary} {...props}>
      {children}
    </button>
  );
};
