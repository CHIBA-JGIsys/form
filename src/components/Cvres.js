import styles from '../styles/Cvres.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../utils/config'

export default function Cvres() {
 return (
   <div className={styles.cv}>
     <p className={styles.cvTxt1}>カウンセリング予約はかんたん30秒♪</p>
     <div className={styles.btn}>
       <a href='#CVForm'>
         <img src={url('/img/cvButton.png')} alt='まずは無料登録' />
       </a>
     </div>
     <p className={styles.cvTxt2}>※サービスは全て無料です</p>
   </div>
 )
}
