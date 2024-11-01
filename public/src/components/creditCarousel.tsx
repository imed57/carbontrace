// components/creditCarousel.tsx
import { useState, useEffect } from 'react';
import Card from './carbonCard'; // Import your existing card component
import styles from '../styles/creditCarousel.module.css'; // Import the CSS Module for styles

const CreditCarousel = ({ address, forSale }: { address: string; forSale: boolean }) => {
    const [credits, setCredits] = useState<any[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of displayed credits
    const itemsToShow = 4; // Number of credits to display at once

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await fetch(`http://localhost:4000/carbon-credit/owner/${address}`);
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    // Filter credits based on whether we want to show for sale or owned
                    const filteredCredits = data.filter((credit: any) => credit.isForSale === forSale);
                    setCredits(filteredCredits); // Only set if data is an array
                } else {
                    setCredits([]); // If data is not an array, set to empty array
                }
            } catch (err) {
                setError('Failed to fetch credits');
            } finally {
                setLoading(false);
            }
        };

        if (address) {
            fetchCredits();
        }
    }, [address, forSale]); // Add forSale to the dependency array

    if (loading) {
        return <p>Loading credits...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Navigate to the next set of credits
    const nextCredits = () => {
        if (currentIndex + itemsToShow < credits.length) {
            setCurrentIndex(currentIndex + itemsToShow);
        }
    };

    // Navigate to the previous set of credits
    const prevCredits = () => {
        if (currentIndex - itemsToShow >= 0) {
            setCurrentIndex(currentIndex - itemsToShow);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            {credits.length > 0 ? (
                <>
                    <button
                        onClick={prevCredits}
                        className={`${styles.arrow} ${styles.leftArrow} ${currentIndex === 0 ? styles.disabled : ''}`}
                        disabled={currentIndex === 0}
                    >
                        ❮
                    </button>
                    
                    <div className={styles.creditsWrapper}>
                        <div className={styles.creditsGrid}>
                            {credits.slice(currentIndex, currentIndex + itemsToShow).map((credit) => (
                                <Card
                                    key={credit.id}
                                    id={credit.id}
                                    owner={credit.owner}
                                    name={credit.name}
                                    price={credit.price}
                                    description={credit.description}
                                    imageHash={credit.imageHash}
                                    isForSale={credit.isForSale}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <button
                        onClick={nextCredits}
                        className={`${styles.arrow} ${styles.rightArrow} ${currentIndex + itemsToShow >= credits.length ? styles.disabled : ''}`}
                        disabled={currentIndex + itemsToShow >= credits.length}
                    >
                        ❯
                    </button>
                </>
            ) : (
                <p>No carbon credits available for this address.</p>
            )}
        </div>
    );
};

export default CreditCarousel;
