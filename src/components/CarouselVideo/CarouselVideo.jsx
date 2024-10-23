import React from 'react'
import styles from './page.module.scss'

export default function CarouselVideo() {
  return (
    <>
      <div className={styles.video_container}>
        {<div className={styles.blacksreen}></div>
        }
        <video
            src="/videos/video4.mov"
            autoPlay
            muted
            loop
            className={styles.video}
        />
        </div>  
    </>
  )
}