'use client'
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdminStory from '../adminstory';
import { auth, db } from '../firebase/config';
import Sidebar from '../sidebar';

export default function Page() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const userSession = window.sessionStorage.getItem('user');
  const [story, setStory] = useState([]);

  useEffect(() => {
    if (loading) return; // Wait for the user to load

    if (!user && !userSession) {
      router.push('/user-sign-in');
      return;
    }

    const checkAdmin = async () => {
      if (user) {
        const adminDocRef = doc(db, "Admin", user.email);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          router.push('/home-page');
        }
      } else if (userSession) {
        const sessionUser = JSON.parse(userSession);
        const adminDocRef = doc(db, "Admin", sessionUser.email);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          router.push('/home-page');
        }
      }
    };

    checkAdmin();
  }, [user, loading, userSession, router]);

  useEffect(() => {
    if (isAdmin) {
      const collectionRef = collection(db, "Stories");
      const q = query(collectionRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setStory(
          querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime(),
          }))
        );
      });

      return unsubscribe;
    }
  }, [isAdmin]);

  if (loading || (!isAdmin && !userSession)) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">All Stories</h2>
        </div>
        <div className="overflow-auto">
          {/* Stories list */}
          {story.map(story => (
            <AdminStory
              key={story.id}
              id={story.id}
              title={story.title}
              details={story.details}
              locationOfFarm={story.locationOfFarm}
              sizeOfCultivation={story.sizeOfCultivation}
              durationToYield={story.durationToYield}
              climaticConditions={story.climaticConditions}
              geographicalConditions={story.geographicalConditions}
              groundWaterSupply={story.groundWaterSupply}
              externalWaterSupply={story.externalWaterSupply}
              typeOfProduce={story.typeOfProduce}
              name={story.name}
              contact={story.contact}
              communityBelongingTo={story.communityBelongingTo}
              avgProductionExpenditure={story.avgProductionExpenditure}
              images={story.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
