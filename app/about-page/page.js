'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Footer from '../footer';
import Topbar from '../topbar';

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
              <h1 className="text-white font-semibold text-6xl">ABOUT</h1>
            </div>
          </div>
        </article>
      </div>

      {/* Accion Fraterna Ecology Centre */}
      <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center">
        <Image
          src="/assets/accion.jpg"
          width={150} // Adjust the width as necessary
          height={150} // Adjust the height as necessary
          alt="Accion Fraterna Icon"
          className="mr-2"
        />
        Accion Fraterna Ecology Centre (RDT)
      </h2>
      <div className="w-full max-w-4xl mt-10 px-6 sm:px-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>Accion Fraterna (AF)</strong> is a Trust founded by Father Vincent Ferrer in 1982, actively involved in people’s empowerment through natural resource management (NRM), watershed development, drought management, environmental development, and policy advocacy.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            AF is a sister organization of the <strong>Rural Development Trust (RDT)</strong>, a well-known NGO in India. RDT focuses on multi-sectoral development programs, supporting <em>dalits</em>, tribals, women, the physically & mentally challenged, and other disadvantaged communities.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            RDT’s initiatives span horticulture, agriculture, rainwater harvesting, and rural infrastructure. Meanwhile, Accion Fraterna focuses on sustainable agriculture, watershed development, non-farm employment, ecology, and environmental issues.
          </p>
        </div>
      </div>

      {/* Yes We Can Youth Organization */}
      <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center">
        <Image
          src="/assets/yeswecan.png"
          width={150}
          height={150}
          alt="Yes We Can Icon"
          className="mr-2 bg-white"
        />
        Yes We Can Youth Organization (YWC)
      </h2>
      <div className="w-full max-w-4xl mt-10 px-6 sm:px-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>Yes We Can Youth Organization (YWC)</strong> is a youth-run organization established in 2015 in the coastal city of <strong>Vizag, Andhra Pradesh</strong>. 
            It is a pioneer in localizing the <strong>United Nations Sustainable Development Goals (SDGs)</strong> in the Telugu region by creating a positive impact among students, youth, and women from marginalized communities.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            With <strong>3,000+ youth</strong>, <strong>1,500+ students</strong>, and <strong>4 SDG Labs</strong>, YWC has organized <strong>10+ such as International Fleet Review, Conventions, BRICS summit, MUNs, Youth Parliaments</strong>, and <strong>25+ community engagement initiatives</strong>. 
            It also undertakes <strong>paralegal literacy</strong> and <strong>girl students' capacity-building projects</strong>.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            YWC stands tall as a lighthouse, empowering the stories of unsung heroes through youth civic engagement, while advocating for <strong>adventure</strong> and <strong>scientific temper</strong>.
          </p>
        </div>
      </div>

      {/* King's College London Alumni Community */}
      <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center">
        <Image
          src="/assets/kings.png"
          width={150}
          height={150}
          alt="King's College Icon"
          className="mr-2 bg-white"
        />
        King's College London Alumni Community Hyderabad (KCLAHyd)
      </h2>
      <div className="w-full max-w-4xl mt-10 px-6 sm:px-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800 leading-relaxed">
            Serving the regions of <strong>Telugu</strong> and <strong>Kannada</strong> States of Andhra Pradesh, Telangana, and Karnataka, alumni from the recent graduate batches have laid a platform to explore <strong>#giving back to the local communities</strong> through civic partnerships.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            Founded in <strong>2021</strong>, the alumni community functions in a unique style, engaging alums in supporting study materials and basic school stationery for children from tribal, indigenous, and orphanage backgrounds. They also facilitate digital interventions to advance farming approaches and practices, and inspire sports among rural youth.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            This is one of the most vibrant UK Alumni groups in India, composed of senior bureaucrats, quasi-government personnel, entrepreneurs, and private sector employees.
          </p>
        </div>
      </div>

      {/* We The People India Trust */}
      <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center">
        <Image
          src="/assets/wtp.png"
          width={150}
          height={150}
          alt="We The People Icon"
          className="mr-2"
        />
        We the people India, Trust (WTP)
      </h2>
      <div className="w-full max-w-4xl mt-10 px-6 sm:px-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800 leading-relaxed">
            A sister concern of <strong>Yes We Can</strong>, We The People India, Trust (WTP) was established in <strong>2023</strong> in the coastal city of <strong>Mangalore</strong> by a group of students in law, political science, and philosophy.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            As a not-for-profit Trust registered under 80 G/12 A tax exemption, the organization's motive revolves around advocating socio-economic, political, and environmental acumen among rural women and youth. 
            WTP does not promote any political ideology or party; rather, it envisions empowering women's participation in rural and semi-urban governance through capacity building, aiming for <strong>Planet 50:50 by 2030</strong>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
