'use client';

import Sidebar from "@/app/sidebar";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/solid";
import { doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth, db, storage } from "../../firebase/config";

export default function Page({ params }) {
    const [story, setStory] = useState({
        title: '',
        details: '',
        locationOfFarm: '', 
        sizeOfCultivation: '', 
        durationToYield: '', 
        climaticConditions: '', 
        geographicalConditions: '', 
        groundWaterSupply: '', 
        externalWaterSupply: '', 
        typeOfProduce: [],
        name: '', 
        contact: '', 
        communityBelongingTo: '', 
        avgProductionExpenditure: '',
        images: []
    });
    const id = params.slug;

    const router = useRouter();

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

    useEffect(() => {
        const docRef = doc(db, "Stories", id);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setStory({ ...docSnapshot.data(), id: docSnapshot.id, timestamp: docSnapshot.data().timestamp?.toDate().getTime() });
            } else {
                console.error("No such document!");
            }
        });

        return unsubscribe;
    }, [id]);

    const handleProduceCheckboxChange = (option) => {
        const isChecked = story.typeOfProduce.includes(option);
        if (isChecked) {
            setStory(prevStory => ({
                ...prevStory,
                typeOfProduce: prevStory.typeOfProduce.filter(item => item !== option)
            }));
        } else if (story.typeOfProduce.length < 3) {
            setStory(prevStory => ({
                ...prevStory,
                typeOfProduce: [...prevStory.typeOfProduce, option]
            }));
        } else {
            toast.error("You can select up to 3 produce types.", {
                duration: 1500
            });
        }
    };

    const updateStory = async () => {
        if (story?.hasOwnProperty('timestamp')) {
            const requiredFields = ['title', 'details', 'locationOfFarm', 'sizeOfCultivation', 'durationToYield', 'climaticConditions', 'geographicalConditions', 'groundWaterSupply', 'externalWaterSupply', 'typeOfProduce', 'name', 'contact', 'communityBelongingTo', 'avgProductionExpenditure'];
            const emptyFields = requiredFields.filter(field => !story[field]);
            if (emptyFields.length > 0) {
                toast.error(`Please fill out all required fields: ${emptyFields.join(', ')}`);
                return;
            }

            const dropdownFields = ['climaticConditions', 'geographicalConditions', 'groundWaterSupply', 'externalWaterSupply', 'typeOfProduce', 'communityBelongingTo'];
            const invalidDropdowns = dropdownFields.filter(field => story[field] === 'Select');
            if (invalidDropdowns.length > 0) {
                toast.error(`Please select an option for: ${invalidDropdowns.join(', ')}`);
                return;
            }

            if (story.details.split(/\s+/).length > 500) {
                toast.error("Details field should have up to 500 words.");
                return;
            }

            if (isAdmin) {
                const docRef = doc(db, "Stories", story.id);
                const storyUpdated = { ...story, timestamp: serverTimestamp() };
                await updateDoc(docRef, storyUpdated);
                toast.success("Updated Story");
                handleCloseUpdateForm();
            } else {
                toast.error("You do not have permission to update this story.");
            }
        }
    };

    const handleCloseUpdateForm = () => {
        router.back();  // Navigate back to the previous page or close the form
    };

    const handleAddImage = async (event) => {
        if (story.images.length >= 5) {
            toast.error("You can only upload up to 5 images.");
            return;
        }
    
        const file = event.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
            try {
                const snapshot = await uploadBytes(storageRef, file);
                const url = await getDownloadURL(snapshot.ref);
                setStory(prevStory => ({
                    ...prevStory,
                    images: [...prevStory.images, url]
                }));
            } catch (error) {
                toast.error("Failed to upload image.");
            }
        }
    };
    

    const handleDeleteImage = (index) => {
        setStory(prevStory => ({
            ...prevStory,
            images: prevStory.images.filter((_, i) => i !== index)
        }));
    };

    const climaticOptions = [
        "Select",
        "Hot and Humid",
        "Hot and Dry",
        "Mild and Humid",
        "Mild and Dry",
        "Cool and Humid",
        "Cool and Dry",
        "Cold and Humid",
        "Cold and Dry"
    ];
    const geographicalOptions = [
        "Select",
        "Flat",
        "Hilly",
        "Mountainous",
        "Coastal",
        "Riverine",
        "Arid",
        "Forested",
        "Wetland"
    ];
    const groundWaterSupplyOptions = [
        "Select",
        "Open Wells",
        "Borewells",
        "Tube Wells",
        "Farm Ponds"
    ];
    const externalWaterSupplyOptions = [
        "Select",
        "Surface Water (Rivers and Streams)",
        "Tank Irrigation",
        "Lift Irrigation",
        "Drip Irrigation",
        "Canal Water",
        "Rainwater Harvesting"
    ];
    const produceOptions = [
        "Select",
        "Maize",
        "Paddy",
        "Black gram",
        "Green gram",
        "Horse gram",
        "Red gram",
        "Bajra",
        "Jowar",
        "Finger Millet",
        "Groundnut",
        "Chilies",
        "Cotton",
        "Castor",
        "Pomegranate",
        "Sweet orange",
        "Banana",
        "Onion",
        "Vegetables",
        "Arecanut",
        "Grapes",
        "Papaya",
        "Korra",
        "Andu Korra",
        "Saamulu",
        "Tomatoes",
        "Muskmelon"
    ];    
    const communityOptions = [
        "Select",
        "SC",
        "ST",
        "BC",
        "OC",
        "Minorities"
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-8 mt-40">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-8">
                                            Update Story
                                        </h3>
                                        <div className="mt-2 w-full">
                                            <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                Title
                                            </h3>
                                            <div className="w-full mt-4">
                                                <input
                                                    value={story.title}
                                                    onChange={(e) => setStory({ ...story, title: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                                                    placeholder="Title"
                                                />
                                            </div>
                                            <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                Story
                                            </h3>
                                            <div className="w-full mt-4">
                                                <textarea
                                                    value={story.details}
                                                    onChange={(e) => setStory({ ...story, details: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                                                    placeholder="Story"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Location of Farm
                                                </h3>
                                                <input
                                                    value={story.locationOfFarm}
                                                    onChange={(e) => setStory({ ...story, locationOfFarm: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Location of Farm"
                                                />
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Size of Cultivation
                                                </h3>
                                                <input
                                                    value={story.sizeOfCultivation}
                                                    onChange={(e) => setStory({ ...story, sizeOfCultivation: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Size of Cultivation"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Duration to Yield
                                                </h3>
                                                <input
                                                    value={story.durationToYield}
                                                    onChange={(e) => setStory({ ...story, durationToYield: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Duration to Yield"
                                                />
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Climatic Conditions
                                                </h3>
                                                <select
                                                    value={story.climaticConditions}
                                                    onChange={(e) => setStory({ ...story, climaticConditions: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                >
                                                    {climaticOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Geographical Conditions
                                                </h3>
                                                <select
                                                    value={story.geographicalConditions}
                                                    onChange={(e) => setStory({ ...story, geographicalConditions: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                >
                                                    {geographicalOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Ground Water Supply
                                                </h3>
                                                <select
                                                    value={story.groundWaterSupply}
                                                    onChange={(e) => setStory({ ...story, groundWaterSupply: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                >
                                                    {groundWaterSupplyOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    External Water Supply
                                                </h3>
                                                <select
                                                    value={story.externalWaterSupply}
                                                    onChange={(e) => setStory({ ...story, externalWaterSupply: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                >
                                                    {externalWaterSupplyOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <div className="flex flex-col mt-1">
                                                    <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                        Type of Produce
                                                    </h3>
                                                    <div className="flex flex-wrap">
                                                        {produceOptions.map((option, index) => (
                                                            <label key={index} className="mr-2 mt-2">
                                                                <input
                                                                    type="checkbox"
                                                                    value={option}
                                                                    checked={story.typeOfProduce.includes(option)}
                                                                    onChange={() => handleProduceCheckboxChange(option)}
                                                                />
                                                                <span className="ml-1">{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Name
                                                </h3>
                                                <input
                                                    value={story.name}
                                                    onChange={(e) => setStory({ ...story, name: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Name"
                                                />
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Contact
                                                </h3>
                                                <input
                                                    value={story.contact}
                                                    onChange={(e) => setStory({ ...story, contact: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Contact"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Community Belonging To
                                                </h3>
                                                <select
                                                    value={story.communityBelongingTo}
                                                    onChange={(e) => setStory({ ...story, communityBelongingTo: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                >
                                                    {communityOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                    Average Production Expenditure
                                                </h3>
                                                <input
                                                    value={story.avgProductionExpenditure}
                                                    onChange={(e) => setStory({ ...story, avgProductionExpenditure: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Avg Production Expenditure"
                                                />
                                            </div>
                                            <div className="mt-4 flex flex-col">
                                                <h3 className="text-sm font-medium leading-6 text-gray-900 mb-2">
                                                    Images
                                                </h3>
                                                <div className="flex flex-wrap items-center">
                                                    {story.images.map((image, index) => (
                                                        <div key={index} className="relative m-2">
                                                            <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover rounded" />
                                                            <button
                                                                onClick={() => handleDeleteImage(index)}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-4"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {story.images.length < 5 && (
                                                        <label className="m-2 cursor-pointer">
                                                            <PlusCircleIcon className="w-10 h-10 text-gray-500" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleAddImage}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    onClick={updateStory}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCloseUpdateForm}
                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
