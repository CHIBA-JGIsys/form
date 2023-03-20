import styles from '../styles/Vision.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function Vision() {
      const [windowWidth, setWindowWidth] = useState(null)
      const imageUrl1 =
        windowWidth <= 768 ? url('/img/vision_res.png') : url('/img/vision.png')

  
        
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
    <div className={styles.vision}>
      <p className={styles.area}>
        <img
          src={imageUrl1}
          alt='irodasSALONでは、丁寧なカウンセリングで本当にマッチした求人のみに厳選して紹介し、「ここで働きたい！」と本音で思える会社と出逢い、納得できる就活を支援しています。今始めれば、優良企業の内定に手が届きます。共に頑張っていきましょう！'
        />
      </p>
    </div>
  )
}
