
import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;
  
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `http://localhost:3000/${process.env.URL_PREFIX}/api/callback`,
      grant_type: 'authorization_code',
    });

    const access_token = response.data.access_token;

    // ここでトークンをセッションやCookieに保存することができます。
    // または、フロントエンドにトークンを返すこともできます。

    res.json({ access_token });
  } catch (error) {
    res.status(500).json({ error: 'Token exchange failed' });
  }
}