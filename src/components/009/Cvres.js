import styles from '../../styles/009/Cvres.module.css'
import React, { useState, useEffect } from 'react'
import { url } from '../../utils/config'

export default function Cvres() {
 return (
   <div className={styles.cv}>
     <p className={styles.cvTxt1}>\共に協力し合える25卒の仲間とも出会える/</p>
     <div className={styles.btn}>
       <a href='#CVForm'>
         <img src={url('/img/emmbedLButton.png')} alt='まずは無料登録' />
       </a>
     </div>
     <p className={styles.cvTxt2}>※サービスは全て無料です</p>
   </div>
 )
}
