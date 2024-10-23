'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Image from 'next/image'; // Importing the Image component
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Footer from '../footer';
import Story from '../story';
import Topbar from '../topbar';

export default function Page() {
    const router = useRouter();
    const [story, setStory] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 10000); // Change slide every 10 seconds
  
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };
  
    const slides = [
      {
        image: '/assets/hero4.png', // Slide 1 image
        title: 'FARMER STORIES',
        subtitle: 'FRESH FROM THE FIELD: FARMER\'S STORIES',
      },
      {
        image: '/assets/hero1.jpg', // Slide 2 image
        title: 'ORGANIC FARMING',
      },
      {
        image: '/assets/hero2.jpg', // Slide 3 image
        title: 'NATURAL FARMING',
      },
      {
        image: '/assets/hero3.jpg', // Slide 4 image
        title: 'CLIMATE RESILIENT FARMING',
      },
      {
        image: '/assets/3.jpg', // Slide 5 image
        title: 'EVENTS',
      },
    ];
    
    const images = [
      "/assets/1.jpg",
      "/assets/2.jpg",
      "/assets/3.jpg",
      "/assets/4.jpg",
      "/assets/5.jpg",
      "/assets/6.jpg"
    ];
  
    const [currentPage, setCurrentPage] = useState(1);
    const storiesPerPage = 10; // Number of stories to display per page
    const totalPages = Math.ceil(story.length / storiesPerPage); // Total number of pages
  
    const openModal = (index) => {
      setCurrentImageIndex(index);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  
      const collectionRef = collection(db, "Stories");
      const q = query(collectionRef, orderBy("timestamp", "desc"));
  
      const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
        const Stories = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }));
        setStory(Stories);
      });
  
      return () => {
        unsubscribeAuth();
        unsubscribeSnapshot();
      };
    }, [isLoggedIn]);
  
    // Calculate stories to display on the current page
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = story.slice(indexOfFirstStory, indexOfLastStory);
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div className="relative min-h-screen flex flex-col items-center">
        {/* Top Bar */}
        <Topbar />
  
        {/* Hero Section */}
        <div className="w-full relative mt-20">
        <article className="relative flex items-center justify-start h-[80vh] sm:h-[90vh] w-full">
          <img 
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-center object-cover rounded-none"
            style={{ zIndex: -1 }} 
          />
          <div className="absolute inset-0 h-full" />
  
          {/* Overlay Text Section */}
          <div className="relative z-10 ml-40 p-8 text-black w-full max-w-4xl flex flex-col items-start">
            <div className="bg-stone-700 bg-opacity-50 px-2 py-2 mt-10 w-fit">
              <h1 className="text-white font-semibold text-6xl">
                {slides[currentSlide].title}
              </h1>
            </div>
            <div className="bg-lime-800 px-8 py-2 mt-20 w-fit">
              <p className="text-white font-semibold text-md">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>
  
          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full">
            &#10094; {/* Left Arrow */}
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full">
            &#10095; {/* Right Arrow */}
          </button>
        </article>
      </div>
  
        {/* All Stories Section */}
        <div id="all-stories" className="bg-white w-full flex items-center justify-center">
            <div className="w-full p-8">
              <h2 className="text-2xl font-semibold text-center text-black">Farmer Stories</h2>
              <div className="flex flex-wrap justify-center">
                {currentStories.map((item) => (
                  <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                    <Story
                      id={item.id}
                      title={item.title}
                      timestamp={item.timestamp}
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
  
          {/* Conditional Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mb-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
  
          {/* Event Section */}
          <h2 id="events" className="text-2xl font-semibold text-center text-black">Events</h2>
          <div className="bg-gray-100 w-full flex items-center justify-center mt-10 p-8">
            <div className="flex flex-col sm:flex-row w-full max-w-5xl">
              {/* Left Side: Images */}
              <div className="w-full grid grid-cols-2 gap-4 p-4">
                {images.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    width={400}
                    height={300}
                    alt={`Event Image ${index + 1}`}
                    className="rounded-lg shadow-md cursor-pointer"
                    onClick={() => openModal(index)} // Open modal on click
                  />
                ))}
              </div>
  
              {/* Right Side: Info */}
              <div className="w-full sm:w-1/2 flex flex-col justify-center p-4">
                <h3 className="text-xl font-bold">Giving Back to Local Communities</h3>
                <h3 className="text-md font-semibold">Mar 31, 2024</h3>
                <p className="mt-2 text-gray-800">
                  A historic day well spent with community natural farmers in the most drought-prone area Ananthapur of Rayalaseema in Andhra Pradesh.
                </p>
                <p className="mt-2 text-gray-800">
                  ~ 50+ community farmers supported by an Accion Fraterna (Ecology Centre) led by Dr. YV Malla Reddy of Rural Development Trust (RDT) engaged in our third Kings Global Day of Service organized by King's College London Alumni Community Hyderabad.
                </p>
                <p className="mt-2 text-gray-800">
                  ~ Mrs. Manda Krishnamma and Mr. Anjaneyulu from Raminepalli village in Rapthadu bagged 🏆 for best practicing community farming interventions.
                </p>
                <p className="mt-2 text-gray-800">
                  ~ A soft launch of a mobile app was initiated to capture happy & success stories and technological interventions in the farming sector practiced by community farmers in Ananthapur.
                </p>
              </div>
            </div>
          </div>
  
        {/* Modal for Full View Image */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative w-full max-w-xl">
              <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
              </button>
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2" onClick={prevImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
              </button>
              <Image
                src={images[currentImageIndex]}
                width={800} // Adjust width as needed
                height={600} // Adjust height as needed
                alt={`Event Image ${currentImageIndex + 1}`}
                className="rounded-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={nextImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Download App Section */}
      <section className="bg-white w-full flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl">
          {/* Play Store Link and Text */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-left">
            <h2 className="text-6xl font-semibold text-left text-black mb-20">
              Download Our App on Play Store!
            </h2>
            <a href="https://play.google.com/store/apps/details?id=com.ywcglobal.affarmingcommunity" target="_blank" rel="noopener noreferrer" className="text-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
              </svg>
            </a>
            <h3 className="text-2xl font-bold mt-4">Get it on Google Play</h3>
          </div>

          {/* Mobile Screenshot */}
          <div className="w-full md:w-1/2 p-4 flex justify-center">
            <Image
              src="/assets/mobile.png" // Replace with your actual mobile screenshot path
              alt="Mobile App Screenshot"
              width={300} // Adjust width as needed
              height={600} // Adjust height as needed
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  }
  