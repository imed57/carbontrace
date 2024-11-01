import React from 'react';
import Link from 'next/link';
import styles from '../styles/carbonCard.module.css';

type CardProps = {
  id: string;
  owner: string;
  name: string;
  price: string;
  description: string;
  imageHash: string;
  isForSale: boolean;
};

const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const NFTCard: React.FC<CardProps> = ({ id, owner, name, price, imageHash }) => {
  return (
    <Link href={`/credits/${id}`} passHref>
      <div className={styles.creditCard} style={{ cursor: 'pointer' }}> {/* Make the card clickable */}
      <div className={styles.image}>
          <img 
            src={`https://tomato-reasonable-magpie-593.mypinata.cloud/ipfs/${imageHash}`} 
            alt={name} 
            className={styles.image} 
            onError={(e) => {
              // Fallback in case the image fails to load
              e.currentTarget.src = "/credit.jpg";
            }}
          />
        </div>
        <div className={styles.details}>
          <h3>{name}</h3>
          <p>Owner: {shortenAddress(owner)}</p>
          <p>Price: {price} ETH</p>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
