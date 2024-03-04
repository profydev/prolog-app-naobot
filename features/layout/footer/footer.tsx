import getConfig from "next/config";
import styles from "./footer.module.scss";
import classNames from "classnames";

const footerItems = [
  {
    text: "Docs",
    href: "#",
  },
  {
    text: "API",
    href: "#",
  },
  {
    text: "Help",
    href: "#",
  },
  {
    text: "Community",
    href: "#",
  },
];

const { publicRuntimeConfig } = getConfig();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerArea}>
        <ul className={styles.navList}>
          {footerItems.map((footerItem, index) => (
            <li key={index} className={styles.navItem}>
              <a href={footerItem.href} className={styles.navAnchor}>
                {footerItem.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footerArea}>
        <img src="/icons/logo-small.svg" alt="logo" className={styles.logo} />
      </div>
      <div className={classNames(styles.versionText, styles.footerArea)}>
        Version: {publicRuntimeConfig.version}
      </div>
    </footer>
  );
}
