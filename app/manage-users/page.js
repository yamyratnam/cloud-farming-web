'use client'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Admin from '../admin';
import { auth, db } from '../firebase/config';
import Sidebar from '../sidebar';
import User from '../user';


export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push('/admin-portal');
  }
  
  const [users, setUser] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, "Users")

        const q = query(collectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setUser(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, 
            })))
        });
        return unsubscribe;
    }, [])

    const [admin, setAdmin] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, "Admin")

        const q = query(collectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setAdmin(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, 
            })))
        });
        return unsubscribe;
    }, [])

  return <div className="bg-gray-100 min-h-screen flex">
  {/* Sidebar */}
  <Sidebar />

  {/* Main Content */}
  <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Users</h2>
            </div>
            <div className="overflow-auto">
            {users.map(users => <User key={users.name} 
                    name={users.name}
                    dob={users.dob}
                    email_phn={users.email_phn}
                    gender={users.gender}
                    location={users.location}
                    age={users.age}
                />)}
            </div>

            <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-semibold">All Admin Users</h2>
            </div>
            <div className="overflow-auto">
            {admin.map(admin => <Admin key={admin.email} 
                    email={admin.email}
                />)}
            </div>
        </div>
</div>
}