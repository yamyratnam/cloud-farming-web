'use client';
import Topbar from "@/app/topbar";
import { CurrencyRupeeIcon, LocationMarkerIcon, PhoneIcon, UserIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

export default function Page({ params }) {
    const [story, setStory] = useState(null);
    const id = params.slug;

    useEffect(() => {
        const docRef = doc(db, "Stories", id);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setStory({ ...docSnapshot.data(), id: docSnapshot.id, timestamp: docSnapshot.data().timestamp?.toDate().getTime() });
            } else {
                // Handle document not found
                console.error("No such document!");
            }
        });

        return unsubscribe;
    }, [id]);


    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <Topbar />
        
            {/* Main Content */}
            <div className="flex-1 p-8 mt-40">
                <div className="flex justify-between items-center mb-6">
                    <div 
                        className="rounded-md mb-4 w-full shadow-md h-96 flex flex-col justify-center items-center" 
                        style={{ 
                            backgroundImage: story && story.images && story.images.length > 0 ? `url(${story.images[0]})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <h2 className="text-6xl text-white font-semibold px-4 py-2 rounded-md">
                            {story ? story.title : 'Loading...'}
                        </h2>
                        <span className="text-white text-lg px-4 py-1 rounded-md mt-2">
                            Published on {story ? moment(story.timestamp).format("MMMM Do, YYYY") : 'Loading...'}
                        </span>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/3 flex flex-col space-y-4">
                        {/* Location Container */}
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <div className="flex items-center"> 
                                <LocationMarkerIcon className="h-10 w-10 m-2 stroke-green-500" />
                                <h3 className="text-lg font-semibold m-2">Location of Farm: {story?.locationOfFarm}</h3>
                            </div>
                        </div>
                        {/* Geographical Conditions */}
                        <div className="bg-white rounded-md p-8 shadow-md">
                            <h3 className="text-xl font-semibold">Geographical Conditions</h3>
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 rounded-md shadow-md" style={{ backgroundImage: `url('/assets/climate.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="bg-black bg-opacity-50 text-white font-semibold rounded-md p-4 h-full w-full">
                                        <h3 className="text-base">Climatic Conditions: {story?.climaticConditions}</h3>
                                    </div>
                                </div>
                                <div className="w-1/2 rounded-md shadow-md" style={{ backgroundImage: `url('/assets/climate.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="bg-black bg-opacity-50 text-white font-semibold rounded-md p-4 h-full w-full">
                                        <h3 className="text-base">Geographical Resources: {story?.geographicalConditions}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Water Resources */}
                        <div className="bg-white rounded-md p-8 shadow-md">
                            <h3 className="text-xl font-semibold">Water Resources</h3>
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 rounded-md shadow-md" style={{ backgroundImage: `url('/assets/water.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="bg-black bg-opacity-50 text-white font-semibold rounded-md p-4 h-full w-full">
                                        <h3 className="text-base">Ground Water Supply: {story?.groundWaterSupply}</h3>
                                    </div>
                                </div>
                                <div className="w-1/2 rounded-md shadow-md" style={{ backgroundImage: `url('/assets/water.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="bg-black bg-opacity-50 text-white font-semibold rounded-md p-4 h-full w-full">
                                        <h3 className="text-base">External Water Supply: {story?.externalWaterSupply}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Type of Produce */}
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h3 className="text-xl font-semibold">Type of Produce</h3>
                            {story?.typeOfProduce.map((item, index) => (
                                <div key={index} className="flex items-center"> 
                                    <ArrowSmRightIcon className="h-5 w-5 m-2 stroke-green-500 fill-green-500" />
                                    <h3 className="text-base m-2">{item}</h3>
                                </div>
                            ))}
                        </div>
                        {/* Owner Details */}
                        <div className="bg-white rounded-md p-8 shadow-md">
                            <h3 className="text-xl font-semibold">Owner Details</h3>
                            <div className="w-full bg-black bg-opacity-75 text-white rounded-md p-4 shadow-md mt-8 mb-8">
                                <div className="flex items-center"> 
                                    <UserIcon className="h-10 w-10 m-2 stroke-green-500" />
                                    <h3 className="text-base m-2">Name: {story?.name}</h3>
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 bg-black bg-opacity-75 text-white rounded-md p-4 shadow-md">
                                    <div className="flex items-center"> 
                                        <PhoneIcon className="h-5 w-5 m-2 stroke-green-500" />
                                        <h3 className="text-base m-2">Contact: {story?.contact}</h3>
                                    </div>
                                </div>
                                <div className="w-1/2 bg-black bg-opacity-75 text-white rounded-md p-4 shadow-md">
                                    <div className="flex items-center"> 
                                        <ArrowSmRightIcon className="h-5 w-5 m-2 stroke-green-500 fill-green-500" />
                                        <h3 className="text-base m-2">Community: {story?.communityBelongingTo}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Average Production Expenditure */}
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <div className="flex items-center"> 
                                <CurrencyRupeeIcon className="h-5 w-5 m-2 stroke-green-500" />
                                <h3 className="text-base font-semibold m-2">Avg Production Expenditure: {story?.avgProductionExpenditure}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col space-y-4">
                        {/* Story Section */}
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h3 className="text-xl font-semibold m-2">Story</h3>
                            <p className="text-gray-600 m-2 mt-16">{story?.details}</p>
                        </div>
                        {/* Gallery Section */}
                        <div className="rounded-md px-4 py-8">
                            <h3 className="text-3xl font-semibold m-2">Gallery</h3>
                            <div className="grid grid-cols-2 gap-4 mt-16">
                                {story?.images && story.images.length > 0 ? (
                                    story.images.map((image, index) => (
                                        <div 
                                            key={index} 
                                            className="w-full h-64 bg-gray-200 rounded-md overflow-hidden shadow-md transform transition duration-500 hover:scale-105 cursor-pointer"
                                            
                                        >
                                            <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 m-2">No images available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
