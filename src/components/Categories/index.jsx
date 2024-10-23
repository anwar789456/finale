import Image from 'next/image';
import React from 'react';
import styles from './style.module.scss';

import Magnetic from '../../common/Magnetic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../Effects/Variants';

const categories = [
  { src: '/images/Laurus-00.jpg', alt: 'Laurus', title: 'Dining tables' },
  { src: '/images/Alexandra-01.jpg', alt: 'Alexandra', title: 'Bed Sheets' },
  { src: '/images/René-00.jpg', alt: 'René', title: 'Bedroom Pillows' },
  { src: '/images/Léo-01.jpg', alt: 'Léo', title: 'Dining tables' },
  { src: '/images/Valéria-10.png', alt: 'Valéria', title: 'Dining tables' },
  { src: '/images/Témas-11.png', alt: 'Témas', title: 'Dining tables' }
];

export default function Categories() {
  return (
    <div className={styles.container}>
      <div className={styles.grid_container}>
      
        {categories.map((category, index) => (
          <div key={index} className={styles.category_container}>
            <div className={styles.Image_div}>
              <motion.div
                variants={fadeIn('', 0.3)}
                initial='hidden'
                whileInView='show'
                viewport={{ once:true, amount: 0.1 }}
                className={styles.categoryImage}
              >
                <Image
                  src={category.src}
                  alt={category.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
            <Link href='/Shop'>
              <div className={styles.title_container}>
                <h1 className={styles.title_h1_text}>{category.title}</h1>
                <div className={styles.button}>
                  <Magnetic>
                    <p>View More</p>
                  </Magnetic>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
