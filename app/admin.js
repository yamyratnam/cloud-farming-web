import { TrashIcon } from '@heroicons/react/solid';
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from "react-hot-toast";
import { auth, db } from "./firebase/config"; // Ensure auth is imported from your firebase config

const Admin = ({
    email
}) => {
    const [user, loading, error] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                const docRef = doc(db, 'Admin', user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        };
        checkAdminStatus();
    }, [user]);

    const deleteUser = async (email, e) => {
        e.stopPropagation();
        if (isAdmin) {
            const docRef = doc(db, "Admin", email);
            await deleteDoc(docRef);
            toast.success("Successfully Deleted User");
        } else {
            toast.error("You do not have permission to delete this user.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="mt-8 bg-white">
            <div className="bg-white rounded-md p-4 mb-4 shadow-md">
                <div className="flex items-center justify-between">
                    <h3 className="text-l font-semibold mb-2">{email}</h3>
                    {isAdmin && (
                        <button onClick={(e) => deleteUser(email, e)} className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center">
                        <TrashIcon className="h-5 w-5 mr-1" />
                    </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
