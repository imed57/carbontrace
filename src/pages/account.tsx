import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import * as blockies from 'ethereum-blockies';
import axios from 'axios';
import UserDialog from '../components/userDialog';
import CreditCarousel from '../components/creditCarousel';
import styles from '../styles/account.module.css';
import { useRouter } from 'next/router';

export const AccountPage = () => {
    const { address } = useAccount();
    const router = useRouter();

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
        profilePicture: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (address) {
            const icon = blockies.create({
                seed: address.toLowerCase(),
                size: 8,
                scale: 16,
            }).toDataURL();
            setAvatarUrl(icon);

            axios.get(`http://localhost:4000/users/user/${address}`)
                .then(response => {
                    setUserInfo(prev => ({ ...prev, ...response.data }));
                })
                .catch(() => setMessage("Failed to load or create user information."));
        }
    }, [address]);

    const handleUpdateUserInfo = async (formData: FormData) => {
        try {
            const response = await axios.put(`http://localhost:4000/users/user/${address}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUserInfo(prev => ({ ...prev, ...response.data }));
            setMessage("Profile updated successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("An error occurred while updating your profile.");
            if(error.response.data.error) setMessage(error.response.data.error);
        }
    };

    const handleSubmit = (userInfo: FormData) => {
        handleUpdateUserInfo(userInfo);
    };

    if(!address) {
        router.push('/home');
    }
    

    return (
        <div className={styles.accountPage}>
            <div className={styles.profileSection}>
                {userInfo.profilePicture ? (
                    <img
                        src={`data:image/jpg;base64,${userInfo.profilePicture}`}
                        alt="Profile Avatar"
                        className={styles.avatar}
                    />
                ) : (
                    avatarUrl && (
                        <img
                            src={avatarUrl}
                            alt="Wallet Avatar"
                            className={styles.avatar}
                        />
                    )
                )}
                <div className={styles.userInfo}>
                    <p className={styles.address}>{address}</p>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Phone:</strong> {userInfo.phone}</p>
                    <p><strong>City:</strong> {userInfo.city}</p>
                    <p><strong>Postcode:</strong> {userInfo.postcode}</p>
                    <button className={styles.modifyButton} onClick={() => setOpenDialog(true)}>
                        Modify Infos
                    </button>
                </div>
            </div>

            <UserDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleSubmit}
                userInfo={userInfo}
            />

            {message && <p className={styles.message}>{message}</p>}

            <div className={styles.carouselSection}>
                <h3>Credits Listed for Sale</h3>
                <CreditCarousel address={address} forSale={true} />
            </div>

            <div className={styles.carouselSection}>
                <h3>Credits Purchased</h3>
                <CreditCarousel address={address} forSale={false} />
            </div>
        </div>
    );
};

export default AccountPage;
