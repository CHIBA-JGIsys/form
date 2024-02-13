import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import stylesHome from '@/styles/Home.module.css'
import { url } from '@/utils/config'

import styles from '@/styles/Thanks.module.css'
import Footer from '@/components/000/Footer'
import stylesService from '@/styles/ServiceCss/ServiceFormHome.module.css'

import useAcsTrack from '@/utils/acsTrack'

const ThanksPage2024 = () => {
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
                <img src={url('/img/formHomeHeader1.png')} alt='' />
              </div>
              <div className={stylesService.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <section className={styles.thankssecver2}>
            <div className={styles.ttl}>
              <h1>カウンセリング日程予約完了</h1>
            </div>
            {/* iframeのwidth100%を作成して */}
            <div className={styles.tahnkscontainer}>
              <div className={styles.text1}>
                カウンセリング面談のご予約ありがとうございました
              </div>
              <div className={styles.thanksinfo}>
                <div className={styles.txt1}>●お知らせ</div>
                <div className={styles.txt2}>
                  運営事務局より、ご予約状況について確認のお電話を差し上げる場合がございます。
                  <br />
                  また、登録完了後の内容をメールでお送りしています。そちらもご確認ください。
                </div>
              </div>
              <div className={styles.front}>
                <img
                  className={styles.imgPC}
                  src={url('/img/thankspageline2024front.png')}
                  alt=''
                />
                <img
                  className={styles.imgMov}
                  src={url('/img/thankspageline2024frontmov.png')}
                  alt=''
                />
              </div>
              <div className={styles.button}>
                <a href='https://works.do/R/ti/p/irodassalon.marketing24@irodascoltd'>
                  <img
                    className={styles.imgPC}
                    src={url('/img/thankspageline2024button.png')}
                    alt=''
                  />
                  <img
                    className={styles.imgMov}
                    src={url('/img/thankspageline2024buttonmov.png')}
                    alt=''
                  />
                </a>
              </div>
            </div>
          </section>
          <footer className={stylesHome.footer}>
            <Footer />
            <Script src='//www.medipartner.jp/js/medipartner_click.js' />
          </footer>
        </div>
      </div>
    </>
  )
}

export default ThanksPage2024
