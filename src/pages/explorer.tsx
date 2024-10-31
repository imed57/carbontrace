import React, { useEffect, useState } from 'react';
import CarbonCard from '../components/carbonCard';
import styles from '../styles/explorer.module.css'

type NFTData = {
  id: string;
  owner: string;
  name: string;
  price: string;
  description: string;
  imageHash: string;
  isForSale: boolean;
};

const ITEMS_PER_PAGE = 6;

const ExplorerPage: React.FC = () => {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch('http://localhost:4000/carbon-credit/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNftData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const totalPages = Math.ceil(nftData.length / ITEMS_PER_PAGE);
  const displayedData = nftData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.topSection}>
        <h1 className={styles.heading}>Explore Carbon Credits</h1>
        <p className={styles.subheading}>Discover and trade carbon credits to help offset emissions and contribute to a greener future.</p>
      </section>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>Loading...</div>
        </div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.nftGridContainer}>
            {displayedData.map((credit) => (
              <CarbonCard key={credit.id} {...credit} />
            ))}
          </div>
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button className={styles.buttons} onClick={() => goToPage(currentPage - 1)}>
                Previous
              </button>
            )}
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <button className={styles.buttons} onClick={() => goToPage(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorerPage;
