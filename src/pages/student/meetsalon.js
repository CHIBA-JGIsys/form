import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import stylesHome from '@/styles/Home.module.css'
import { url } from '@/utils/config'
import stylesService from '@/styles/ServiceCss/ServiceFormHomeSalon.module.css'

import styles from '@/styles/ThanksSalon.module.css'
import Footer from '@/components/000/Footer'

import useAcsTrack from '@/utils/acsTrack'

const ThanksPage = () => {
  // useAcsTrack()
  const [iframeUrl, setIframeUrl] = useState('')
  const [iframeDimensions, setIframeDimensions] = useState({
    width: '867px',
    height: '700px',
  })
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
    }
    return false
  }
  const [isClient, setIsClient] = useState(false)
  const meetingsContainer = useRef(null)

  useEffect(() => {
    setIsClient(true)
    if (meetingsContainer.current) {
      const meetingsScript = document.createElement('script')
      meetingsScript.src =
        'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
      meetingsScript.async = true
      document.body.appendChild(meetingsScript)
    }
  }, [])
  useEffect(() => {
    if (isMobile()) {
      setIframeDimensions({ width: '300px', height: '422px' })
    }
    const urlParams = new URLSearchParams(window.location.search)
    const year = urlParams.get('year__c')
    const liberalartsscience = urlParams.get('liberalartsscience__c')

    if (year === '24年3月' && liberalartsscience === '文系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    } else if (year === '25年3月' && liberalartsscience === '文系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    } else if (year === '26年3月' && liberalartsscience === '文系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    } else if (year === '24年3月' && liberalartsscience === '理系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    } else if (year === '25年3月' && liberalartsscience === '理系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    } else if (year === '26年3月' && liberalartsscience === '理系') {
      setIframeUrl(
        'https://meetings.hubspot.com/irodassalon/all25se202305?embed=true'
      )
    }
    // 他の条件を必要に応じて追加することができます
  }, [])

  return (
    <>
      <Head>
        <meta
          name='facebook-domain-verification'
          content='7xges39tlqiz4wkccjl6z2qjadz69l'
        />
      </Head>
      <div className={stylesService.formHome}>
        <div className={stylesService.formHome__inner}>
          <div className={stylesService.formHome__header}>
            <div className={stylesService.formHome__headerinner}>
              <div className={stylesService.formHome__headercontent1}>
                <img src={url('/img/salonlogo.png')} alt='' />
              </div>
              <div className={stylesService.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <section className={styles.thankssecver2}>
            <div className={styles.ttl}>
              <h1>初回カウンセリング面談のご予約</h1>
            </div>
            {/* iframeのwidth100%を作成して */}
            <div className={styles.tahnkscontainer}>
              <div className={styles.text1}>
              サービスのご登録ありがとうございました
              </div>
              <div className={styles.text2}>
                カウンセリングの日時についてこちらからご予約お願いいたします。
              </div>
              <div className={styles.text3}>
                カウンセリングの日時について
                <br />
                こちらからご予約お願いいたします。
              </div>
              <div
                ref={meetingsContainer}
                className='meetings-iframe-container'
                data-src={iframeUrl}
              />
              <div className={styles.thanksinfo}>
                <div className={styles.txt1}>●お知らせ</div>
                <div className={styles.txt2}>
                  運営事務局より、ご予約状況について確認のお電話を差し上げる場合がございます。
                  <br />
                  また、登録完了後の内容をメールでお送りしています。そちらもご確認ください。
                </div>
              </div>
            </div>
          </section>
          <div className={stylesService.formHome__footer}>
            <div className={stylesService.formHome__footercontent1}>
              <a href='https://privacymark.jp/'>
                <img src={url('/img/formHomeFooter.png')} alt='' />
              </a>
            </div>
            <div className={stylesService.formHome__footercontent2}>
              <a href='https://privacymark.jp/'>
                <img src={url('/img/formHomeFooterSP.png')} alt='' />
              </a>
            </div>
          </div>
          <footer className={stylesHome.footer}>
            <Footer />
            <Script src='//www.medipartner.jp/js/medipartner_click.js' />
          </footer>
        </div>
      </div>
    </>
  )
}

export default ThanksPage

