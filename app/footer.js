import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

const Footer = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <footer className="mt-16 w-full flex flex-col items-center text-white bg-lime-700">
            <div className="flex flex-col sm:flex-row w-full justify-center space-y-8 sm:space-y-0 sm:space-x-8 mt-4"> {/* Space between sections */}
                {/* Part 1: Contact Us */}
                <div className="flex-1 px-4 py-6 text-left border-r border-dotted border-white last:border-0 max-w-xs">
                    <h3 className="font-medium capitalize text-2xl sm:text-3xl lg:text-4xl">
                        Contact Us
                    </h3>
                    <p className="mt-4 text-sm sm:text-base font-light">
                        For inquiries, reach out to us at: <br />
                        <a href="mailto:in.ywcglobal@gmail.com" className="underline">in.ywcglobal@gmail.com</a>
                    </p>

                    {/* Social Media Icons Section */}
                    <div className="mt-12 flex space-x-4">
                        {/* Facebook Icon */}
                        <a 
                            href="https://www.facebook.com/ywcglobal.org" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="relative group hover:scale-105 transition-transform"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="white" 
                                className="w-16 h-16"
                            >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                            {/* Tooltip */}
                            <span 
                                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Facebook
                            </span>
                        </a>

                        {/* Twitter Icon */}
                        <a 
                            href="https://x.com/YesWeCan_Org" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="relative group hover:scale-105 transition-transform"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="white" 
                                className="w-16 h-16"
                            >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                            {/* Tooltip */}
                            <span 
                                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Twitter
                            </span>
                        </a>

                    </div>

                    {/* Instagram Section */}
                    <p className="mt-4 text-sm sm:text-base font-light">Connect with us on Instagram:</p>
                    <div className="mt-4 flex space-x-8">
                        {/* Instagram Profile 1 */}
                    <a 
                        href="https://www.instagram.com/yeswecan_org/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative group"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                            <Image 
                                src="/assets/connect1.jpg" 
                                alt="Instagram Profile 1" 
                                layout="fill" 
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Instagram Icon Container */}
                        <div 
                            className="absolute bottom-0 right-0 bg-white p-1 rounded-full"
                            style={{ width: '28px', height: '28px' }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="#E4405F" 
                                className="w-8 h-8 flex items-center justify-center"
                            >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                            </svg>
                        </div>
                    </a>
                    {/* Instagram Profile 2 */}
                    <a 
                        href="https://www.instagram.com/wethepeople__india/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative group"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                            <Image 
                                src="/assets/connect2.jpg" 
                                alt="Instagram Profile 2" 
                                layout="fill" 
                                className="object-cover"
                            />
                        </div>
                        <div 
                        className="absolute bottom-0 right-0 bg-white p-1 rounded-full"
                        style={{ width: '28px', height: '28px' }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="#E4405F" 
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>
                    </div>
                    </a>
                </div>

                {/* Youtube Section */}
                <p className="mt-8 text-sm sm:text-base font-light">Connect with us on Youtube:</p>
                    <div className="mt-4 flex space-x-8">
                        {/* Youtube Profile 1 */}
                    <a 
                        href="https://www.youtube.com/@YesWeCan_youthorg" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative group"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                            <Image 
                                src="/assets/connect1.jpg" 
                                alt="Youtube Profile 1" 
                                layout="fill" 
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Youtube Icon Container */}
                        <div 
                            className="absolute bottom-0 right-0 bg-white p-1 rounded-full"
                            style={{ width: '28px', height: '28px' }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="#FF0000" 
                                className="w-8 h-8 flex items-center justify-center"
                            >
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                            </svg>
                        </div>
                    </a>
                    {/* Youtube Profile 2 */}
                    <a 
                        href="https://www.youtube.com/@WethePeopleIndia_Org" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative group"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                            <Image 
                                src="/assets/connect2.jpg" 
                                alt="Youtube Profile 2" 
                                layout="fill" 
                                className="object-cover"
                            />
                        </div>
                        <div 
                        className="absolute bottom-0 right-0 bg-white p-1 rounded-full"
                        style={{ width: '28px', height: '28px' }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="#FF0000" 
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                        </svg>
                    </div>
                    </a>
                </div>
                </div>




                {/* Part 2: Content */}
                <div className="flex-1 px-4 py-6 text-left border-r border-dotted border-white last:border-0 max-w-xs">
                    <h3 className="font-medium capitalize text-2xl sm:text-3xl lg:text-4xl">
                        Content
                    </h3>
                    <div className="mt-4 text-left">
                        <Link href="/home-page" className='block hover:text-blue-500 cursor-pointer rounded-md p-2'>
                            <span>Home</span>
                        </Link>
                        <Link href="/home-page#all-stories" className='block hover:text-blue-500 cursor-pointer rounded-md p-2'>
                            <span>Farmer Stories</span>
                        </Link>
                        <Link href="/home-page#events" className='block hover:text-blue-500 cursor-pointer rounded-md p-2'>
                            <span>Events</span>
                        </Link>
                        <Link href="/about-page" className='block hover:text-blue-500 cursor-pointer rounded-md p-2'>
                            <span>About</span>
                        </Link>
                    </div>
                    
                    {/* Images Section */}
                    <div className="mt-8 grid grid-cols-2 gap-4"> {/* 2x2 grid layout with space between images */}
                        <Image
                            src="/assets/kings.png" // Adjust the path as needed
                            width={100} // Adjust for correct dimensions
                            height={100}
                            alt="Kings logo"
                            className="bg-white" // Full width and auto height
                        />
                        <Image
                            src="/assets/accion.png" // Adjust the path as needed
                            width={100} // Adjust for correct dimensions
                            height={100}
                            alt="Accion logo"
                            className="bg-white" // Full width and auto height
                        />
                        <Image
                            src="/assets/yeswecan.png" // Adjust the path as needed
                            width={100} // Adjust for correct dimensions
                            height={100}
                            alt="Yes We Can logo"
                            className="bg-white" // Full width and auto height
                        />
                        <Image
                            src="/assets/connect2.jpg" // Adjust the path as needed
                            width={100} // Adjust for correct dimensions
                            height={100}
                            alt="WTP logo"
                            className="bg-white" // Full width and auto height
                        />
                    </div>
                </div>


                {/* Part 3: Sign Up */}
                <div className="flex-1 px-4 py-6 text-left max-w-xs"> {/* No border on the last section */}
                    <h3 className="font-medium capitalize text-2xl sm:text-3xl lg:text-4xl">
                        Sign Up
                    </h3>
                    <p className="mt-4 text-sm sm:text-base font-light">
                        Join us here: <br />
                    </p>
                    <div className="mt-4 text-left">
                        <ul className="flex space-x-4">
                            <li onClick={() => {
                                signOut(auth);
                                router.push('/user-portal');
                            }}
                                className="text-white flex items-center p-2 rounded-md hover:bg-yellow-700 cursor-pointer">
                                <span className='px-2'>Register</span>
                                <span className="text-white-500 px-2 py-2 rounded-md">
                                    <button className="text-white-500 rounded-md flex items-center justify-center">
                                        <ArrowCircleRightIcon className="h-8 w-8" />
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <h4 className="font-medium capitalize text-lg mt-2">
                        Admin?
                    </h4>
                    <div className="text-left">
                        <ul className="flex space-x-4">
                            <li onClick={() => {
                                signOut(auth);
                                router.push('/permit-admin-portal');
                            }}
                                className="text-white flex items-center p-2 rounded-md hover:bg-yellow-700 cursor-pointer">
                                <span className='px-2'>Enter</span>
                                <span className="text-white-500 rounded-md">
                                    <button className="text-white-500 rounded-md flex items-center justify-center">
                                        <ArrowCircleRightIcon className="h-8 w-8" />
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-lime-800 w-full mt-16 py-6 px-8 border-t border-solid border-light flex items-center justify-center">
                <span className="text-center text-xs">
                    &copy;2024 Cloud Farming. All rights reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
