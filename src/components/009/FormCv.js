import styles from '../../styles/FormCv.module.css'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const formIds = {
  '000': '4ae1f7f1-c681-46af-a367-0caee59e189a',
  '9999': '4ae1f7f1-c681-46af-a367-0caee59e189a',
  pt: '7271bcf4-01ce-4475-85ed-003bcaeec74e',
  op: 'bf526918-1461-4bba-8e8a-61ec797a7964',
  ast: '0202e1d7-1805-414a-b064-06725e6c8bc1',
}

export default function FormCv() {
  const router = useRouter()

  useEffect(() => {
    const path = router.pathname.split('/')[1] // Get the first path segment
    const formId = formIds[path]

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
            sfdcCampaignId: "7012j0000000uJJAAY",
            onFormSubmitted: function () {
              // リダイレクト先URLを設定
              const redirectTo = `/lp/2024/thanks` // ここにHubSpotでコピーしたリダイレクトURLを使用しても構いません
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
