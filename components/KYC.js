import { useState, useEffect } from 'react'
import Header from './Header';
import {initializeProvider} from '../utils/utils';

export default function KYC({address}){
const [isUserKycExist, setIsUserKycExist] = useState(false);
const [fullName, setFullName] = useState([]);
const [email, setEmail] = useState([]);
const [phone, setPhone] = useState([]);
const [ssn, setSsn] = useState([]);
const [occupationalStatus, setOccupationalStatus] = useState([]);
const [company, setCompany] = useState([]);
const [dob, setDob] = useState([]);
const [kycStatus, setKycStatus] = useState([]);

const [updateSuccess, setUpdateSuccess] = useState(false);
const [updateFailure, setUpdateFailure] = useState(false);

useEffect( () => {
   getUserKycDetails();
}, []);

// Get user KYC detail from the contract
  const getUserKycDetails = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const kycContract = await initializeProvider();
        const kycDetail = await kycContract.getUserKycDetails(address);
        if(kycDetail){
          setIsUserKycExist(true);
          setFullName(kycDetail.fullName);
          setDob(kycDetail.dob);
          setPhone(kycDetail.phone);
          setEmail(kycDetail.email);
          setSsn(kycDetail.ssn);
          setOccupationalStatus(kycDetail.occupationalStatus);
          setCompany(kycDetail.company);
          setKycStatus(kycDetail.status == 0 ? 'Pending' : kycDetail.status == 1 ? 'Verified' : 'Rejected');
        }
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

// Add user KYC detail in blockchain
const handleAddUserKyc = async () =>{
   try {
         const { ethereum } = window
         if (ethereum) {
           const kycContract = await initializeProvider();
           await kycContract.addUserKyc(address,fullName, dob, ssn, email, phone , occupationalStatus, company);
           setKycStatus('Pending');
           setIsUserKycExist(true);
         } else {
           console.log("Ethereum object doesn't exist!")
         }
       } catch (error) {
         console.log('Error: ', error)
       }
}

// Update user KYC detail in blockchain
const handleUpdateUserKyc = async () =>{
  try {
        const { ethereum } = window
        if (ethereum) {
          const kycContract = await initializeProvider();
          await kycContract.updateUserKyc(address, email, phone, occupationalStatus, company);
          setKycStatus('Pending');
          setUpdateSuccess(true);
        } else {
          console.log("Ethereum object doesn't exist!")
        }
      } catch (error) {
        setUpdateFailure(true);
        console.log('Error: ', error)
      }
}

return (
   <div className='w-[100%]'>
     <Header />
     <h2 className='text-4xl bolder text-gray pb-4 py-4 flex items-center justify-center'>
     {!isUserKycExist ? 'KYC' : `KYC Status - ${kycStatus}`}
     </h2>
    <div className='w-[100%] flex items-center justify-center'>
        {!isUserKycExist ?
         <form className=" w-[40%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
             Full Name
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="fullName"
                     type="text"
                     placeholder="Full Name"
                     value={fullName}
                     onChange={e => setFullName(e.target.value)}/>
         </div>
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
             DOB
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="fullName"
                     type="text"
                     placeholder="mm/dd/YYYY"
                     value={dob}
                     onChange={e => setDob(e.target.value)}/>
         </div>
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
             SSN
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-0 focus:shadow-outline"
                     id="ssn" type="text" placeholder="SSN"
                     value={ssn}
                     onChange={e => setSsn(e.target.value)}/>
         </div>
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
             Email
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="email" type="text" placeholder="Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}/>
         </div>
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
             Phone
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="phone" type="text" placeholder="Phone"
                     value={phone}
                     onChange={e => setPhone(e.target.value)}/>
         </div>
         
         <div className="mb-3">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
             Occupational Status
           </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="occupationalStatus" type="text" placeholder="Occupational Status"
                     value={occupationalStatus}
                     onChange={e => setOccupationalStatus(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Company
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="company" type="text" placeholder="Company"
                      value={company}
                      onChange={e => setCompany(e.target.value)}/>
            </div>
            <div className="flex items-center justify-center p-6 ">
              <button
                    className="bg-[#0075BE] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddUserKyc}
                  >
                    ADD
                  </button>
              </div>
       </form> :
          
          <div className="overflow-hidden bg-white shadow sm:rounded-lg  w-[60%]">
            {updateSuccess && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-white-800 dark:text-green-400" role="alert">
                KYC detail updated Successfully!!!
              </div>
            }
            {
              updateFailure &&  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-white-800 dark:text-red-400" role="alert">
                 Error occured in updating KYC.
              </div>
            }
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fullName}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">DOB</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{dob}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">SSN</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ssn}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-[50%]"
                     id="email" type="text" placeholder="Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}/>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-[50%]"
                     id="phone" type="text" placeholder="Phone"
                     value={phone}
                     onChange={e => setPhone(e.target.value)}/>
                </dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Occupational Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-[50%]"
                     id="occupationalStatus" type="text" placeholder="Occupational Status"
                     value={occupationalStatus}
                     onChange={e => setOccupationalStatus(e.target.value)}/>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Compapny</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[50%]"
                      id="company" type="text" placeholder="Company"
                      value={company}
                      onChange={e => setCompany(e.target.value)}/>
                </dd>
              </div>
              <div className="flex items-center justify-center p-6 ">
              <button
                    className="bg-[#0075BE] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdateUserKyc}
                  >
                    Update
                  </button>
              </div>
            </dl>
          </div>
        </div>  
         }
        
        </div>
   </div>
  )
}