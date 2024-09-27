'use client';
import React from 'react';
import styles from '../../styles/marketplace.module.css';

const Marketplace = () => {
  return (
    <section className={styles.marketplace}>
      <div className="container">
        <h2 className={styles.title}>Marketplace</h2>
        <div className={styles.grid}>
          {/* Repeat grid items for assets */}
          <div className={styles.card}>
            <h3>Decentraland Land</h3>
            <p>Value: 10 ETH</p>
            {/* Apply the button class from the CSS module */}
            <button className={styles.button}>Trade</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
