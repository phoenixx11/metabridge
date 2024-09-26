import { FC, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Marketplace.module.css';

const Marketplace: FC = () => {
  const [nfts, setNfts] = useState([
    { id: 1, name: 'Metaverse Land #123', price: '3.5 ETH' },
    { id: 2, name: 'Rare Sword of Valor', price: '1.2 ETH' },
    { id: 3, name: 'Virtual Art Piece', price: '2.1 ETH' },
  ]);

  const handleBuy = (nftId: number) => {
    // Add logic for purchasing the NFT here
    alert(`Buying NFT ID: ${nftId}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Metaverse Marketplace</h1>
        <p>Trade and buy NFTs across multiple metaverses.</p>

        <div className={styles.nftList}>
          {nfts.map((nft) => (
            <div key={nft.id} className={styles.nftCard}>
              <h3>{nft.name}</h3>
              <p>Price: {nft.price}</p>
              <button onClick={() => handleBuy(nft.id)} className={styles.button}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
