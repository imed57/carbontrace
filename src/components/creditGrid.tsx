import { useState, useEffect } from 'react';
import NFTCard from './carbonCard'; // Import your existing card component

const CreditsGrid = ({ address }: { address: string }) => {
    const [credits, setCredits] = useState<any[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await fetch(`http://localhost:4000/carbon-credit/owner/${address}`);
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setCredits(data); // Only set if data is an array
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
    }, [address]);

    if (loading) {
        return <p>Loading credits...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {credits.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {credits.map((credit) => (
                        <NFTCard
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
            ) : (
                <p>No carbon credits available for this address.</p>
            )}
        </div>
    );
};

export default CreditsGrid;
