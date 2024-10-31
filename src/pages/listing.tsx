import React, { useState } from 'react';
import { useSigner } from 'wagmi';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import styles from '../styles/listing.module.css';
import { Contract } from 'ethers';
import ABi from '../config/abis/marketplace.json';

// Smart contract address
const CONTRACT_ADDRESS = "0x8596ba23b902dba62fe566eb9278658a82590a54";

// Alert component for Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListCreditForm = () => {
  const { data: signer } = useSigner(); // Get the signer from wagmi
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageHash: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) {
      setError('No wallet connected or signer unavailable.');
      setSnackbarMessage('No wallet connected or signer unavailable.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const { name, price, description, imageHash } = form;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Show loading snackbar
      setSnackbarMessage('Listing carbon credit...');
      setSnackbarSeverity('info');
      setOpenSnackbar(true);

      // Connect to the contract
      const contract = new Contract(CONTRACT_ADDRESS, ABi, signer)

      // Call the listCarbonCredit function
      const tx = await contract.listCarbonCredit(name, price, description, imageHash);
      await tx.wait(); // Wait for the transaction to be mined

      setSuccess('Carbon credit listed successfully!');
      setSnackbarMessage('Carbon credit listed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setForm({ name: '', price: '', description: '', imageHash: '' });
    } catch (err) {
      console.error(err);
      setError('An error occurred while listing the carbon credit.');
      setSnackbarMessage('An error occurred while listing the carbon credit.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <h2 className={styles.title}>Carbon Credit Listing</h2>

        <form onSubmit={handleSubmit} className={styles.creditForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name of the credit</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price (in ETH)</label>
            <input
              type="text"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageHash">Image Hash (IPFS)</label>
            <input
              type="text"
              id="imageHash"
              name="imageHash"
              value={form.imageHash}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Pending Listing...' : 'List the Credit'}
          </button>
        </form>

        {/* Snackbar for feedback messages */}
        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Positioning the Snackbar
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ListCreditForm;
