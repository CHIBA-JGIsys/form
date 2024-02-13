import Head from 'next/head'
import FormComponentsMain from '@/components/FormComponentsMain'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router' // 追加
import { url } from '@/utils/config'
import styles from '@/styles/ServiceCss/ServiceFormHome.module.css'

export default function Home() {
  const [width, setWidth] = useState(0)
  const router = useRouter() // 追加
  const os_date_24 = router.query.os_date_24 || '' // これを追加

  useEffect(() => {
    setWidth(window.innerWidth)
    console.log(os_date_24) // これを追加
  }, [])
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      {/* 変更 */}
      <div className={styles.formHome}>
        <div className={styles.formHome__inner}>
          <div className={styles.formHome__header}>
            <div className={styles.formHome__headerinner}>
              <div className={styles.formHome__headercontent1}>
                <img src={url('/img/formHomeHeader1.png')} alt='' />
              </div>
              <div className={styles.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <div className={styles.formHome__body}>
            <FormComponentsMain initialStep={2} initialOsdate={os_date_24} />
          </div>
          <div className={styles.formHome__footer}>
            <div className={styles.formHome__footercontent1}>
              <a href='https://privacymark.jp/'>
              <img src={url('/img/formHomeFooter.png')} alt='' />
              </a>
            </div>
            <div className={styles.formHome__footercontent2}>
            <a href='https://privacymark.jp/'>
              <img src={url('/img/formHomeFooterSP.png')} alt='' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
