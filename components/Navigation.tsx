import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/marketplace">Marketplace</Link></li>
        <li><Link href="/collateralization">Collateralization</Link></li>
        <li><Link href="/rentals">Rentals</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/faq">Help & FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
