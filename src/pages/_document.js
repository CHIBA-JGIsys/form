import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import React from 'react'

export default function Document() {
  


  return (
    <Html lang='en'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />

        <link rel='stylesheet' href='/fonts.css' />

        <link
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-TL4G349');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* 2つ目の Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-5L84239');`,
          }}
        />
        {/* End 2つ目の Google Tag Manager */}
        {/* facebookピクセルGTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQV8PPS');`,
          }}
        />
        {/* facebookピクセルGTM*/}
        {/* Google tag (gtag.js) */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=UA-153395004-1'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'UA-153395004-1');
              `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5L84239'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* 2つ目の Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-TL4G349'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End 2つ目の Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-WQV8PPS'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Main />

        <NextScript />
      </body>
    </Html>
  )
}




