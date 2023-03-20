import styles from '../styles/Step.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function Step() {
    const [windowWidth, setWindowWidth] = useState(null)
    const imageUrl1 =
      windowWidth <= 768 ? url('/img/stepTtl_res.png') : url('/img/stepTtl.png')
    const imageUrl2 =
      windowWidth <= 768 ? url('/img/stepmain_res.png') : url('/img/stepmain.png')

    useEffect(() => {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
  return (
    <div className={styles.step}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          <img
            src={imageUrl1}
            alt='カウンセリング登録から納得内定までの流れ 登録から内定獲得まで完全無料※最短2週間で内定実績もあり'
          />
        </h3>
        <div className={styles.main}>
          <img
            src={imageUrl2}
            alt='カウンセリング キャリアドバイザーが専属で支援させていただきます。
初回カウンセリング面談は45分です。マッチした企業紹介 カウンセリングで見出した魅力や軸を元に、弊社提携400社の企業の中から、本当にマッチした企業を厳選してご紹介。選考対策 面接対策、自己PRやガクチカの整理などはもちろん、選考企業の1社１社にあわせた選考対策も行い、二人三脚で選考通過を目指しサポートしていきます。 面接 対策準備を徹底した上で、面接に臨みます。面接日の日程調整なども対応させていただきます。内定 面接を経て、納得できる企業の内定を目指します。
最短2週間で内定を獲得する実績もあります。'
          />
        </div>
      </div>
    </div>
  )
}
