'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from "react-hot-toast";
import Topbar from '../topbar';

const page = () => {
    const [key, setKey] = useState('');
    const router = useRouter();

    const redirectToSignUpasAdmin = () => {
        if (key === '243') {
            setKey('');
            router.push('/admin-portal');
        } else {
            toast.error('Wrong key');
        }
    };


    const redirectToSignUpasUser = () => {
        router.push('/user-portal');
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Topbar />
      <div className="bg-white p-10 rounded-lg shadow-xl w-96 mt-80">
        <h1 className="text-black font-semibold text-2xl mb-5">Do you have the Key to Access Admin Portal?</h1>
        <input
          type="key"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
        />
        <button
          onClick={redirectToSignUpasAdmin}
          className="w-full p-3 mb-4 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Go to Admin Portal
        </button>
        <p className="mt-4 text-black text-center">
          Don't have Admin Access Key?{' '}
          <span className="text-blue-600 font-semibold cursor-pointer" onClick={redirectToSignUpasUser}>
            Go back
          </span>
        </p>
      </div>
    </div>
  );
}

export default page