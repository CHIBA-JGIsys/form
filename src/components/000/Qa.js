import styles from '../../styles/Qa.module.css'
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
      q: '本当に無料ですか？',
      a: 'はい。全て無料です。就活講座・就活教材の利用やプロの就活アドバイザーとの1on1面談、企業のご紹介も全て無料で行っています。さらに、全160ページの就活教材は書籍版にて無料でご自宅に郵送もしています。（部数に限りがあり先着順）',
    },
    {
      q: '紹介される企業は\n全て受けないといけないですか？',
      a: '受けなくて問題ございません。自分が受けたいと思った企業のみ選考に進んでいただいております。',
    },
    {
      q: '就活アドバイザーと\nどのように連絡をとりますか？',
      a: '電話・ラインにて連絡を取ることができます。',
    },
    {
      q: '既に内定がありますが\nそれでも利用して良いですか？',
      a: 'もちろん大丈夫です。内定後も少し迷うことや不安もあると思いますので、そういった部分も含めて相談してください。プロのキャリアアドバイザーが支援させていただきます。',
    },
  ]
  const items_PC = [
    {
      q: '本当に無料ですか？',
      a: 'はい。全て無料です。就活講座・就活教材の利用やプロの就活アドバイザーとの1on1面談、企業のご紹介も全て無料で行っています。さらに、全160ページの就活教材は書籍版にて無料でご自宅に郵送もしています。（部数に限りがあり先着順）',
    },
    {
      q: '紹介される企業は全て受けないといけないですか？',
      a: '受けなくて問題ございません。自分が受けたいと思った企業のみ選考に進んでいただいております。',
    },
    {
      q: '就活アドバイザーとどのように連絡をとりますか？',
      a: '電話・ラインにて連絡を取ることができます。',
    },
    {
      q: '既に内定がありますがそれでも利用して良いですか？',
      a: 'もちろん大丈夫です。内定後も少し迷うことや不安もあると思いますので、そういった部分も含めて相談してください。プロのキャリアアドバイザーが支援させていただきます。',
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
            src={url('/img/qaTtl.png')}
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
