import styles from '../styles/Fv.module.css'
import React from 'react'
import { url } from '../utils/config'

export default function Fv() {
  return (
    <>
      <div className={styles.mainVisual}>
        <div className={styles.inner}>
          <h1 className={styles.mvTitle}>
            <span className={styles.sub}>最短2週間で</span>
            <span className={styles.main}>
              <span className={styles.highlight}>優良企業</span>の
              <span className={styles.highlight}>内定</span>
            </span>
            <span className={styles.sub}>を目指せる</span>
          </h1>
        </div>
      </div>
      <div className={styles.embeddedCta}>
        <div className={styles.heading}>
          <img
            src={url('/img/res_ctaheading.png')}
            alt='4月中にまずはまずは1社内定が欲しいあなたへ'
          />
        </div>
        <p className={styles.text}>
          <span>プロの就活アドバイザー</span>が
          <br />
          あなたの課題を特定し内定まで一気に進める45分
        </p>
        <div className={styles.cv}>
          <a href='#CVForm'>
            <img src={url('/img/cvButton.png')} alt='まずは無料登録' />
          </a>
        </div>
        <p className={styles.textsm}>※サービスは全て無料です</p>
      </div>
    </>
  )
}
