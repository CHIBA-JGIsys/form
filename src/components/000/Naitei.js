import styles from '../../styles/CatchArea.module.css'
import { url } from '../../utils/config'

export default function NaiteiArea() {
  return (
    <div className={styles.catchArea}>
      <p className={styles.problem}>
        <img
          src={url('/img/problem.png')}
          alt='就活も本格シーズンに入ったのに納得できる企業の内定がもらえる気がしないと思っていませんか？'
        />
      </p>
    </div>
  )
}
