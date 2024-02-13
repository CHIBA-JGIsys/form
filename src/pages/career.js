
import Head from 'next/head'
import FormComponentsMain3 from '@/components/FormComponentsMain3'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router' // 追加
import styles from '@/styles/ServiceCss/ServiceFormHome.module.css'
import { url } from '@/utils/config'

export default function Home() {
  const [width, setWidth] = useState(0)
  const [storedFormData, setStoredFormData] = useState(null) // ここを追加

  const router = useRouter() // 追加
  const os_date_24 = router.query.os_date_24 || '' // これを追加
  useEffect(() => {
    setWidth(window.innerWidth)
    const formData = JSON.parse(sessionStorage.getItem('formData'))
    setStoredFormData(formData)
    console.log(formData) // これを追加
  }, [])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
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
            <FormComponentsMain3
              initialStep={2}
              initialOsdate={os_date_24}
              storedFormData={storedFormData}
            />
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
      {/* 変更 */}
    </>
  )
}
