import styles from '../../styles/009/Qa.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../../utils/config'

export default function Qa() {
  const [showContent, setShowContent] = useState({})
  const handleClick = (index) => {
    setShowContent((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }
  const items_Res = [
    {
      q: '無料で参加できますか？',
      a: 'はい。サービスの利用は全て無料です。また、START DASH参加後のirodasSALONの利用も含めて、全て無料で活用することができます。',
    },
    {
      q: '服装に規定はありますか？',
      a: '規定はないので、私服でご参加下さい。',
    },
    {
      q: '開催はオンラインですか？',
      a: 'オンライン（ZOOM）で開催します。予約後に当日の詳細がメールに届きますので、そちらをご覧ください。',
    },
    {
      q: '事前の準備は必要ですか？',
      a: 'ネット環境と視聴用のデバイスの準備をお願いします。',
    },
  ]
  const items_PC = [
    {
      q: '無料で参加できますか？',
      a: 'はい。サービスの利用は全て無料です。また、START DASH参加後のirodasSALONの利用も含めて、全て無料で活用することができます。',
    },
    {
      q: '服装に規定はありますか？',
      a: '規定はないので、私服でご参加下さい。',
    },
    {
      q: '開催はオンラインですか？',
      a: 'オンライン（ZOOM）で開催します。予約後に当日の詳細がメールに届きますので、そちらをご覧ください。',
    },
    {
      q: '事前の準備は必要ですか？',
      a: 'ネット環境と視聴用のデバイスの準備をお願いします。',
    },
  ]
  const [windowWidth, setWindowWidth] = useState(null)
  const items = windowWidth <= 768 ? items_Res : items_PC

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
    <div className={styles.qa}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          <img
            src={url('/img/009qaTtl.png')}
            alt='サービスを利用する前に最後気になるところや不安はありますか？ よくある質問'
          />
        </h3>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li className={styles.itemlist}>
              <div className={styles.accordionWrapper}>
                <div
                  key={index}
                  className={styles.title}
                  onClick={() => handleClick(index)}
                >
                  <span className={styles.mark}>Q</span>
                  <span className={styles.question}>
                    {item.q.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                  <div className={styles.iconWrapper}>
                    <img
                      src={url('/img/qaplus.png')}
                      alt='サービスを利用する前に最後気になるところや不安はありますか？ よくある質問'
                    />
                  </div>
                </div>

                {showContent[index] && (
                  <div className={`${styles.descriptionArea} "show"`}>
                    <div className={styles.answer}>
                      <span className={styles.mark}>A</span>
                      <p>{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
