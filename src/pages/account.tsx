import { useAccount } from 'wagmi'; // Assuming you're using wagmi for wallet connection
import { useEffect, useState } from 'react';
import * as blockies from 'ethereum-blockies'; // Optional: for generating the avatar
import CreditsGrid from '../components/creditGrid'; // Import your CreditsGrid component
import axios from 'axios';

export const AccountPage = () => {
    const { address } = useAccount(); // Get the connected wallet address
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
    });
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (address) {
            const icon = blockies.create({
                seed: address.toLowerCase(),
                size: 8,
                scale: 16,
            }).toDataURL();
            setAvatarUrl(icon);

            // Fetch or create user information based on wallet address
            axios.get(`http://localhost:4000/users/user/${address}`)
                .then(response => setUserInfo(prev => ({ ...prev, ...response.data })))
                .catch(() => setMessage("Failed to load or create user information."));
        }
    }, [address]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:4000/users/user/${address}`, userInfo);
            setMessage("Profile updated successfully.");
        } catch (error) {
            setMessage("An error occurred while updating your profile.");
        }
    };

    if (!address) {
        return <p>No wallet connected</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt="Wallet Avatar"
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        marginBottom: '20px',
                    }}
                />
            )}
            <p style={{ fontSize: '18px', wordBreak: 'break-word' }}>{address}</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <input type="text" name="name" value={userInfo.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} placeholder="Phone" />
                <input type="text" name="address" value={userInfo.address} onChange={handleChange} placeholder="Address" />
                <input type="text" name="city" value={userInfo.city} onChange={handleChange} placeholder="City" />
                <input type="text" name="postcode" value={userInfo.postcode} onChange={handleChange} placeholder="PostCode" />
                <button type="submit">Update Profile</button>
            </form>

            {message && <p>{message}</p>}

            <div style={{ width: '100%' }}>
                <CreditsGrid address={address} />
            </div>
        </div>
    );
};

export default AccountPage;