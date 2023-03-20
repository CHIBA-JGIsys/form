import styles from '../styles/CatchArea.module.css'
import { url } from '../utils/config'

export default function CatchArea() {
 return (
   <div className={styles.catchArea}>
     <h3 className={styles.title}>
       irodasSALONは
       <br />
       <span>「納得できる内定が欲しい人」</span>
       <br />
       に選ばれている就活エージェントです
     </h3>
     <p className={styles.companyDir}>
       <img
         src={url('/img/catchArea_img.png')}
         alt='すでに1万名以上の24卒生が、独自のコンテンツを活用し優良企業への内定を実現しています'
       />
     </p>
     <p className={styles.problem}>
       <img
         src={url('/img/problem.png')}
         alt='就活も本格シーズンに入ったのに納得できる企業の内定がもらえる気がしないと思っていませんか？'
       />
     </p>
   </div>
 )
}
