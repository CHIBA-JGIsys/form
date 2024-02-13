import styles from '../../styles/009/ContentsArea.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../../utils/config'

export default function ContentsArea() {
  const [windowWidth, setWindowWidth] = useState(null)
  const imageUrl1 =
    windowWidth <= 768 ? url('/img/contents01_res.png') :url('/img/contents01.png')
  const imageUrl2 =
    windowWidth <= 768 ? url('/img/contents02_res.png') : url('/img/contents02.png')
  const imageUrl3 =
    windowWidth <= 768 ? url('/img/contents03_res.png') : url('/img/contents03.png')

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
    <>
      <div className={styles.contentsArea}>
        <h3 className={styles.title}>
          <img
            src={url('/img/009contentsAreaTtl.png')}
            alt='START DASHの3つのポイント'
            className='logo'
          />
        </h3>
        <p className={styles.contents}>
          <img
            src={url('/img/009contents01.png')}
            alt='25卒就活の全体スケジュールが分かる まずは、25卒就活の全体スケジュールをお伝えしています。3年生の春夏〜年末までの時期ごとの企業の採用活動の動きや、インターンシップ・選考の開始タイミングなども細かくお伝えしています。'
          />
        </p>
      </div>
      <div className={styles.contentsArea}>
        <p className={styles.contents}>
          <img
            src={url('/img/009contents02.png')}
            alt='夏からの就活の正しい”動き方”が分かる 自己分析のやり方やいつまでにどこまで進めるべきなのか？や、インターンシップへのエントリーはどのような基準で何社くらいした方が良いのか？など、後悔しない就活を行うためのやるべきことをしっかりお伝えしています。'
          />
        </p>
        <p className={styles.contents}>
          <img
            src={url('/img/009contents03.png')}
            alt='LIVE講座参加後、irodasSALONを利用して納得内定を目指せる START DASHは、就活生向けキャリアスクールを運営しているirodasSALON（イロダスサロン）が開催しています。
START DASH参加後は、irodasSALONの就活講座・就活教材・プロの就活アドバイザーとの1on1面談を活用しながら、年内に優良企業への内定を目指すためにサポートしていきます。'
          />
        </p>
      </div>
    </>
  )
}
