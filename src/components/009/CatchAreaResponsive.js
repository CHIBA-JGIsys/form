import styles from '../../styles/009/CatchAreaResponsive.module.css'
import { url } from '../../utils/config'

export default function CatchAreaResponsive() {
  return (
    <div className={styles.catchAreares}>
      <h3 className={styles.title}>
        内定支援実績の一例
      </h3>
      <p className={styles.companyDir}>
        <img
          src={url('/img/catchAreares_img.png')}
          alt='マネーフォワードなどの企業'
        />
      </p>
    </div>
  )
}
