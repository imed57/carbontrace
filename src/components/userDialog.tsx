import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useState } from 'react';
import styles from '../styles/userDialog.module.css'; // Import the CSS Module

interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (userInfo: FormData) => void;
    userInfo: UserInfo;
}

interface UserInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    profilePicture?: string; // URL or base64 string for the image
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, onSubmit, userInfo: initialUserInfo }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
    const [file, setFile] = useState<File | null>(null); // State for the uploaded file

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]); // Save the file to the state
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        // Add text fields to formData
        Object.entries(userInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Add file to formData
        if (file) {
            formData.append('profilePicture', file);
        }

        onSubmit(formData); // Send formData instead of userInfo
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ className: styles.dialog }}>
            <DialogTitle className={styles.dialogTitle}>Update Profile Information</DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={userInfo.address}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city" className={styles.label}>City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={userInfo.city}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="postcode" className={styles.label}>PostCode</label>
                        <input
                            type="text"
                            name="postcode"
                            id="postcode"
                            value={userInfo.postcode}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="profilePicture" className={styles.labelProfile}>Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={handleFileChange}
                            className={styles.inputuploadButton} // hide this input
                        />
                        <label htmlFor="profilePicture" className={styles.uploadButton}>Choose File</label>
                    </div>

                    <div className={styles.dialogActions}>
                        <button type="button" className={styles.buttonCancel} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.buttonUpdate}>Update Profile</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
