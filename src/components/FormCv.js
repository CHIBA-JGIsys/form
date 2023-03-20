import styles from '../styles/FormCv.module.css'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const formIds = {
  rt: 'b9cbc9cf-4ffc-4d01-8b54-328f6dfa753c',
  ja: '64fbe55a-80d6-40c4-ace6-4ab1129d70a2',
  pt: '7271bcf4-01ce-4475-85ed-003bcaeec74e',
  op: 'bf526918-1461-4bba-8e8a-61ec797a7964',
  ast: '0202e1d7-1805-414a-b064-06725e6c8bc1',
}

export default function FormCv() {
  const router = useRouter()

  useEffect(() => {
    const path = router.pathname.split('/')[1] // Get the first path segment
   const formId = formIds[path]
   console.log(path)

    if (formId) {
      const script = document.createElement('script')
      script.src = '//js.hsforms.net/forms/embed/v2.js'
      script.async = true
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: 'na1',
            portalId: '20776466',
            formId: formId,
            target: '#hubspotForm',
            onFormSubmit: function () {
              // リダイレクト先URLを設定
              const redirectTo = `https://irodas.com/2024/ad/${path}/thanks.php`
              // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
              window.location.href = redirectTo
            },
          })
        }
      }
      document.body.appendChild(script)
    }
  }, [router.pathname])

  return (
    <>
      <div className={styles.div}>
        <div id='hubspotForm'></div>
      </div>
    </>
  )
}
