import styles from '../styles/ContentsArea.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function ContentsArea(props) {
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
        <div className={styles.logoArea}>
          <div className={styles.area}>
            <img
              src={url('/img/irodasLoge.png')}
              alt='irodasSalon'
              className='logo'
            />
          </div>
        </div>
        <h3 className={styles.title}>
          <img
            src={url('/img/contentsAreaTtl.png')}
            alt='irodasSALON独自のコンテンツで、あなたの就活の悩みをすべて解決！'
            className='logo'
          />
        </h3>
        <p className={styles.contents}>
          <img
            src={imageUrl1}
            alt='徹底した自己分析で自分”だけ”の魅力が分かる まずは初回カウンセリング面談の45分で、徹底的にあなたにヒアリングします。あなたの過去（小・中・高・大）の印象的な経験を深ぼる中で、あなたが大切にしてる価値観や考え方、自分は当たり前だと思っているけど、本当は強みになる要素などを言語化していきます。自己分析を1人進めるのはどうしても難しいので、irodasSALONではプロの就活アドバイザーが徹底してカウンセリングさせていただきます。'
          />
        </p>
      </div>
      {props.section}
      <div className={styles.contentsArea}>
        <p className={styles.contents}>
          <img
            src={imageUrl2}
            alt='提携先400社の中から あなたに本当に合った企業 だけを厳選して紹介 カウンセリングで見えてきた強みや特徴を元に、本当にマッチした企業を厳選してご紹介しています。弊社が提携してる400社の優良求人の中から、社風や職種・企業理念など、企業選びの上で一番大切にしたい要素を満たすことができる企業に絞ってご紹介させていただきます。'
          />
        </p>
        <p className={styles.contents}>
          <img
            src={imageUrl3}
            alt='プロによる選考対策支援であなたの魅力が伝わる 専属のキャリアアドバイザーが、あなたの強みや特徴、選考中企業に合わせて1社ずつ選考対策を行なっています。あなた”らしさ”をしっかり伝えられるように対策することはもちろん、選考中企業の人事が何を求めているのか？どういった内容を伝えると効果的なのか？という企業側の事情も全て伝えています。'
          />
        </p>
      </div>
    </>
  )
}
