import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CreditDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the credit ID from the URL

  const [creditDetails, setCreditDetails] = useState<any>(null); // Replace `any` with a proper type if needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCreditDetails = async () => {
        try {
          const response = await fetch(`http://localhost:4000/carbon-credit/${id}`); // Adjust the API endpoint as necessary
          if (!response.ok) {
            throw new Error('Failed to fetch credit details');
          }
          const data = await response.json();
          console.log(data);
          
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render the credit details
  return (
    <div>
      <h1>{creditDetails.name}</h1>
      <img src={`https://ipfs.io/ipfs/${creditDetails.imageHash}`} alt={creditDetails.name} />
      <p>Owner: {creditDetails.owner}</p>
      <p>Price: {creditDetails.price} ETH</p>
      <p>Description: {creditDetails.description}</p>
      {/* Add any other details or components you want */}
    </div>
  );
};

export default CreditDetailPage;
