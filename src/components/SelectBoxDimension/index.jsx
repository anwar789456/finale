import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./style.module.scss";
export default function CustomSelect({ titleOptionSelect, optionsDim, onOptionSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onOptionSelect(option);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev + 1) % optionsDim.length);
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => (prev - 1 + optionsDim.length) % optionsDim.length);
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0) {
        handleSelect(optionsDim[focusedIndex]);
      }
    }
  };
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: [1, 0.29, 0, 0.02] } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.3, ease: [1, 0.29, 0, 0.02] } },
  };
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectContainer} ref={dropdownRef}>
        <button onClick={toggleDropdown} className={`${styles.selectButton} ${isOpen ? styles.open : ""}`}>
          {titleOptionSelect}: {selected ? (
            <>
              <span className={styles.dimText}>{selected.longueur}</span>
              <span className={styles.cmText}>cm</span>
              <span className={styles.smallerX}>x</span>
              <span className={styles.dimText}>{selected.largeur}</span>
              <span className={styles.cmText}>cm</span>
            </>
          ) : (
            <>
              <span className={styles.dimText}>{optionsDim[0].longueur}</span>
              <span className={styles.cmText}>cm</span>
              <span className={styles.smallerX}>x</span>
              <span className={styles.dimText}>{optionsDim[0].largeur}</span>
              <span className={styles.cmText}>cm</span>
            </>
          )}
          <span className={styles.arrowIcon}></span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul className={styles.selectList} onKeyDown={handleKeyDown} tabIndex="0"
              initial="hidden" animate="visible" exit="exit" variants={dropdownVariants}>
              {optionsDim.map((option, index) => (
                <li key={`${option.longueur}-${option.largeur}`}
                  className={`${styles.selectItem} ${focusedIndex === index ? styles.focused : ""}`}
                  onClick={() => handleSelect(option)} onMouseEnter={() => setFocusedIndex(index)}>
                  <span className={styles.dimText}>{option.longueur}</span>
                  <span className={styles.cmText}>cm</span>
                  <span className={styles.smallerX}>x</span>
                  <span className={styles.dimText}>{option.largeur}</span>
                  <span className={styles.cmText}>cm</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
