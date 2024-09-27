'use client';
import React, { useState } from 'react';
import styles from '../../styles/faq.module.css';

const FAQ = () => {
  const [faqs] = useState([
    {
      question: "How do I collateralize my virtual assets?",
      answer: "You can collateralize your virtual assets by going to the 'Asset Collateralization' section and entering the asset ID and loan amount."
    },
    {
      question: "What metaverses are supported?",
      answer: "Currently, we support Decentraland, The Sandbox, and Cryptovoxels. More metaverses will be added in future updates."
    },
    {
      question: "Can I rent out my virtual land?",
      answer: "Yes, you can list your virtual land for rent in the Cross-Metaverse Rentals section."
    }
  ]);

  return (
    <section className={styles.faq}>
      <div className="container">
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.question}>{faq.question}</div>
            <div className={styles.answer}>{faq.answer}</div>
          </div>
        ))}
        <button className={styles.button}>Contact Support</button>
      </div>
    </section>
  );
};

export default FAQ;
