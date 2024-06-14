'use client'
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log({ res });

        const user = res.user;
        await setDoc(doc(db, 'Admin', user.email), {
            email: user.email,
            uid: user.uid
        })

        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/');
        } catch (e) {
        console.error(e);
        }
    };

    const redirectToSignInasAdmin = () => {
        router.push('/admin-sign-in');
    };

    const redirectToSignUpasUser = () => {
        router.push('/user-sign-up');
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-green-500 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-black font-semibold text-2xl mb-5">Admin Sign Up</h1>
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
          onClick={handleSignUp}
          className="w-full p-3 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-white text-center">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignInasAdmin}>
            Sign in
          </span>
        </p>
        <p className="mt-4 text-white text-center">
          Are you a Normal User?{' '}
          <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignUpasUser}>
            User Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default page