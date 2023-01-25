import React from 'react'
import Header from './Header';
const Login = ({ connectWallet }) => {
  return (
    <div className='w-[100%]'>
        <Header />
        <section>
        <div
            className="mx-auto max-w-screen-xl px-4 py-4 lg:flex lg:h-screen lg:items-center"
        >
            <div className="mx-auto max-w-3xl text-center">
            <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              WEB 3.0 KYC
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
                tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-[#0075BE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick = {connectWallet}>
                Connect Wallet
              </button>
            </div>
            </div>
        </div>
</section>
    </div>
  )
}

export default Login;