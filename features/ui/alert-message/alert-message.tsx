import React from "react";
import styles from "./alert-message.module.scss";
import { AlertIcon } from "./alert-icon";
import classNames from "classnames";
import { QueryObserverResult } from "@tanstack/react-query";

type AlertMessageProps = {
  children: React.ReactNode;
  actionText?: string;
  action?: () => Promise<QueryObserverResult>;
  iconSrc: string;
};

export function AlertMessage({
  children,
  actionText,
  action,
  iconSrc,
}: AlertMessageProps) {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.alertItem, styles.alertMessageText)}>
        <div>
          <AlertIcon iconSrc={iconSrc} />
        </div>
        <div>{children}</div>
      </div>
      {actionText && action && (
        <div
          className={classNames(styles.alertItem, styles.alertAction)}
          onClick={() => action()}
        >
          <div>{actionText}</div>
          <div>
            <img
              className={styles.icon}
              src="/icons/alert-arrow-right.svg"
              alt={`try again icon`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
