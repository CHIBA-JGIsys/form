import styles from '../styles/EmbeddedEfPc.module.css'
import { url } from '../utils/config'

export default function EmbeddedEfPc() {
  return (
    <section className={styles.embeddedEfPc}>
      <h2 className={styles.title}>
        <img src={url('/img/irodasLoge.png')} alt='logo' />
      </h2>
      <p className={styles.text}>
        プロの就活アドバイザーが
        <br />
        あなたの課題を特定し
        <br />
        内定まで一気に進める45分
      </p>
      <div className={styles.cvButton}>
        <a href='#CVForm'>
          <img src={url('/img/cvButton.png')} alt='cvButton' />
        </a>
      </div>
      <p className={`${styles.text} ${styles.small}`}>
        ※サービスは全て無料です
      </p>
    </section>
  )
}
