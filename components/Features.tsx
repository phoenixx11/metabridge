import React from 'react';
import styles from '../styles/Features.module.css';

const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.title}>Key Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Cross-Metaverse Trades</h3>
            <p>Trade digital assets across various metaverses securely and efficiently.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Asset Collateralization</h3>
            <p>Use your digital assets as collateral for real-world goods and services.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Virtual Rentals</h3>
            <p>Rent your virtual spaces for real-world events and generate income.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>AR Extensions</h3>
            <p>Bring your metaverse properties to life through Augmented Reality.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
