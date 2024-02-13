import Head from 'next/head'
import FormComponentsTechMain from '@/components/FormComponentsTechMain'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router' // 追加
import { url } from '@/utils/config'
import styles from '@/styles/ServiceCss/ServiceFormHomeTech.module.css'

export default function Home() {
  const [width, setWidth] = useState(0)
  const router = useRouter() // 追加
  const os_date_24 = router.query.year__c || '' // これを追加
  useEffect(() => {
    const script = document.createElement('script')
    script.textContent = `
      (function acsTrack(){
        var PV = "phjngaai52q3";
        var KEYS = {cid : ["CL_", "ACT_", "cid_auth_get_type"], plid : ["PL_", "APT_", "plid_auth_get_type"]};
        var turl = "https://j-a-x-affiliate.net/track.php?p=" + PV;
        var cks = document.cookie.split("; ").reduce(function(ret, s){ var kv = s.split("="); if(kv[0] && kv[1]) ret[kv[0]] = kv[1]; return ret; }, []);
        turl = Object.keys(KEYS).reduce(function(url, k){ var vk = KEYS[k][0] + PV; var tk = KEYS[k][1] + PV; var v = "", t = ""; if(cks[vk]){ v = cks[vk]; if(cks[tk]) t = cks[tk]; }else if(localStorage.getItem(vk)){ v = localStorage.getItem(vk); t = "ls"; } if(v) url += "&" + k + "=" + v; if(t) url += "&" + KEYS[k][2] + "=" + t; return url; }, turl);
        var xhr = new XMLHttpRequest(); xhr.open("GET", turl); xhr.send(); })();
    `
    document.body.appendChild(script)
  }, [])
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
                <img src={url('/img/techlogo.png')} alt='' />
              </div>
              <div className={styles.formHome__headercontent2}>
                <img src={url('/img/formHomeHeader2.png')} alt='' />
              </div>
            </div>
          </div>
          <div className={styles.formHome__body}>
            <FormComponentsTechMain
              initialStep={3}
              initialOsdate={os_date_24}
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
    </>
  )
}
