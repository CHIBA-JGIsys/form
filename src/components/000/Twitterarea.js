import styles from '../../styles/Twitterarea.module.css'
import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { url } from '../../utils/config'

export default function Twitterarea() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  const settings_res = {
    dots: true,
    centerMode: true,
    centerPadding: '-100px',
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  const images = [
    url('/img/tweet01.png'),
    url('/img/tweet02.png'),
    url('/img/tweet03.png'),
    url('/img/tweet04.png'),
  ]
  const [windowWidth, setWindowWidth] = useState(null)
  const settingmain = windowWidth <= 768 ? settings_res : settings

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  return (
    <>
      <div className={styles.twitterarea}>
        <h3 className={styles.title}>
          <img
            src={url('/img/twitterareaTtl.png')}
            alt='初回カウンセリングであなたの就活が一気に前に進みます'
          />
        </h3>
      </div>
      <Slider {...settingmain}>
        {images.map((image) => (
          <div key={image}>
            <img src={image} alt='Slide' />
          </div>
        ))}
      </Slider>
    </>
  )
}
