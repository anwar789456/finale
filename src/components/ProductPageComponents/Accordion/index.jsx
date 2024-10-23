import { useState } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { accordionData } from './data';
import { perspective, slideIn, contentVariants } from "./anim";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.body}>
        {accordionData.map((item, i) => {
          const { title, content } = item;
          const isActive = activeIndex === i;

          return (
            <div key={`b_${i}`} className={styles.itemContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit">
                <div 
                  className={styles.title}
                  onClick={() => handleToggle(i)}
                >
                  {title}
                  <button onClick={() => handleToggle(i)}>
                    {isActive ? '-' : '+'}
                  </button>
                </div>
              </motion.div>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className={styles.content}
                  >
                    <p>{content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
