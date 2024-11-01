import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';
import styles from '../styles/footer.module.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/newsletter/subscribe', { email });
      if (response.status === 201) {
        setSuccessMessage('You have successfully subscribed!');
        setEmail('');
        setSnackbarOpen(true);
      } else {
        setError('An error occurred while subscribing. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred while subscribing. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.newsletterSection}>
          <p className={styles.newsletterText}>Subscribe to our newsletter</p>
          <div className={styles.inputContainer}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button onClick={handleSubmit} className={styles.newsletterButton}>
              Subscribe
            </button>
          </div>
        </div>
        <div className={styles.footerTextSection}>
          <p className={styles.footerText}>© 2024 - Carbon Trace. All rights reserved.</p>
          <p className={styles.footerText}>Designed with passion.</p>
        </div>
      </div>
      <hr className={styles.greenLine} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {successMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        ) : error ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        ) : null}
      </Snackbar>
    </footer>
  );
};

export default Footer;
