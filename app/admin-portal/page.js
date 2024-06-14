'use client'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth, db } from '../firebase/config';

const AdminPortal = () => {
  // Sign In State
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // Sign Up State
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  // Sign In Handler
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(emailSignIn, passwordSignIn);
      console.log({ res });

      const user = res.user;
      const docRef = doc(db, 'Admin', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        window.sessionStorage.setItem('user', true);
        setEmailSignIn('');
        setPasswordSignIn('');
        router.push('/');
      } else {
        toast.error('You do not have admin access.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Sign Up Handler
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(emailSignUp, passwordSignUp);
      console.log({ res });

      const user = res.user;
      await setDoc(doc(db, 'Admin', user.email), {
        email: user.email,
        uid: user.uid
      });

      window.sessionStorage.setItem('user', true);
      setEmailSignUp('');
      setPasswordSignUp('');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  // Navigation Handlers
  const redirectToSignInasUser = () => {
    router.push('/user-portal');
  };

  const redirectToSignUpasUser = () => {
    router.push('/user-portal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white p-10 rounded-lg shadow-xl w-full max-w-5xl">
        {/* Sign In Section */}
        <div className="w-1/2 p-5">
          <h1 className="text-black font-semibold text-2xl mb-5">Admin Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={emailSignIn}
            onChange={(e) => setEmailSignIn(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordSignIn}
            onChange={(e) => setPasswordSignIn(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            Sign In
          </button>
          <p className="mt-4 text-black text-center">
            Don't have an account?{' '}
            <span className="text-blue-600 font-semibold cursor-pointer" onClick={handleSignUp}>
              Sign Up
            </span>
          </p>
          <p className="mt-4 text-black text-center">
            Are you a Normal User?{' '}
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignInasUser}>
              User Sign In
            </span>
          </p>
        </div>
        {/* Sign Up Section */}
        <div className="w-1/2 p-5 border-l border-gray-300">
          <h1 className="text-black font-semibold text-2xl mb-5">Admin Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            value={emailSignUp}
            onChange={(e) => setEmailSignUp(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordSignUp}
            onChange={(e) => setPasswordSignUp(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <button
            onClick={handleSignUp}
            className="w-full p-3 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            Sign Up
          </button>
          <p className="mt-4 text-black text-center">
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={handleSignIn}>
              Sign in
            </span>
          </p>
          <p className="mt-4 text-black text-center">
            Are you a Normal User?{' '}
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignUpasUser}>
              User Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
