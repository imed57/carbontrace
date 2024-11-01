// contract.ts
import { ethers } from 'ethers';
import contractAbi from './abis/marketplace.json'; // Import your contract ABI

const contractAddress = '0x8596ba23b902dba62fe566eb9278658a82590a54'; // Replace with your contract's address
export const getContractInstance = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // MetaMask provider
    const signer = provider.getSigner(); // Get the user account (signer)
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    console.error('Error creating contract instance:', error);
    throw new Error('Failed to create contract instance');
  }
};