'use client';
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
    const [isMinimized, setIsMinimized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'Admin', user.email);
                    const docSnap = await getDoc(docRef);
                    setIsAdmin(docSnap.exists());
                } catch (error) {
                    console.error("Error checking admin status: ", error);
                }
            }
        };

        checkAdminStatus();
    }, [user]);

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'Users', user.email);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserName(userDocSnap.data().name);
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

    useEffect(() => {
        const handleScroll = () => {
            setIsMinimized(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`bg-white w-full fixed top-0 flex items-center justify-between z-50 border-b border-gray-300 transition-all duration-300 ${isMinimized ? 'h-0 overflow-hidden' : 'h-50 p-4'}`}>
            {/* Left Section: Logos */}
            <div className={`flex items-center w-1/4 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                <ul className="flex space-x-4">
                    <li className="p-2">
                        <Image
                            src="/assets/accion.png"
                            width={200}
                            height={200}
                            alt="Accion logo"
                        />
                    </li>
                    <li className="p-2">
                        <Image
                            src="/assets/kings.png"
                            width={200}
                            height={200}
                            alt="Kings logo"
                        />
                    </li>
                </ul>
            </div>

            {/* Center Section: Title and Links */}
            <div className={`text-center w-2/3 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                    src="/assets/logo.jpeg"
                    width={300}
                    height={100}
                    alt="Cloud Farming Community Logo"
                    className="mx-auto"
                />
                <p className={`text-black flex items-center space-x-2 justify-center mt-2 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                    <span>Logged in as:</span>
                    <span className="font-semibold">{userName}</span>
                </p>
                <p className="text-black flex items-center space-x-4 justify-center mt-0 text-xl font-semibold">
                    <Link href="/home-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                        Home
                    </Link>
                    <Link href="/home-page#all-stories" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                        Farmer Stories
                    </Link>
                    <Link href="/about-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                        About
                    </Link>
                    <Link href="/about-unsung-warriors" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                        Unsung Warriors
                    </Link>
                    <Link href="/graph-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                        Graphs
                    </Link>
                    {user && isAdmin && (
                        <Link href="/dashboard" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            Admin Dashboard
                        </Link>
                    )}
                </p>
            </div>

            {/* Right Section: Additional Logos */}
            <div className={`flex items-center w-1/3 justify-end ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                <ul className="flex space-x-4">
                    <li className="p-2">
                        <Image
                            src="/assets/connect2.jpg"
                            width={150}
                            height={150}
                            alt="WTP logo"
                        />
                    </li>
                    <li className="p-2">
                        <Image
                            src="/assets/yeswecan.png"
                            width={150}
                            height={150}
                            alt="Yes We Can logo"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
