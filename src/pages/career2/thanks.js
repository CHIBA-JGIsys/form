import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import stylesHome from '@/styles/Home.module.css'
import { url } from '@/utils/config'
import stylesService from '@/styles/ServiceCss/ServiceFormHome2.module.css'

import styles from '@/styles/ThanksCareer.module.css'
import Footer from '@/components/000/Footer'

import useAcsTrack from '@/utils/acsTrack'

const ThanksPage = () => {
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
                <img src={url('/img/logoimg.png')} alt='' />
              </div>
              <div className={stylesService.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <section className={styles.thankssecver2}>
            <div className={styles.ttl}>
              <h1>irodasキャリアチェンジ ご登録完了</h1>
            </div>
            {/* iframeのwidth100%を作成して */}
            <div className={styles.tahnkscontainer}>
              <div className={styles.text1}>
                サービスのご登録ありがとうございました
              </div>
              <div className={styles.thanksinfo}>
                <div className={styles.txt1}>●お知らせ</div>
                <div className={styles.txt2}>
                  本日より1-2営業日以内に、コンサルタントよりお電話させていただきます。
                  <br />
                  今後のご案内はコンサルタントが対応いたしますので、もうしばらくお待ちくださいませ。
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
        </div>
      </div>
    </>
  )
}

export default ThanksPage
