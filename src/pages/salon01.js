import Head from 'next/head'
import FormComponentsSalonMov from '@/components/FormComponentsSalonMov'
import FormComponentsSalonPc from '@/components/FormComponentsSalonPc'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router' // 追加
import { url } from '@/utils/config'
import styles from '@/styles/ServiceCss/ServiceFormHomeSalon.module.css'

export default function Home() {
  const [width, setWidth] = useState(0)
  const router = useRouter() // 追加
  const os_date_24 = router.query.year__c || '' // これを追加
  const [isFormVisible, setFormVisible] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width <= 767) {
      setFormVisible(true)
    } else {
      setFormVisible(false)
    }
  }, [width])
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
                <img src={url('/img/salonlogo.png')} alt='' />
              </div>
              <div className={styles.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <div className={styles.formHome__body}>
            {width <= 767 ?<FormComponentsSalonMov
              initialStep={2}
              initialOsdate={os_date_24}
            /> :<FormComponentsSalonPc />  }

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
