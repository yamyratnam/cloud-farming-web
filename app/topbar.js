import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase/config';

const Topbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const checkAdminStatus = async () => {
                try {
                    const docRef = doc(db, 'Admin', user.email);
                    const docSnap = await getDoc(docRef);
                    setIsAdmin(docSnap.exists());
                } catch (error) {
                    console.error("Error checking admin status: ", error);
                }
            };
            checkAdminStatus();
        }
    }, [user]);

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'Users', user.email);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setUserName(userData.name);
                    } else {
                        const adminDocRef = doc(db, 'Admin', user.email);
                        const adminDocSnap = await getDoc(adminDocRef);
                        if (adminDocSnap.exists()) {
                            setUserName("Admin");
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user name: ", error);
                }
            } else {
                setUserName("Guest User");
            }
        };

        fetchUserName();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-white w-full p-4 fixed top-0 flex items-center justify-between z-50">
            <div className="flex items-center w-1/3">
                <ul className="flex space-x-4">
                    <li className="text-white p-2">
                        <Image
                            src="/assets/kings.png"
                            width={100}
                            height={100}
                            alt="Kings logo"
                        />
                    </li>
                    <li className="text-white p-2">
                        <Image
                            src="/assets/accion.png"
                            width={100}
                            height={100}
                            alt="Accion logo"
                        />
                    </li>
                    <li className="text-white p-2">
                        <Image
                            src="/assets/yeswecan.png"
                            width={100}
                            height={100}
                            alt="Yes We Can logo"
                        />
                    </li>
                </ul>
            </div>
            <div className="text-center w-1/3">
                <h1 className="text-black text-2xl font-semibold mt-4">AF Farming Community</h1>
                <p className="text-black flex items-center space-x-2 justify-center">
                    <span>Logged in as:</span>
                    <span className='font-semibold'>{userName}</span>
                </p>
                <p className="text-black flex items-center space-x-2 justify-center mt-6">
                    <Link href="/home-page" className='hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                        <span>Home</span>
                    </Link>
                    <Link href="/home-page#all-stories" className='hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                        <span>All Stories</span>
                    </Link>
                    <Link href="/about-page" className='hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                        <span>About Us</span>
                    </Link>
                    {isAdmin && (
                        <Link href="/dashboard" className='hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                            <span>Admin Portal</span>
                        </Link>
                    )}
                </p>
            </div>
            <div className="flex items-center w-1/3 justify-end">
                <ul className="flex space-x-4">
                    {user ? (
                        <li
                            onClick={() => {
                                signOut(auth);
                                sessionStorage.removeItem('user');
                            }}
                            className="text-black flex items-center p-2 rounded-md hover:bg-gray-300 cursor-pointer"
                        >
                            <span>Logout</span>
                            <span className="text-white-500 px-2 py-2 rounded-md">
                                <button className="text-white-500 rounded-md flex items-center justify-center">
                                    <ArrowCircleRightIcon className="h-8 w-8" />
                                </button>
                            </span>
                        </li>
                    ) : (
                        <li
                            onClick={() => {
                                router.push('/user-portal')
                            }}
                            className="text-black flex items-center p-2 rounded-md hover:bg-gray-300 cursor-pointer"
                        >
                            <span>Enter</span>
                            <span className="text-white-500 px-2 py-2 rounded-md">
                                <button className="text-white-500 rounded-md flex items-center justify-center">
                                    <ArrowCircleRightIcon className="h-8 w-8" />
                                </button>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
