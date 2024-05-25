// components/Header.js
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>PhotoClean</div>
      <nav className={styles.nav}>
        <button className={styles.navButton}>About</button>
        <button className={styles.navButton}>PhotoClean</button>
      </nav>
    </header>
  );
};

export default Header;