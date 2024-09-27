'use client';
import React from 'react';
import styles from '../../styles/rentals.module.css';

const Rentals = () => {
  return (
    <section className={styles.rentals}>
      <div className="container">
        <h2 className={styles.title}>Cross-Metaverse Rentals</h2>
        <div className={styles.grid}>
          {/* Repeat grid items for rentals */}
          <div className={styles.card}>
            <h3>Virtual Art Gallery</h3>
            <p>Rent for: 2 ETH / day</p>
            <button className={styles.button}>Rent Now</button>
          </div>
          <div className={styles.card}>
            <h3>Decentraland Land</h3>
            <p>Rent for: 5 ETH / week</p>
            <button className={styles.button}>Rent Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rentals;
