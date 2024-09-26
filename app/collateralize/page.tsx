import { FC, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Collateralize.module.css';

const Collateralize: FC = () => {
  const [nftId, setNftId] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');

  const handleCollateralize = () => {
    // Add logic to interact with smart contracts here
    alert(`Collateralizing NFT ID: ${nftId} for Loan: ${loanAmount}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Collateralize Your NFTs</h1>
        <p>Stake your metaverse NFTs to get a real-world loan.</p>

        <div className={styles.form}>
          <label>NFT ID:</label>
          <input
            type="text"
            value={nftId}
            onChange={(e) => setNftId(e.target.value)}
            placeholder="Enter NFT ID"
          />
          <label>Loan Amount:</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter Loan Amount"
          />
          <button onClick={handleCollateralize} className={styles.button}>
            Collateralize
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collateralize;
