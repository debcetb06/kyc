import { kycContractAddress } from '../config.js' // contract address
import KycAbi from '../build/contracts/Kyc.json' // ABI
import { ethers } from 'ethers'

export const  initializeProvider = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
       return new ethers.Contract(
                   kycContractAddress,
                   KycAbi.abi,
                   signer,
  );
}