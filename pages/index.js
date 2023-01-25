import { useState } from 'react';
import KYC from '../components/KYC';
import { kycContractAddress, networkChainId } from '../config.js' // contract address
import KycAbi from '../build/contracts/Kyc.json' // ABI
import { ethers } from 'ethers'
import Login from '../components/login';
import KycList from '../components//kycList';


export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [contractOwner, setContractOwner] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);


  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      if (chainId !== networkChainId) {
        alert('You are not connected to the desired Network!')
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
      await isContractOwner(accounts[0]);
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  // Get user KYC detail from the contract
  const isContractOwner = async (address) => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const kycContract = new ethers.Contract(
                   kycContractAddress,
                   KycAbi.abi,
                   signer,
                 );
        const isContractOwner = await kycContract.isContractOwner(address);
        if(isContractOwner){
          setContractOwner(true);
        }
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='bg-[#ffff] h-screen w-screen flex justify-center'>
      {!isUserLoggedIn ? (<Login connectWallet={connectWallet} />) : !contractOwner ? (<KYC address={currentAccount}/>) : <KycList />}
    </div>
  )
}


const ConnectWalletButton = ({ connectWallet }) =>
  <button
    className='h-[5rem] text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
    onClick={connectWallet}
  >
    Connect Wallet
  </button>

const WrongNetworkMessage = () => <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
  {/* Prompt to change network to Ganache */}
  <div>----------------------------------------</div>
  <div>Please connect to the Ganache Testnet</div>
  <div>and reload the page</div>
  <div>----------------------------------------</div>
</div>