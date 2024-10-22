'use client'
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import Topbar from '../topbar';

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


  return (
    <div className="min-h-screen py-2 flex items-center justify-center bg-gray-100">
    <Topbar />
      <div className="flex bg-white px-10 rounded-lg shadow-xl w-full max-w-5xl mt-80">
        {/* Sign In Section */}
        <div className="w-1/2 p-5">
          <h1 className="text-black font-semibold text-2xl mb-5">Sign In</h1>
          <p className="mb-4 text-black">
            Sign in to your account!
          </p>
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
        </div>
        {/* Sign Up Section */}
        <div className="w-1/2 p-5 border-l border-gray-300">
          <h1 className="text-black font-semibold text-2xl mb-5">Sign Up</h1>
          <p className="mb-4 text-black">
            Create a new account!
          </p>
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
        </div>
      </div>
    </div>
  );
}

export default UserPortal;
