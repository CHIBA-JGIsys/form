import axios from 'axios'

export async function submitHubspotFormIventSalon(formData, router) {
  console.log(formData)
  const portalId = '20776466'
  const formGuid = '435b73ee-a907-4974-9bef-eeb55ee6a86a'
  const config = {
    headers: {
      'Content-Type': 'application/json', // ここを変更
    },
  }
  switch (formData.year__c) {
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
      name: 'gakkougun',
      value: formData.gakkougun,
    },
    {
      name: 'company',
      value: formData.company,
    },
    {
      name: 'undergraduate__c',
      value: formData.undergraduate__c,
    },
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
      name: 'liberalartsscience__c',
      value: formData.liberalartsscience__c,
    },
    {
      name: 'phone',
      value: formData.phone,
    },
    {
      name: 'email',
      value: formData.email,
    },
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
  console.log(fields)

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
      const redirectTo = `/member/input/student/meetsalon?year__c=${formData.year__c}&liberalartsscience__c=${formData.liberalartsscience__c}` // ここにHubSpotでコピーしたリダイレクトURLを使用しても構いません
      // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
      window.location.href = redirectTo
      // router.push('/thanks')
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





