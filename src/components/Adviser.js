import styles from '../styles/Adviser.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function Adviser() {
  const [windowWidth, setWindowWidth] = useState(null)
  const imageUrl1 =
    windowWidth <= 768 ? url('/img/adviser01_res.png') : url('/img/adviser01.png')
  const imageUrl2 =
    windowWidth <= 768 ?  url('/img/adviser02_res.png') :  url('/img/adviser02.png')


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
   <div className={styles.adviser}>
     <div className={styles.inner}>
       <h3 className={styles.title}>
         <img src={url('/img/adviserTtl.png')} alt='プロの就活アドバイザー紹介' />
       </h3>
       <p className={styles.adviserimg}>
         <img
           src={imageUrl1}
           alt='キャリアアドバイザー 松下 彩佳 #元人事 不動産業界のベンチャー企業で人事を経験した後、「より多くの人のキャリアを支援したい」という想いを実現するためにirodasSALONのキャリアアドバイザーに。就活生向けYoutubeメディア「しゅんダイアリー」にも出演。'
         />
       </p>
       <p className={styles.adviserimg}>
         <img
           src={imageUrl2}
           alt='キャリアアドバイザー 木村 駿佑 #元教育業界 新卒で教育系企業に入社。県責任者として営業・採用・マーケティングに従事。その後、関わる人の人生において「やりたいこと」を見つけて支援する仕事がしたいと思い、現在irodasSALONでキャリアアドバイザーとして活動中。'
         />
       </p>
     </div>
   </div>
 )
}
