import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Fv from '../components/Fv'
import EmbeddedEfPc from '../components/EmbeddedEfPc'
import CatchArea from '../components/CatchArea'
import ContentsArea from '../components/ContentsArea'
import Adviser from '../components/Adviser'
import Satisfaction from '../components/Satisfaction'
import Twitterarea from '../components/Twitterarea'
import Step from '../components/Step'
import Cv from '../components/Cv'
import Qa from '../components/Qa'
import Vision from '../components/Vision'
import Footer from '../components/Footer'
import CatchAreaResponsive from '../components/CatchAreaResponsive'
import Cvres from '../components/Cvres'
import FormCv from '../components/FormCv'

import { url } from '../utils/config'

export default function Home() {
  return (
    <>
      <Head>
        <meta property='og:title' content='irodasSALON（イロダスサロン）' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://irodas.com/' />
        <meta property='og:image' content={url('/img/res_fvbg.png')} />
        <meta property='og:site_name' content='irodasSALON（イロダスサロン）' />
        <meta
          property='og:description'
          content='irodasSALON（イロダスサロン）の学生様向けページです。irodasSALON（イロダスサロン）は、講座・教材・面談で理想のキャリアを描く完全無料の就活サービスです。全国500大学以上・年間15,000名以上の就活生が利用しています。'
        />
        <meta property='og:locale' content='ja_JP' />
        <title>irodasSALON（イロダスサロン）</title>
        <meta name='title' content='irodasSALON（イロダスサロン）' />
        <meta
          name='description'
          content='irodasSALON（イロダスサロン）は、講座・教材・面談で理想のキャリアを描く完全無料のキャリアスクール。全国500大学以上・年間15,000名以上の就活生が利用しています。'
        />
        <meta
          name='Keywords'
          content='就活,24卒.irodas,irodasSALON,イロダス,イロダスサロン,自己分析,就活コミュニティ,キャリアスクール,就活セミナー,就活面談,就活メンター'
        />
        <link
          href='https://irodas.com/corporate/wp-content/themes/idodaswp/images/favicon.ico'
          rel='icon'
        />
      </Head>
      <header className={styles.header}>
        <img src={url('/img/irodasLoge.png')} alt='irodasLoge' />
      </header>
      <main className={styles.main}>
        <div className={styles.topContents}>
          <div className={styles.efarea}>
            <EmbeddedEfPc />
          </div>
          <div className={styles.contentsArea}>
            <Fv />
            <CatchArea />
            <CatchAreaResponsive />
            <ContentsArea section={<Adviser />} />
            <Cvres />
            <Satisfaction />
            <Twitterarea />
            <Step />
            <Cv />
            <FormCv />
            <Qa />
            <Vision />
            <Cvres />
            <footer className={styles.footer}>
              <Footer />
            </footer>
          </div>
        </div>
      </main>
    </>
  )
}
