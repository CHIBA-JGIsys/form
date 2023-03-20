import styles from '../styles/Satisfaction.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function Satisfaction() {
  const [windowWidth, setWindowWidth] = useState(null)
  const imageUrl1 =
    windowWidth <= 768 ? url('/img/satisfaction_res.png') :url('/img/satisfaction.png')


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
    <div className={styles.satisfaction}>
      <p className={styles.area}>
        <img src={imageUrl1} alt='おかげさまで、サービス利用満足度も95%に' />
      </p>
    </div>
  )
}
