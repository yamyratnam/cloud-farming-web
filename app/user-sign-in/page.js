'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({ res });
        setEmail('');
        setPassword('');
        router.push('/home-page');
        } catch (e) {
        console.error(e);
        }
    };

    const redirectToSignUpasAdmin = () => {
      router.push('/permit-admin-portal');
  };

    const redirectToSignUpasUser = () => {
        router.push('/user-sign-up');
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-green-500 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-black font-semibold text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-white rounded outline-none text-black placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-white rounded outline-none text-black placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Sign In
        </button>
        <p className="mt-4 text-white text-center">
          Don't have an account?{' '}
          <span className="text-blue-600 font-semibold cursor-pointer" onClick={redirectToSignUpasUser}>
            Sign Up
          </span>
        </p>
        <p className="mt-4 text-white text-center">
          Are you an Admin?{' '}
          <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignUpasAdmin}>
            Go to Admin Portal
          </span>
        </p>
      </div>
    </div>
  );
}

export default page