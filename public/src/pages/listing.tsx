import React, { useState, useRef } from 'react';
import { useSigner } from 'wagmi';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import styles from '../styles/listing.module.css';
import { Contract } from 'ethers';
import ABi from '../config/abis/marketplace.json';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

const CONTRACT_ADDRESS = "0x8596ba23b902dba62fe566eb9278658a82590a54";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListCreditForm = () => {
  const { address } = useAccount();
  const router = useRouter();

  const { data: signer } = useSigner();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageFile: null,
  });
  const [fileName, setFileName] = useState<string>(''); // New state for file name
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');
  
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });

    if (name === 'imageFile' && files) {
      setFileName(files[0].name); // Update file name
    }
  };

  const uploadImageToIPFS = async () => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const formData = new FormData();
    formData.append("file", form.imageFile);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "pinata_api_key": "fb273b9e7b0c09a872c1",
          "pinata_secret_api_key": "1543c8c797a29787da3cc7f4303d1a918c0741597828e98d7cbf1406776a50d8",
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Pinata upload error:", error);
      setSnackbarMessage("Failed to upload image to IPFS");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) {
      setSnackbarMessage("No wallet connected or signer unavailable.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const { name, price, description } = form;

    try {
      setLoading(true);
      setSnackbarMessage("Uploading image to IPFS...");
      setSnackbarSeverity("info");
      setOpenSnackbar(true);

      const imageHash = await uploadImageToIPFS();

      setSnackbarMessage("Listing carbon credit...");
      const contract = new Contract(CONTRACT_ADDRESS, ABi, signer);

      const tx = await contract.listCarbonCredit(name, price, description, imageHash);
      await tx.wait();

      setSnackbarMessage("Carbon credit listed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setForm({ name: '', price: '', description: '', imageFile: null });
      setFileName(''); // Reset file name after submission
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
    } catch (err) {
      console.error(err);
      setSnackbarMessage("An error occurred while listing the carbon credit.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if(!address) {
    router.push('/home');
  }

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
            <label htmlFor="imageFile" className={styles.labelProfile}>Image File (IPFS)</label>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              ref={fileInputRef} // Assign ref to input
              onChange={handleChange}
              className={styles.inputuploadButton}
            />
            <label htmlFor="imageFile" className={styles.uploadButton}>Choose File</label>
            {fileName && <span className={styles.fileName}>{fileName}</span>} {/* Display selected file name */}
          </div>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Pending Listing...' : 'List the Credit'}
          </button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
