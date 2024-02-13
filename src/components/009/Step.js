import styles from '../../styles/009/Step.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../../utils/config'

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
      <img src={url('/img/009step.png')} alt='まずは無料登録' />
    </div>
  )
}
