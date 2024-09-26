import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>MetaBridge</a>
      </Link>
      <div className={styles.links}>
        <Link href="/collateralize">
          <a>Collateralize NFTs</a>
        </Link>
        <Link href="/marketplace">
          <a>Marketplace</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
