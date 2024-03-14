import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonIconStyle {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  iconSrc?: string;
  iconStyle?: ButtonIconStyle;
}

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  iconSrc,
  iconStyle = ButtonIconStyle.none,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[iconStyle],
        props.className,
      )}
    >
      <span>{children}</span>
      {iconSrc && iconStyle !== ButtonIconStyle.none && (
        <img src={iconSrc} className={styles[iconStyle]} alt="button icon" />
      )}
    </button>
  );
}
