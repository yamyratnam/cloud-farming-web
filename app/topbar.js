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

    // Check admin status
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

    // Fetch user name
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
                        if (adminDocSnap.exists()) setUserName("Admin");
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

    // Handle scroll to minimize topbar
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
        <div className={`bg-white w-full fixed top-0 flex items-center justify-between z-50 border-b border-gray-300 transition-all duration-300 ${isMinimized ? 'h-12 p-2' : 'h-50 p-4'}`}>
            {/* Minimized Links on Scroll */}
            {isMinimized ? (
                <div className="w-full text-center">
                    <p className="text-black flex items-center space-x-4 justify-center text-xl font-semibold">
                        <Link href="/home-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            Home
                        </Link>
                        <Link href="/about-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            About
                        </Link>
                        <Link href="/home-page#all-stories" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            Farmer Stories
                        </Link>
                        <Link href="/graph-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            Graphs
                        </Link>
                        <Link href="/about-unsung-warriors" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                            Unsung Warriors
                        </Link>
                        {user && isAdmin && (
                            <Link href="/dashboard" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                Admin Dashboard
                            </Link>
                        )}
                    </p>
                </div>
            ) : (
                <>
                    {/* Full Topbar */}
                    <div className="flex items-center w-1/4">
                        <ul className="flex space-x-4">
                            <li className="p-2">
                                <Image
                                    src="/assets/accion.jpg"
                                    width={300}
                                    height={300}
                                    alt="Accion logo"
                                />
                            </li>
                            <li className="p-2">
                                <Image
                                    src="/assets/kings.png"
                                    width={300}
                                    height={300}
                                    alt="Kings logo"
                                />
                            </li>
                        </ul>
                    </div>

                    <div className="text-center pl-10 w-2/3">
                        <Image
                            src="/assets/logo.jpeg"
                            width={300}
                            height={100}
                            alt="Cloud Farming Community Logo"
                            className="mx-auto"
                        />
                        <p className="text-black flex items-center space-x-4 justify-center mt-0 text-xl font-semibold">
                            <Link href="/home-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                Home
                            </Link>
                            <Link href="/about-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                About
                            </Link>
                            <Link href="/home-page#all-stories" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                Farmer Stories
                            </Link>
                            <Link href="/graph-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                Graphs
                            </Link>
                            <Link href="/about-unsung-warriors" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                Unsung Warriors
                            </Link>
                            {user && isAdmin && (
                                <Link href="/dashboard" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                                    Admin Dashboard
                                </Link>
                            )}
                        </p>
                    </div>

                    <div className="flex items-center w-1/3 justify-end">
                        <ul className="flex space-x-4">
                            <li className="p-2">
                                <Image
                                    src="/assets/yeswecan.png"
                                    width={150}
                                    height={150}
                                    alt="Yes We Can logo"
                                />
                            </li>
                            <li className="p-2">
                                <Image
                                    src="/assets/wtp.png"
                                    width={175}
                                    height={175}
                                    alt="WTP logo"
                                />
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Topbar;
