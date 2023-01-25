import { useState } from 'react'
import Header from '../components/Header';
import {initializeProvider} from '../utils/utils';
const Search = () => {

const [isUserKycExist, setIsUserKycExist] = useState(false);
const [fullName, setFullName] = useState([]);
const [email, setEmail] = useState([]);
const [phone, setPhone] = useState([]);
const [ssn, setSsn] = useState([]);
const [occupationalStatus, setOccupationalStatus] = useState([]);
const [company, setCompany] = useState([]);
const [dob, setDob] = useState([]);
const [kycStatus, setKycStatus] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const searchKycRecord = async()=>{
        try {
            const { ethereum } = window
            if (ethereum) {
              const kycContract = await initializeProvider();
              const kycDetail = await kycContract.getUserKycDetails(searchQuery);
              if(kycDetail && kycDetail.status === 1){
                setIsUserKycExist(true);
                setFullName(kycDetail.fullName);
                setDob(kycDetail.dob);
                setPhone(kycDetail.phone);
                setEmail(kycDetail.email);
                setSsn(kycDetail.ssn);
                setOccupationalStatus(kycDetail.occupationalStatus);
                setCompany(kycDetail.company);
                setKycStatus('Verified');
              }else{
                setIsUserKycExist(false);
              }
            } else {
              console.log("Ethereum object doesn't exist");
            }
          } catch (error) {
            console.log(error);
            setIsUserKycExist(false);
          }
    }
    return (
        <div className='w-[100%]'>
            <Header />
            <div className="flex items-center justify-center items-center pt-10">
                <div className="flex border-2 border-gray-200 rounded">
                    <input type="text" className="px-4 py-2 w-80" placeholder="Search..." onChange={e => setSearchQuery(e.target.value)}/>
                    <button className="px-4 text-white bg-[#0075BE] border-l " onClick={searchKycRecord}>
                        Search
                    </button>
                </div>
            </div>
            {isUserKycExist ? 
                   <div className='w-[100%] flex items-center justify-center pt-10'>
                   <div className="overflow-hidden bg-white shadow sm:rounded-lg  w-[80%]">
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
                           <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt className="text-sm font-medium text-gray-500">Email</dt>
                               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{email}</dd>
                           </div>
                           <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt className="text-sm font-medium text-gray-500">Phone</dt>
                               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{phone}</dd>
                           </div>
                           <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt className="text-sm font-medium text-gray-500">Occupation Status</dt>
                               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{occupationalStatus}</dd>
                           </div>
                           <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt className="text-sm font-medium text-gray-500">Company</dt>
                               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{company}</dd>
                           </div>
                           <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt className="text-sm font-medium text-gray-500">Status</dt>
                               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{kycStatus}</dd>
                           </div>
                           </dl>
                       </div>
                   </div>  
               </div>:
                <div className='w-[100%] flex items-center justify-center pt-10'>
                   <div className="overflow-hidden bg-white shadow sm:rounded-lg  w-[80%]">
                       <div className="border-t border-gray-200">
                           <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">No Result</dd>
                                </div>
                           </dl>
                        </div>
                    </div>
                </div>
             }
        
        </div>
    )
}

export default Search;