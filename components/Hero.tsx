import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}>Bridge Your Metaverse Assets Into Reality</h1>
        <p className={styles.subtitle}>
          Convert your virtual assets into real-world financial utility.
        </p>
        <button className={styles.cta}>Start Bridging Your Assets</button>
      </div>
    </section>
  );
};

export default Hero;
