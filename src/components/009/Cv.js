import styles from '../../styles/Cv.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../../utils/config'


export default function Cv() {
  const [windowWidth, setWindowWidth] = useState(null)
  const imageUrl1 =
    windowWidth <= 768 ? url('/img/cvTtl_res.png') : url('/img/cvTtl.png')

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
      <div className={styles.cvarea}>
        <h3 className={styles.title} id='CVForm'>
          <img
            src={imageUrl1}
            alt='カウンセリング予約はこちらから 登録は簡単30秒♪今始めて、共に優良企業の内定を目指しましょう。'
          />
        </h3>
      </div>
    </>
  )
}

