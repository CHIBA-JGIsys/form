import styles from '../../styles/009/EmbeddedEfPcL.module.css'
import { url } from '../../utils/config'

export default function EmbeddedEfPcL() {
  return (
    <section className={styles.embeddedEfPc}>
      <div className={styles.circles}>
        <div className={styles.circle1}>
          <img src={url('/img/emmbedPCL_circle1.png')} alt='circle' />
        </div>
        <div className={styles.circle2}>
          <img src={url('/img/emmbedPCL_circle2.png')} alt='circle' />
        </div>
        <div className={styles.circle3}>
          <img src={url('/img/emmbedPCL_circle3.png')} alt='circle' />
        </div>
      </div>
      <h2 className={styles.title}>
        <img src={url('/img/emmbedTop.png')} alt='emmbedTop' />
      </h2>
      <div className={styles.cvButton}>
        <a href='#CVForm'>
          <img src={url('/img/emmbedLButton.png')} alt='cvButton' />
        </a>
      </div>
      <p className={`${styles.text} ${styles.small}`}>
        <span>※サービスは全て無料です</span>
      </p>
    </section>
  )
}
