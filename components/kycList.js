import { useEffect, useState } from 'react';
import Header from './Header';
import {initializeProvider} from '../utils/utils';


export default function KycList() {

const [kycList, setKycList] = useState([]);
const [showModal, setShowModal] = useState(false);
const [userAddress, setUserAddress] = useState([]);
const [fullName, setFullName] = useState([]);
const [email, setEmail] = useState([]);
const [phone, setPhone] = useState([]);
const [ssn, setSsn] = useState([]);
const [occupationalStatus, setOccupationalStatus] = useState([]);
const [company, setCompany] = useState([]);
const [dob, setDob] = useState([]);
const [kycStatus, setKycStatus] = useState([]);

// Just gets all the Kyc list from the contract
  const getKycList = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const kycContract = await initializeProvider();
        const kycList = await kycContract.getPendingStatusUserKycDetails();
        const filteredKycList = kycList.filter(kyc => kyc.isExist === true);
        if(filteredKycList){
          setKycList(filteredKycList);
        }else{
          setKycList([]);
        }
        //setKycListinState(filteredKycList);
      } else { 
        console.log("Ethereum object doesn't exist")
      }
       
    } catch (error) {
      console.log(error)
    }
  }

  const handleKycStatus = async(status)=>{
    try {
      const { ethereum } = window
      if (ethereum) {
        const kycContract = await initializeProvider();
        const statusVal = status === 'approve' ? 1 : 2;
        await kycContract.updateUserKycStatus(userAddress, statusVal);
        const filteredKycList = kycList.filter(kyc => kyc.userAddress != userAddress);
        if(filteredKycList){
          setKycList(filteredKycList);
        }else{
          setKycList([]);
        }
        setShowModal(false);
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
}

  const setKycListinState = (kycList)=>{
    if(kycList.length == 1){
      const kycDetail = kycList[0];
      console.log(kycDetail);
      if(kycDetail.isExist === false){
        setKycList([]);
      }else{
        setKycList(kycList);
      }
    }else{
      setKycList(kycList);
    }
  }

  const openModal = ({userAddress, fullName, dob, ssn, email, phone, occupationalStatus, company, status})=>{
        setUserAddress(userAddress);
        setFullName(fullName);
        setDob(dob);
        setSsn(ssn);
        setEmail(email);
        setPhone(phone);
        setOccupationalStatus(occupationalStatus);
        setCompany(company);
        setKycStatus(status == 0 ? 'Pending' : status == 1 ? 'Verified' : 'Rejected');
        setShowModal(true);
  }

  

useEffect(() => {
    getKycList()
  }, [])
  return (
    <>
    <div className='w-[100%]'>
         <Header />
       <h2 className='text-4xl bolder text-gray pb-4 py-2 flex items-center justify-center'>
          Pending KYC List
        </h2>
         <div className="flex flex-col">
           <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
             <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
               <div className="overflow-hidden">
                 <table className="min-w-full">
                   <thead className="bg-white border-b">
                     <tr>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                         #
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                         Full Name
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                         DOB
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                          SSN
                        </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                         Email
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                         Phone
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                           Occupation Status
                       </th>
                       <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                                                 Company
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                                                 Status
                        </th>
                     </tr>
                   </thead>
                   { kycList.map((kyc, index )=> {
                    return (
                              <tbody  key={index}>
                                   <tr className={index % 2 == 0 ? 'bg-gray-100 border-b' :'bg-white-100 border-b'}>
                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                         <a href="#" className="text-blue-500 underline" onClick={() => openModal(kyc)}> {kyc.fullName}</a>
                                         </td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {kyc.dob}
                                         </td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {kyc.ssn}
                                         </td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           {kyc.email}
                                         </td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           {kyc.phone}
                                         </td>
                                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {kyc.occupationalStatus}
                                         </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                             {kyc.company}
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                             {kyc.status == 0 ? 'Pending' : kyc.status == 1 ? 'Verified' : 'Rejected'}
                                          </td>
                                   </tr>
                               </tbody>
                            );
                          })}

                 </table>
               </div>
             </div>
           </div>
         </div>
     </div>


     {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-[100%]"
          >
            <div className="relative w-auto my-6 mx-auto  w-[60%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    KYC Detail
                  </h3>
                </div>
                {/*body*/}
            
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
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">SSN</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ssn}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{email}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{phone}</dd>
              </div>
             <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Occupation Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{occupationalStatus}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{company}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{kycStatus}</dd>
              </div>
            </dl>
          </div>
                        {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="bg-[#0075BE] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> handleKycStatus('reject')}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-[#0075BE] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> handleKycStatus('approve')}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

     
     </>
  );
}