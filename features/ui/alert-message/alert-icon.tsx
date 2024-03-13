import React from "react";
import styles from "./alert-message.module.scss";

type AlertIconProps = {
  iconSrc: string;
};

export function AlertIcon({ iconSrc }: AlertIconProps) {
  return <img className={styles.icon} src={iconSrc} alt={`error icon`} />;
}
