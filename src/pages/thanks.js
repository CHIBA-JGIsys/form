import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { url } from '../utils/config'

import styles from '../styles/009/Thanks.module.css'



const IventThanksPage = () => {
  // useAcsTrack()
useEffect(() => {
  function acsTrack() {
    var PV = 'ph5opwgpkgy1'
    var KEYS = {
      cid: ['CL_', 'ACT_', 'cid_auth_get_type'],
      plid: ['PL_', 'APT_', 'plid_auth_get_type'],
    }
    var turl = 'https://j-a-x-affiliate.net/track.php?p=' + PV
    var cks = document.cookie.split('; ').reduce(function (ret, s) {
      var kv = s.split('=')
      if (kv[0] && kv[1]) ret[kv[0]] = kv[1]
      return ret
    }, [])
    turl = Object.keys(KEYS).reduce(function (url, k) {
      var vk = KEYS[k][0] + PV
      var tk = KEYS[k][1] + PV
      var v = '',
        t = ''
      if (cks[vk]) {
        v = cks[vk]
        if (cks[tk]) t = cks[tk]
      } else if (localStorage.getItem(vk)) {
        v = localStorage.getItem(vk)
        t = 'ls'
      }
      if (v) url += '&' + k + '=' + v
      if (t) url += '&' + KEYS[k][2] + '=' + t
      return url
    }, turl)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', turl)
    xhr.send()
  }

  acsTrack()
}, [])
  return (
    <>
      <Head>
        <meta
          name='facebook-domain-verification'
          content='7xges39tlqiz4wkccjl6z2qjadz69l'
        />
      </Head>
      <div className={styles.thankscontainer}>
        <header className={styles.header}>
          <img src={url('/img/irodasLoge.png')} alt='irodasLoge' />
        </header>

        <section className={styles.thankssec}>
          <div className={styles.text}>
            <h3 className={styles.mainTxt}>
              <img src={url('/img/iventThanksTop.png')} alt='iventThanksTop' />
            </h3>
            <p className={styles.subTxt}>
              <a href='https://lhco.li/45y674C'>
                <img src={url('/img/iventthankscv.png')} alt='iventThanksTop' />
              </a>
            </p>
          </div>
        </section>
        <p className={styles.bottom}>
          <img src={url('/img/irodasLoge.png')} alt='iventThanksTop' />
        </p>
      </div>
      <Script src='//www.medipartner.jp/js/medipartner_click.js' />
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function acsTrack(){
var PV = "ph4iz7s9jy44";
var KEYS = {cid : ["CL_", "ACT_", "cid_auth_get_type"], plid : ["PL_", "APT_", "plid_auth_get_type"]};
var turl = "https://j-a-x-affiliate.net/track.php?p=" + PV;
var cks = document.cookie.split("; ").reduce(function(ret, s){ var kv = s.split("="); if(kv[0] && kv[1]) ret[kv[0]] = kv[1]; return ret; }, []);
turl = Object.keys(KEYS).reduce(function(url, k){ var vk = KEYS[k][0] + PV; var tk = KEYS[k][1] + PV; var v = "", t = ""; if(cks[vk]){ v = cks[vk]; if(cks[tk]) t = cks[tk]; }else if(localStorage.getItem(vk)){ v = localStorage.getItem(vk); t = "ls"; } if(v) url += "&" + k + "=" + v; if(t) url += "&" + KEYS[k][2] + "=" + t; return url; }, turl);
var xhr = new XMLHttpRequest(); xhr.open("GET", turl); xhr.send(); })();
              `,
        }}
      />
    </>
  )
}

export default IventThanksPage
