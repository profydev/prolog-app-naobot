import styles from "./loading-icon.module.scss";

export function LoadingIcon() {
  const iconSrc = "/icons/loading-circle.svg";

  return (
    <div>
      <img className={styles.icon} src={iconSrc} alt={`loading icon`} />
    </div>
  );
}
