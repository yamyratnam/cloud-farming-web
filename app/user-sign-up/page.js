'use client'
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState({ day: '', month: '', year: '' });
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
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
            setEmail('');
            setPassword('');
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

    const redirectToSignUpasAdmin = () => {
        router.push('/permit-admin-portal');
    };

    const redirectToSignInasUser = () => {
        router.push('/user-sign-in');
    };

    return (
        <div className="p-10 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-green-500 p-10 rounded-lg shadow-xl w-96">
                <h1 className="text-black font-semibold text-2xl mb-5">Sign Up</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded outline-none text-black placeholder-gray-500"
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded outline-none text-black placeholder-gray-500"
                />
                <div className="mb-4">
                    <label className="text-white">Date of Birth:</label>
                    <div className="flex space-x-2">
                        <select
                            value={dob.day}
                            onChange={(e) => setDob({ ...dob, day: e.target.value })}
                            className="w-full p-3 bg-white rounded outline-none text-black placeholder-gray-500"
                        >
                            <option value="">Day</option>
                            {[...Array(31).keys()].map(day => (
                                <option key={day + 1} value={day + 1}>{day + 1}</option>
                            ))}
                        </select>
                        <select
                            value={dob.month}
                            onChange={(e) => setDob({ ...dob, month: e.target.value })}
                            className="w-full p-3 bg-white rounded outline-none text-black placeholder-gray-500"
                        >
                            <option value="">Month</option>
                            {[...Array(12).keys()].map(month => (
                                <option key={month + 1} value={month + 1}>{month + 1}</option>
                            ))}
                        </select>
                        <select
                            value={dob.year}
                            onChange={(e) => setDob({ ...dob, year: e.target.value })}
                            className="w-full p-3 bg-white rounded outline-none text-black placeholder-gray-500"
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
                    className="w-full p-3 mb-4 bg-white rounded outline-none text-black placeholder-gray-500"
                />
                <div className="mb-4">
                    <label className="text-white">Gender:</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-3 bg-white rounded outline-none text-black placeholder-gray-500"
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
                    <span className="text-blue-600 cursor-pointer font-semibold" onClick={redirectToSignInasUser}>
                        Sign in
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

export default SignUpPage;
