import styles from "./Spinner.module.css";

interface SpinnerProps {
  size: "tiny" | "small" | "medium" | "large";
}

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div
      className={`${styles.loader} ${styles[size]}`}
      aria-hidden="true"
    ></div>
  );
};
