import { FC } from 'react';
import styles from '../styles/Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 MetaBridge. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
