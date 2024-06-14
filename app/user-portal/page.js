'use client'
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';

const UserPortal = () => {
  // Sign In State
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  
  // Sign Up State
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  // Sign In Handler
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(emailSignIn, passwordSignIn);
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmailSignIn('');
      setPasswordSignIn('');
      router.push('/home-page');
    } catch (e) {
      console.error(e);
    }
  };

  // Sign Up Handler
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(emailSignUp, passwordSignUp);
      const user = res.user;
      await setDoc(doc(db, 'Users', user.email), {
        age: age,
        dob: `${dob.year}-${dob.month}-${dob.day}`,
        email_phn: user.email,
        gender: gender,
        location: location,
        name: name,
      });

      sessionStorage.setItem('user', true);
      setEmailSignUp('');
      setPasswordSignUp('');
      setName('');
      setAge('');
      setDob({ day: '', month: '', year: '' });
      setLocation('');
      setGender('');
      router.push('/home-page');
    } catch (e) {
      console.error(e);
    }
  };

  // Navigation Handlers
  const redirectToSignUpasAdmin = () => {
    router.push('/permit-admin-portal');
  };

  const redirectToSignInasUser = () => {
    router.push('/user-portal');
  };

  const redirectToSignUpasUser = () => {
    router.push('/user-portal');
  };

  return (
    <div className="min-h-screen py-2 flex items-center justify-center bg-gray-100">
      <div className="flex bg-white px-10 rounded-lg shadow-xl w-full max-w-5xl">
        {/* Sign In Section */}
        <div className="w-1/2 p-5">
          <h1 className="text-black font-semibold text-2xl mb-5">Sign In</h1>
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
            <span className="text-blue-600 font-semibold cursor-pointer" onClick={redirectToSignUpasUser}>
              Sign Up
            </span>
          </p>
          <p className="mt-4 text-black text-center">
            Are you an Admin?{' '}
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignUpasAdmin}>
              Go to Admin Portal
            </span>
          </p>
        </div>
        {/* Sign Up Section */}
        <div className="w-1/2 p-5 border-l border-gray-300">
          <h1 className="text-black font-semibold text-2xl mb-5">Sign Up</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <div className="mb-4">
            <label className="text-black">Date of Birth:</label>
            <div className="flex space-x-2">
              <select
                value={dob.day}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
                className="w-full p-3 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
              >
                <option value="">Day</option>
                {[...Array(31).keys()].map(day => (
                  <option key={day + 1} value={day + 1}>{day + 1}</option>
                ))}
              </select>
              <select
                value={dob.month}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
                className="w-full p-3 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
              >
                <option value="">Month</option>
                {[...Array(12).keys()].map(month => (
                  <option key={month + 1} value={month + 1}>{month + 1}</option>
                ))}
              </select>
              <select
                value={dob.year}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
                className="w-full p-3 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
              >
                <option value="">Year</option>
                {[...Array(100).keys()].map(year => (
                  <option key={year + 1920} value={year + 1920}>{year + 1920}</option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
          />
          <div className="mb-4">
            <label className="text-black">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 bg-gray-200 rounded outline-none text-black placeholder-gray-500"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
            </select>
          </div>
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
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignInasUser}>
              Sign in
            </span>
          </p>
          <p className="mt-4 text-black text-center">
            Are you an Admin?{' '}
            <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignUpasAdmin}>
              Go to Admin Portal
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserPortal;
