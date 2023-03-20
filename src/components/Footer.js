import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.footercontents}>
      <div className={styles.inner}>
        <ul className={styles.linkList}>
          <li className={styles.item}>
            <a href='https://irodas.com/corporate/company/'>運営会社</a>
          </li>
          <li className={styles.item}>
            <a href='https://irodas.com/privacyHQ/'>プライバシーポリシー</a>
          </li>
        </ul>
        <p>© 2023 irodas,INC.</p>
      </div>
    </div>
  )
}
