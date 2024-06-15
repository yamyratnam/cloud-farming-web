import { ArrowCircleRightIcon, ArrowRightIcon, PlusIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase/config';

const Sidebar = () => {
    const [storyCount, setStoryCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [user, loading, error] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                const docRef = doc(db, 'Admin', user.email);
                const docSnap = await getDoc(docRef);
                setIsAdmin(docSnap.exists());
            }
        };
        if (user) {
            checkAdminStatus();
        }
    }, [user]);

    useEffect(() => {
        const fetchStoryCount = async () => {
            const collectionRef = collection(db, "Stories")
            const storiesSnapshot = await getDocs(collectionRef);
            const Scount = storiesSnapshot.size;
            setStoryCount(Scount);
        };

        fetchStoryCount();

        // Cleanup function for useEffect
        return () => {};
    }, []);

    useEffect(() => {
        const fetchUserCount = async () => {
            const collectionRef = collection(db, "Users")
            const usersSnapshot = await getDocs(collectionRef);
            const Ucount = usersSnapshot.size;
            setUserCount(Ucount);
        };

        fetchUserCount();

        // Cleanup function for useEffect
        return () => {};
    }, []);

    useEffect(() => {
        const fetchAdminCount = async () => {
            const collectionRef = collection(db, "Admin")
            const adminSnapshot = await getDocs(collectionRef);
            const Acount = adminSnapshot.size;
            setAdminCount(Acount);
        };

        fetchAdminCount();

        // Cleanup function for useEffect
        return () => {};
    }, []);

    useEffect(() => {
      const fetchUserName = async () => {
          if (user) {
              const userDocRef = doc(db, 'Users', user.email);
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                  const userData = userDocSnap.data();
                  setUserName(userData.name);
              } else {
                  // If the user doesn't exist in "Users" collection, check "Admin" collection
                  const adminDocRef = doc(db, 'Admin', user.email);
                  const adminDocSnap = await getDoc(adminDocRef);
                  if (adminDocSnap.exists()) {
                      // If user exists in "Admin" collection, set userName as "Admin"
                      setUserName("Admin");
                  }
              }
          }
      };
  
      fetchUserName();
  
      // Cleanup function for useEffect
      return () => {};
  }, [user]);
  

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="h-screen bg-white w-64 p-4 flex-none sticky top-0 shadow-xl">
            <h1 className="text-black text-xl font-semibold mb-4">Dashboard</h1>
            <p className="text-black mb-2 flex justify-between">
                <span>Logged in as:</span>
                <span className='font-semibold'>{userName}</span>
            </p>
            <ul className="space-y-2">
                <li className="text-black p-2 rounded-md hover:bg-gray-300 cursor-pointer">
                    <Link href="/dashboard">
                        <span className="flex items-center justify-between">
                            <span>All Stories</span>
                            <span className="bg-gray-200 text-green-500 px-2 py-1 rounded-md ml-2">{storyCount}</span>
                        </span>
                    </Link>
                </li>
                <li className="text-black flex items-center justify-between p-2 rounded-md hover:bg-gray-300 cursor-pointer">
                    <span>All Users</span>
                    <span className="bg-gray-200 text-green-500 px-2 py-1 rounded-md">{userCount}</span>
                </li>
                {isAdmin && (
                    <li className="text-black flex items-center justify-between p-2 rounded-md hover:bg-gray-300 cursor-pointer">
                        <span>All Admin Users</span>
                        <span className="bg-gray-200 text-green-500 px-2 py-1 rounded-md">{adminCount}</span>
                    </li>
                )}
            </ul>
            {isAdmin && (<Link href="/create-story">
                <button className="bg-gray-200 text-green-500 px-3 py-2 rounded-md mt-4 flex hover:bg-gray-300 items-center justify-center w-full">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create New Story
                </button>
            </Link>)}
            {isAdmin && (<Link href="/manage-users">
                <button className="bg-gray-200 text-green-500 px-3 py-2 rounded-md mt-4 flex hover:bg-gray-300 items-center justify-center w-full">
                    <ArrowRightIcon className="h-5 w-5 mr-2" />
                    Manage Users
                </button>
            </Link>)}
            {isAdmin && (<Link href="/home-page">
                <button className="bg-gray-200 text-green-500 px-3 py-2 rounded-md mt-4 flex hover:bg-gray-300 items-center justify-center w-full">
                    <ArrowRightIcon className="h-5 w-5 mr-2" />
                    View Site
                </button>
            </Link>)}
            <ul className="py-4">
                <li onClick={() => {
                    signOut(auth)
                }}
                    className="text-black flex items-center justify-between p-2 rounded-md hover:bg-gray-300 cursor-pointer">
                    <span>Logout</span>
                    <span className="text-black-500 px-2 py-2 rounded-md">
                        <button className="text-black-500 rounded-md flex items-center justify-center w-full">
                            <ArrowCircleRightIcon className="h-8 w-8" />
                        </button>
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
