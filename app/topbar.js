import { ChevronDownIcon } from '@heroicons/react/outline';
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
    const [isAboutOpen, setIsAboutOpen] = useState(false);
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

    // Effect to handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            setIsMinimized(window.scrollY > 50); // Set minimized state based on scroll position
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={`bg-white w-full fixed top-0 flex items-center justify-between z-50 border-b border-gray-300 transition-all duration-300 ${isMinimized ? 'h-0 overflow-hidden' : 'h-50 p-4'}`}>
            <div className={`flex items-center w-1/4 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                <ul className="flex space-x-4">
                    <li className="text-white p-2">
                        <Image
                            src="/assets/accion.png"
                            width={200}
                            height={200}
                            alt="Accion logo"
                        />
                    </li>
                    <li className="text-white p-2">
                        <Image
                            src="/assets/kings.png"
                            width={200}
                            height={200}
                            alt="Kings logo"
                        />
                    </li>
                </ul>
            </div>
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
                    <span className='font-semibold'>{userName}</span>
                </p>
                <p className="text-black flex items-center space-x-4 justify-center mt-0 text-xl font-semibold">
            <Link href="/home-page" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                <span>Home</span>
            </Link>
            <Link href="/home-page#all-stories" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                <span>Farmer Stories</span>
            </Link>

            {/* About Dropdown */}
            <div
                className="relative group"
                onMouseEnter={() => setIsAboutOpen(true)}
            >
                <button className="hover:text-blue-500 cursor-pointer rounded-md p-2 flex items-center space-x-1">
                    <span>About</span>
                    <ChevronDownIcon className="w-5 h-5" />
                </button>

                {/* Dropdown Items */}
                {isAboutOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg"
                        onMouseLeave={() => setIsAboutOpen(false)}>
                        <Link
                            href="/about-page"
                            className="block px-4 py-2 hover:bg-blue-100"
                        >
                            About
                        </Link>
                        <hr className="border-gray-200" />
                        <Link
                            href="/graph-page"
                            className="block px-4 py-2 hover:bg-blue-100"
                        >
                            Graphs
                        </Link>
                        <hr className="border-gray-200" />
                        <Link
                            href="/about-using-warriors"
                            className="block px-4 py-2 hover:bg-blue-100"
                        >
                            Using Warriors
                        </Link>
                    </div>
                )}
            </div>

            {user && isAdmin && (
                <Link href="/dashboard" className="hover:text-blue-500 cursor-pointer rounded-md p-2">
                    <span>Admin Dashboard</span>
                </Link>
            )}
        </p>
            </div>
            <div className={`flex items-center w-1/3 justify-end ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                <ul className="flex space-x-4">
                    <li className="text-white p-2 bg-white">
                        <Image
                            src="/assets/connect2.jpg"
                            width={150}
                            height={150}
                            alt="WTP logo"
                        />
                    </li>
                    <li className="text-white p-2">
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
