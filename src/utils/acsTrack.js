import { useEffect } from 'react'

const PV = 'ph4iz7s9jy44'
const KEYS = {
  cid: ['CL_', 'ACT_', 'cid_auth_get_type'],
  plid: ['PL_', 'APT_', 'plid_auth_get_type'],
}

function useAcsTrack() {
  useEffect(() => {
    const turl = `https://j-a-x-affiliate.net/track.php?p=${PV}`

    const cks = document.cookie.split('; ').reduce((ret, s) => {
      const kv = s.split('=')
      if (kv[0] && kv[1]) ret[kv[0]] = kv[1]
      return ret
    }, [])

    const trackUrl = Object.keys(KEYS).reduce((url, k) => {
      const vk = KEYS[k][0] + PV
      const tk = KEYS[k][1] + PV
      let v = '',
        t = ''
      if (cks[vk]) {
        v = cks[vk]
        if (cks[tk]) t = cks[tk]
      } else if (localStorage.getItem(vk)) {
        v = localStorage.getItem(vk)
        t = 'ls'
      }
      if (v) url += `&${k}=${v}`
      if (t) url += `&${KEYS[k][2]}=${t}`
      return url
    }, turl)

    const xhr = new XMLHttpRequest()
    xhr.open('GET', trackUrl)
    xhr.send()
  }, [])
}

export default useAcsTrack
