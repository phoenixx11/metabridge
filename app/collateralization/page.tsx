'use client';
import React from 'react';
import styles from '../../styles/collateralization.module.css';

const Collateralization = () => {
  return (
    <section className={styles.collateralization}>
      <div className="container">
        <h2 className={styles.title}>Asset Collateralization</h2>
        <form className={styles.form}>
          <input type="text" placeholder="Enter Asset ID" className={styles.input} />
          <input type="number" placeholder="Loan Amount" className={styles.input} />
          {/* Apply the button class from the CSS module */}
          <button className={styles.button}>Collateralize Now</button>
        </form>
      </div>
    </section>
  );
};

export default Collateralization;
