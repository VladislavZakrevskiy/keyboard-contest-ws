import { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

export const Button = ({
  children,
  style,
  ...buttonProps
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={styles.button} style={style} {...buttonProps}>
      {children}
    </button>
  );
};
