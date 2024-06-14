'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Footer from '../footer';
import Topbar from '../topbar';



export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for team members
const teamMembers = [
  { image: '/assets/1.png', name: 'Stephen Anurag, AKC', description: 'President,\nKing\'s Alumni Community' },
  { image: '/assets/2.png', name: 'Dr. Y.V. Malla Reddy', description: 'Description' },
  { image: '/assets/3.png', name: 'Har Sahay Meena, IAS', description: 'Vice-President,\nKing\'s Alumni \nCommunity' },
  { image: '/assets/4.png', name: 'Akhil Ravi', description: 'King\'s Alumnus & \nEntrepreneur' },
  { image: '/assets/5.png', name: 'Gopi Krishna', description: 'King\'s Alumnus & \nEducationist' },
  { image: '/assets/6.png', name: 'Sumit Dubey', description: 'Treasurer,\nKing\'s Alumni Community' },
  { image: '/assets/7.png', name: 'Subramanya Rao, ISS', description: 'King\'s Alumnus &\nDirector, DoPT, Govt of India' },
  { image: '/assets/8.png', name: 'Pranav Krishna', description: 'Secretary,\nKing\'s Alumni Community' },
  { image: '/assets/9.png', name: 'Akash Poddar', description: 'King\'s Alumnus &\nManagement Consultant' },
  // Add more members as needed
];

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === teamMembers.length - 1 ? 0 : prevSlide + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? teamMembers.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === teamMembers.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentSlide, teamMembers.length]);

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      {/* Top Bar */}
      <Topbar />

      {/* Team Members Carousel */}
      <div className="relative w-full h-96 overflow-hidden mt-56">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-300 transform ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Image on the Left */}
            <div className="w-1/2 h-full p-16 border-r-2 border-t-2 border-solid border-black">
              <img src={member.image} alt={member.name} className="w-full h-full object-contain" />
            </div>

            {/* Name and Description on the Right */}
            <div className="w-1/2 h-full flex flex-col border-t-2 border-solid border-black justify-center items-center pl-4">
              <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
              <p className="text-gray-600">{member.description}</p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* Icons */}
      <div className="flex justify-center items-center bg-black bg-opacity-50 w-full p-2">
        {teamMembers.map((member, index) => (
          <div key={index} className="mx-8 cursor-pointer relative overflow-hidden">
            <div className="w-20 h-20 rounded-full border-2 border-solid border-white">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full rounded-full object-cover transition-transform transform hover:scale-90"
                onClick={() => setCurrentSlide(index)}
              />
            </div>
          </div>
        ))}
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
}
