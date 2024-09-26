import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to MetaBridge</h1>
        <p className={styles.description}>
          Your gateway to bridging metaverse assets with real-world financial opportunities.
        </p>

        <div className={styles.buttons}>
          <Link href="/collateralize" legacyBehavior>
            <a className={styles.button}>Collateralize NFTs</a>
          </Link>
          <Link href="/marketplace" legacyBehavior>
            <a className={styles.button}>Browse Marketplace</a>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
