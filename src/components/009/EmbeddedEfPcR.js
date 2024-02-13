import styles from '../../styles/009/EmbeddedEfPcR.module.css'
import { url } from '../../utils/config'

export default function EmbeddedEfPcL() {
  return (
    <section className={styles.embeddedEfPc}>
      <div className={styles.circles}>
        <div className={styles.circle1}>
          <img src={url('/img/emmbedPCR_circle1.png')} alt='circle' />
        </div>
        <div className={styles.circle2}>
          <img src={url('/img/emmbedPCR_circle2.png')} alt='circle' />
        </div>
        <div className={styles.circle3}>
          <img src={url('/img/emmbedPCR_circle3.png')} alt='circle' />
        </div>
      </div>
    </section>
  )
}
