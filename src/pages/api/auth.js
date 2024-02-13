export default function handler(req, res) {
  const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
  const redirectUri = `http://localhost:3000/${process.env.URL_PREFIX}/api/callback` // 適切なリダイレクトURIを設定すること

  const authUrl =
    `${GOOGLE_AUTH_URL}?` +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/drive.file',
      access_type: 'offline',
    })

  res.redirect(authUrl)
}
