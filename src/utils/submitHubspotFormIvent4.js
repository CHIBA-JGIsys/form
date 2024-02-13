import axios from 'axios'

export async function submitGoogleform4(data) {
  const googleFormActionURL =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcAmBS3iO0CJ38kTNt5HAw0O9gtL0x9oHU0tfgvM40_tDqNw/formResponse'

  const formData = new URLSearchParams()
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }

  try {
    const response = await axios.post(
      googleFormActionURL,
      formData.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    console.log('Form submitted successfully')
  } catch (error) {
    console.error('Failed to submit form:', error)
  }
}

export async function submitHubspotFormIvent4(formData, router) {
  const urlParams = new URLSearchParams(window.location.search)
  const param1 = urlParams.get('dai_marketing')
  const param2 = urlParams.get('chu_marketing')
  const param3 = urlParams.get('end_chanel_syo')
  const param4 = urlParams.get('lp_type_saisyu')

  const fields = [
    { name: 'lastname', value: formData.lastname },
    { name: 'firstname', value: formData.firstname },
    { name: 'furigana_sei__c', value: formData.furigana_sei__c },
    { name: 'furigana_mei__c', value: formData.furigana_mei__c },
    { name: 'phone', value: formData.phone },
    { name: 'email', value: formData.email },
    {
      name: 'birth',
      value: `${formData.birth_year}/${formData.birth_month}/${formData.birth_day}`,
    },
    { name: 'companyname', value: formData.companyname },
    { name: 'gyoukai', value: formData.gyoukai },
    { name: 'syokusyu', value: formData.syokusyu },
    { name: 'kyojyuuchi', value: formData.kyojyuuchi },
    { name: 'jiki', value: formData.jiki },
    { name: 'nensyu', value: formData.nensyu },
  ]

  if (param1) fields.push({ name: 'dai_marketing', value: param1 })
  if (param2) fields.push({ name: 'chu_marketing', value: param2 })
  if (param3) fields.push({ name: 'end_chanel_syo', value: param3 })
  if (param4) fields.push({ name: 'lp_type_saisyu', value: param4 })

  const requestData = {}
  fields.forEach((field) => {
    const entryId = {
      lastname: 'entry.1220246756',
      firstname: 'entry.839727699',
      furigana_sei__c: 'entry.236081041',
      furigana_mei__c: 'entry.598418410',
      phone: 'entry.678911816',
      email: 'entry.709973950',
      birth: 'entry.322774193',
      gyoukai: 'entry.2041815038',
      syokusyu: 'entry.1953598362',
      kyojyuuchi: 'entry.63362748',
      jiki: 'entry.1482776473',
      nensyu: 'entry.1775568217',
      dai_marketing: 'entry.534791958',
      chu_marketing: 'entry.1862801713',
      end_chanel_syo: 'entry.744848830',
      lp_type_saisyu: 'entry.1299456431',
      lp_type_saisyu: 'entry.1299456431',
      companyname: 'entry.1322313600',
    }[field.name]
    requestData[entryId] = field.value
  })
  try {
    console.log(requestData)
    await submitGoogleform4(requestData)

    // await axios.post('/member/input/api/submitFormcareerlp', requestData)
    console.log('Form submitted successfully')
    const redirectTo = `/member/input/career2/thanks` // ここにHubSpotでコピーしたリダイレクトURLを使用しても構いません
    // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
    window.location.href = redirectTo
  } catch (error) {
    console.error('Failed to submit form:', error)
  }
}
