import styles from '../styles/CatchAreaResponsive.module.css'
import { url } from '../utils/config'

export default function CatchAreaResponsive() {
  return (
    <div className={styles.catchAreares}>
      <div className={styles.logo}>
        <img src={url('/img/irodasLoge.png')} alt='' />
      </div>
      <h3 className={styles.title}>
        irodasSALONは
        <br />
        <span>「納得できる内定が欲しい人」</span>
        <br />
        に選ばれている就活エージェントです
      </h3>
      <p className={styles.companyDir}>
        <img
          src={url('/img/catchAreares_img.png')}
          alt='マネーフォワードなどの企業'
        />
      </p>
      <p className={styles.desc}>
        すでに10,000名以上の24卒生が、
        <br />
        独自のコンテンツを活用し
        <br />
        <span>優良企業</span>
        への内定を実現しています
      </p>
      <div className={styles.cv}>
        <p className={styles.cvTxt1}>カウンセリング予約はかんたん30秒♪</p>
        <div className={styles.btn}>
          <a href='#CVForm'>
            <img src={url('/img/cvButton.png')} alt='まずは無料登録' />
          </a>
        </div>
        <p className={styles.cvTxt2}>※サービスは全て無料です</p>
      </div>
      <p className={styles.problem}>
        <img
          src={url('/img/problemRes.png')}
          alt='就活も本格シーズンに入ったのに納得できる企業の内定がもらえる気がしないと思っていませんか？'
        />
      </p>
    </div>
  )
}
