// pages/api/submitForm.js
import axios from 'axios'

export default async (req, res) => {
  if (req.method === 'POST') {
    const googleFormActionURL =
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcAmBS3iO0CJ38kTNt5HAw0O9gtL0x9oHU0tfgvM40_tDqNw/formResponse'

    const formData = new URLSearchParams()
    for (const [key, value] of Object.entries(req.body)) {
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
      res.status(200).json({ message: 'Form submitted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit form' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
