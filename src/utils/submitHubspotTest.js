
import axios from 'axios'

export async function submitHubspotTest(formData, router) {
  console.log(formData)

  const fields = [
    { name: 'testfile', value: formData.testfile },

  ]

  const requestData = {}
  fields.forEach((field) => {
    const entryId = {
      testfile: 'entry.2111965643',
    }[field.name]
    requestData[entryId] = field.value
  })
  try {
    console.log(requestData)
    await axios.post('/member/input/api/submitFormtest', requestData)
    console.log('Form submitted successfully')
    // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
    window.location.href = redirectTo
  } catch (error) {
    console.error('Failed to submit form:', error)
  }
}

