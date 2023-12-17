import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/dlzams" target="_blank">
        Github
      </a>
      <a href="https://www.linkedin.com/in/mhmd-abdl-azzam/">LinkedIn</a>
    </div>
  );
}
