import axios from 'axios'

export async function submitHubspotFormIvent1(formData, router) {
  console.log(formData)
  const portalId = '20776466'
  const formGuid = 'e446aa13-bc92-49a8-8d87-4f13a6c66b8a'
  const config = {
    headers: {
      'Content-Type': 'application/json', // ここを変更
    },
  }
  switch (formData.year__c) {
    case '2024年卒':
      formData.year__c = '24年3月'
      break
    case '2025年卒':
      formData.year__c = '25年3月'
      break
    case '2026年卒':
      formData.year__c = '26年3月'
      break
  }
  const urlParams = new URLSearchParams(window.location.search)
  const param1 = urlParams.get('dai_marketing')
  const param2 = urlParams.get('chu_marketing')
  const param3 = urlParams.get('end_chanel_syo')
  const param4 = urlParams.get('lp_type_saisyu')

  const fields = [
    {
      name: 'year__c',
      value: formData.year__c,
    },
    {
      name: 'lastname',
      value: formData.lastname,
    },
    {
      name: 'firstname',
      value: formData.firstname,
    },
    {
      name: 'furigana_sei__c',
      value: formData.furigana_sei__c,
    },
    {
      name: 'furigana_mei__c',
      value: formData.furigana_mei__c,
    },
    {
      name: 'phone',
      value: formData.phone,
    },
    {
      name: 'email',
      value: formData.email,
    },

    // {
    //   name: 'os_date_24',
    //   value: formData.os_date_24,
    // },
  ]

  if (param1) {
    fields.push({
      name: 'dai_marketing',
      value: param1,
    })
  }
  if (param2) {
    fields.push({
      name: 'chu_marketing',
      value: param2,
    })
  }
  if (param3) {
    fields.push({
      name: 'end_chanel_syo',
      value: param3,
    })
  }
  if (param4) {
    fields.push({
      name: 'lp_type_saisyu',
      value: param4,
    })
  }

  return await axios
    .post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        portalId,
        formGuid,
        fields,
      },
      config
    )
    .then(() => {
      // リダイレクト先URLを設定
      sessionStorage.setItem('formData', JSON.stringify(formData))
      const redirectTo = `/member/input/student` // ここにHubSpotでコピーしたリダイレクトURLを使用しても構いません
      // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
      window.location.href = redirectTo
    })
    .catch((error) => {
      console.error('Request failed:', error.message)

      // エラーレスポンスがある場合、詳細情報をログに出力
      if (error.response) {
        console.error('Status code:', error.response.status)
        console.error('Error data:', error.response.data)
      }
    })
}


