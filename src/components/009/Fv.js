import styles from '../../styles/009/Fv.module.css'
import React from 'react'
import { url } from '../../utils/config'

export default function Fv() {
  return (
    <>
      <div className={styles.mainVisual}>
        <div className={styles.mainVisualImg}>
          <img src={url('/img/009fvbgimg.png')} alt='mainVisualImg' />
        </div>
        <div className={styles.mainVisualImg2}>
          <img src={url('/img/009Fvbatch.png')} alt='mainVisualImg2' />
        </div>
      </div>
      <div className={styles.embeddedCta}>
        <div className={styles.embeddedCtaInner}>
          <div className={styles.embeddedCtaInnerTopTxt}>
            共に協力し合える25卒の仲間とも出会える
          </div>
          <div className={styles.embeddedCtaInnerBottomTxt}>
            <a href='#CVForm'>
              <img src={url('/img/emmbedLButton.png')} alt='emmbedLButton' />
            </a>
          </div>
          <div className={styles.embeddedCtaInnerBottomTxt2}>
            ※サービスは全て無料です
          </div>
        </div>
      </div>
    </>
  )
}

