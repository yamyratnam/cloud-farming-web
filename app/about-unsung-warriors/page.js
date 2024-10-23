'use client'
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Footer from '../footer';
import Topbar from '../topbar';

const people = [
  {
    name: "Dr. YV Malla Reddy",
    subtitle: "Fullbright Fellow",
    info: "Director of Accion Fraterna Ecology Centre and Board Member, RDT Ananthapur. Having 30+ years of experience in empowering farming and rural communities,       Dr Reddy secured PhD in Management Studies and pioneered in empowering livelihoods of the farmers, rural women. He aims to digitally advance the scope of farming, rural entrepreneurship and skilling among the youth.",
    photo: "/assets/malla.jpg",
  },
  {
    name: "Mr. Har Sahay Meena",
    subtitle: "IAS",
    info: "Principal Secretary to the Government of Tamilnadu (special initiatives and planning department), Mr Meena has been in the civil service for 28+ years. Secured a MSc in Public Policy and Management from King’s College London, he has an acute interest towards history, museums and Rajasthani folk music. He aims to strive for the entrepreneurial upliftment of the tribal communities in Rajasthan and other parts of India.",
    photo: "/assets/har.jpg",
  },
  {
    name: "Mr. Stephen Anurag Prathipati",
    subtitle: "AKC",
    info: "NISG Project Officer in Meghalaya (department of planning, health & family welfare and MIG), Mr Stephen led to the inception of Yes We Can, We the People India Trust and NSWS. He has been awarded Clinton Global Initiative Award 2020 and recipient of King’s International Scholarship in 2019. He secured MSc in Public Policy and Management from King’s College London and is a pioneer in advocating localizing SDGs and establishing digital platforms for discussion labs at educational institutions. He was a co-initiator of a maiden Startup in teaching foreign languages way back in 2015.",
    photo: "/assets/stephen.jpg",
  },
  {
    name: "Mr. Ramesh Susarla",
    info: "Communications Officer, AF Ecology Centre, Anantapur and former reporter The Hindu. Having 19+ years of experience in print journalism and editorials, Mr Ramesh evolved into nature and bird photography. He has been facilitating media and communications to advance farmer entrepreneurial activities and climate resilient, organic and natural farming projects for AF.",
    photo: "/assets/ramesh.jpg",
  },
  {
    name: "Mr. Mysuru Subramanya Rao",
    subtitle: "ISS",
    info: "Deputy Director General, NSSO (Ministry of Statistics, Planning & Implementation), with interest towards public policy research and international affairs, Mr Rao secured a MSc in Public Policy and Management from King’s College London. He promotes Fit India campaign through sports and running marathons.",
    photo: "/assets/msrao.jpg",
  },
  {
    name: "Mr. Boya Tribhuvan Teja",
    info: "Director, Myriad Concepts & Strategies, Neem Tree Group of Hotels, Anantapur with an industry experience of 10+ years in management, hospitality, tourism and semi-urban entrepreneurship models. Mr Teja has co-founded Yes We Can and MAFL in Vizag and has evolved his interest towards youth in political participation and community service. ",
    photo: "/assets/boya.jpg",
  },
  {
    name: "Ms. Yamini Ratnam",
    subtitle: "IIITDMJ",
    info: "A graduate of computer science engineering from Indian Institute of Information Technology, Design and Manufacturing Jabalpur, Ms Yami interned with Myriad Concepts & Strategies and facilitated in the development of digital platforms for the joint initiative of Cloud Farming.",
    photo: "/assets/yamini.jpg",
  },
  {
    name: "Mr. Prem Praveen",
    subtitle: "IIM",
    info: "A graduate of Management Sciences from Indian Institute of Management Raipur, having served in Berger Paints Groups as a regional business head. Mr Prem has deep dive interest towards youth in civil services and engaging strategic academic and research approaches towards marketing in the commercial sector.",
    photo: "/assets/prem.jpg",
  },
  {
    name: "Mr. Akhil Ravikumar",
    info: "A young entrepreneur based in Bangalore and a graduate in MSc Strategic Entrepreneurship & Innovation at the King’s College London. Mr Ravi has experience in real-estate, business lobby and mining. Heading a large corporation in Karnataka employing 1000+ individuals, he is interested in social entrepreneurship, innovation and community service.",
    photo: "/assets/akhil.jpg",
  },
  {
    name: "Mr. Sumit Dubey",
    info: "Director and COO at YAVA UK, based in Kolkata and a graduate in MSc Banking & Finance at the King’s College London, Mr Dubey explores in the field of investments, equity fund and banking sector. He is interested in social entrepreneurship and community service.",
    photo: "/assets/sumit.jpg",
  },
  {
    name: "Mr. Akash Poddar",
    info: "A graduate in MSc Strategic Entrepreneurship & Innovation at the King’s College London, Mr Poddar is a founding Business Manager at a Material Science firm in Bangalore. He is interested in social entrepreneurship and community service.",
    photo: "/assets/akash.jpg",
  },
  {
    name: "Mr. Pranav Krishna",
    info: "A food and restaurant chain entrepreneur based in Vizag, Mr Krishna graduated in MSc Banking & Finance at the King’s College London. He is interested in social entrepreneurship and community service.",
    photo: "/assets/pranav.jpg",
  },
  {
    name: "Mr. Sahil Abdul Khader",
    info: "General Secretary, We the People India Trust, Mr Sahil is a recent graduate in political science, history and economics from St. Aloysius College, Mangalore. He has 3+ years in trade, fisheries, infrastructure delivery, think-tanks, youth parliaments, digital asset management and NGOs. He is interested in social entrepreneurship and community service.",
    photo: "/assets/sahil.jpg",
  },
  {
    name: "Mr. Siraj Peremogar",
    info: "Facilitator of We the People India Trust, Mr Siraj pursued master's in human resources development and commerce at Mangalore University. He has 5+ years experience in pharmaceuticals, logistics, supply, management and civil contracts.",
    photo: "/assets/siraj.jpg",
  },
];

export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();

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
              <h1 className="text-white font-semibold text-6xl">
                WARRIORS
              </h1>
            </div>
          </div>
        </article>
      </div>
      
      {/* People Section */}
    <div className="w-full max-w-5xl mt-10 px-6 sm:px-12">
    {people.map((person, index) => (
        <div
        key={index}
        className={`flex items-center border border-gray-300 rounded-lg p-4 mb-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
        >
        <div className="w-1/3">
            <img
            src={person.photo}
            alt={person.name}
            className="rounded-lg object-cover w-full h-80" // Fixed height for square shape
            />
        </div>
        <div className="w-2/3 ml-4">
            <h2 className="text-xl font-semibold">{person.name}</h2>
            {person.subtitle && <h3 className="text-md text-gray-600">{person.subtitle}</h3>}
            <p className="mt-4 text-gray-800">{person.info}</p>
        </div>
        </div>
    ))}
    </div>


      {/* Footer */}
      <Footer />
    </div>
  );
}
