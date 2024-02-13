import '@/styles/globals.css'
import '../styles/slick-custom.css' // カスタムCSSファイルをインポート
import 'select2/dist/css/select2.min.css'
import '@/styles/select2Custom.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='app-wrapper'>
      <Component {...pageProps} />
    </div>
  )
}
