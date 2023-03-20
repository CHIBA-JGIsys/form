import '@/styles/globals.css'
import '../styles/slick-custom.css' // カスタムCSSファイルをインポート

export default function App({ Component, pageProps }) {
  return (
    <div className='app-wrapper'>
      <Component {...pageProps} />
    </div>
  )
}
