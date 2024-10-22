'use client';
import Image from 'next/image'; // Import Image component
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Footer from '../footer';
import Topbar from '../topbar';

export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Array of image sources
  const images = [
    '/assets/g.png', // Replace with your actual image paths
    '/assets/b.png',
    '/assets/c.png',
    '/assets/d.png',
    '/assets/e.png',
    '/assets/f.png',
    '/assets/a.png',
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Top Bar */}
      <Topbar />

      {/* Hero Section */}
      <div className="w-full relative mt-60">
        <article className="relative flex items-center justify-start h-[20vh] w-full">
          <div className="absolute inset-0 h-full" />
          {/* Overlay Text Section */}
          <div className="relative z-10 ml-40 p-8 text-black w-full max-w-4xl flex flex-col items-start">
            <div className="bg-stone-700 bg-opacity-50 px-2 py-2 mt-10 w-fit">
              <h1 className="text-white font-semibold text-6xl">GRAPHS</h1>
            </div>
          </div>
        </article>
      </div>

      {/* Images Section */}
      <div className="w-full p-8 grid grid-cols-2 gap-6"> {/* Responsive grid */}
        {images.map((src, index) => (
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={500} // Set to a size to maintain aspect ratio
              height={500} // Set to a size to maintain aspect ratio
              className="object-cover transition-transform duration-300 hover:scale-105" // Add hover effect
              onClick={() => openModal(index)} // Open modal on click
            />
        ))}
      </div>

      {/* Modal for Full View Image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-full max-w-lg">
            <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>
            </button>
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2" onClick={prevImage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg>
            </button>
            <Image
              src={images[currentImageIndex]}
              width={800} // Adjust width as needed
              height={400} // Adjust height as needed
              alt={`Event Image ${currentImageIndex + 1}`}
              className="rounded-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={nextImage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
