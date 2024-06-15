'use client'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import Footer from '../footer';
import Story from '../story';
import Topbar from '../topbar';

export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 2; // Number of stories per page

  // Handle previous page click
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page click
  const goToNextPage = () => {
    const totalPages = Math.ceil(top4story.length / storiesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!user) {
    router.push('/user-portal');
  }

  const [top4story, setTop4Story] = useState([]);
  const [story, setStory] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "Stories");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const topFourStories = querySnapshot.docs.slice(0, 4).map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }));
      setTop4Story(topFourStories);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "Stories");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Stories = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }));
      setStory(Stories);
    });
    return unsubscribe;
  }, []);

  // Calculate pagination indexes
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = top4story.slice(indexOfFirstStory, indexOfFirstStory + storiesPerPage); // Display only 2 stories

  return (
    <div className="min-h-screen flex flex-col items-center relative">
    {/*Top Bar */}
    <Topbar />

    {/* Hero Section */}
    <div className="w-full inline-block relative mt-16 sm:mt-48 mb-8">
        <article className="relative flex flex-col items-start justify-end h-[60vh] sm:h-[85vh] mx-5 sm:mx-10">
            
            <img src="/assets/card.gif"
                placeholder="blur"
                alt="title"
                className="w-full h-full object-center object-cover rounded-3xl"
                style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            />

            <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl" />

            <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center text-light z-10">
                <div className="mt-6">
                    <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
                        <span className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                            dark:to-accentDark/50 bg-[length:0px_6px]
                            hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                            Hello
                        </span>
                    </h1>
                </div>
                <p className="hidden sm:inline-block mt-4 md:text-lg lg:text-xl font-in">
                    desc
                </p>
            </div>
        </article>
    </div>

    <div className="bg-white w-full flex items-center justify-center">
        <div className="w-full p-8">
            <h2 className="text-2xl font-semibold text-center mb-8 text-black">All Stories</h2>
            <div className="flex flex-wrap justify-center">
                {story.map((item) => (
                    <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                        <Story
                            id={item.id}
                            title={item.title}
                            details={item.details}
                            locationOfFarm={item.locationOfFarm}
                            sizeOfCultivation={item.sizeOfCultivation}
                            durationToYield={item.durationToYield}
                            climaticConditions={item.climaticConditions}
                            geographicalConditions={item.geographicalConditions}
                            groundWaterSupply={item.groundWaterSupply}
                            externalWaterSupply={item.externalWaterSupply}
                            typeOfProduce={item.typeOfProduce}
                            name={item.name}
                            contact={item.contact}
                            communityBelongingTo={item.communityBelongingTo}
                            avgProductionExpenditure={item.avgProductionExpenditure}
                            images={item.images}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>

    {/* Footer */}
    <Footer />
</div>


  );
}
