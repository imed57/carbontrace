import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/CreditDetailPage.module.css';

const CreditDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [creditDetails, setCreditDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCreditDetails = async () => {
        try {
          const response = await fetch(`http://localhost:4000/carbon-credit/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch credit details');
          }
          const data = await response.json();
          setCreditDetails(data);
          setLoading(false);
        } catch (err) {
          setError((err as Error).message);
          setLoading(false);
        }
      };

      fetchCreditDetails();
    }
  }, [id]);

  const handlePurchase = async () => {
    try {
      const response = await fetch(`http://localhost:4000/carbon-credit/${id}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buyerId: 'currentUserId' }),
      });

      if (!response.ok) {
        throw new Error('Purchase failed');
      }

      const updatedData = await response.json();
      setCreditDetails(updatedData);
      alert('Achat réussi !');
    } catch (err) {
      alert('Erreur lors de l\'achat.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageSection}>
        <img 
          src={`https://tomato-reasonable-magpie-593.mypinata.cloud/ipfs/${creditDetails?.imageHash}`} 
          alt={creditDetails?.name} 
          className={styles.image} 
          onError={(e) => {
            e.currentTarget.src = "/credit.jpg"; // Fallback image
          }}
        />
      </div>
      <div className={styles.infoSection}>
        <p className={styles.owner}>Owner: {creditDetails?.owner}</p>
        <p className={styles.price}>Price: {creditDetails?.price} ETH</p>
        <p className={styles.description}>Description: {creditDetails?.description}</p>
        {creditDetails?.isForSale && (
          <button className={styles.buyButton} onClick={handlePurchase}>
            Acheter
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditDetailPage;
