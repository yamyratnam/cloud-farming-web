import { ArrowRightIcon, TrashIcon } from '@heroicons/react/solid';
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from "react-hot-toast";
import { auth, db } from "./firebase/config"; // Ensure auth is imported from your firebase config

const AdminStory = ({
    id,
    timestamp,
    title,
    details,
    locationOfFarm,
    sizeOfCultivation,
    durationToYield,
    climaticConditions,
    geographicalConditions,
    groundWaterSupply,
    externalWaterSupply,
    typeOfProduce,
    name,
    contact,
    communityBelongingTo,
    avgProductionExpenditure,
    images
}) => {
    const router = useRouter();
    const [updateForm, setUpdateForm] = useState(false);
    const [story, setStory] = useState({
        id,
        timestamp,
        title,
        details,
        locationOfFarm,
        sizeOfCultivation,
        durationToYield,
        climaticConditions,
        geographicalConditions,
        groundWaterSupply,
        externalWaterSupply,
        typeOfProduce,
        name,
        contact,
        communityBelongingTo,
        avgProductionExpenditure,
        images
    });
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

    const handleCloseUpdateForm = () => {
        setUpdateForm(false);
    };

    const handleOpenUpdateForm = () => {
        if (isAdmin) {
            setUpdateForm(true);
        } else {
            toast.error("You do not have permission to update this story.");
        }
    };

    const deleteStory = async (id, e) => {
        e.stopPropagation();
        if (isAdmin) {
            const docRef = doc(db, "Stories", id);
            await deleteDoc(docRef);
            toast.success("Successfully Deleted Story");
        } else {
            toast.error("You do not have permission to delete this story.");
        }
    };

    const handleProduceCheckboxChange = (option) => {
        const isChecked = story.typeOfProduce.includes(option);
        if (isChecked) {
          // If already checked, remove it
          setStory(prevStory => ({
            ...prevStory,
            typeOfProduce: prevStory.typeOfProduce.filter(item => item !== option)
          }));
        } else if (story.typeOfProduce.length < 3) {
          // If less than 3 checked, add it
          setStory(prevStory => ({
            ...prevStory,
            typeOfProduce: [...prevStory.typeOfProduce, option]
          }));
        } else {
          // If more than 3 checked, show toast error
          toast.error("You can select up to 3 produce types.", {
            duration: 1500 // Toast will disappear after 3 seconds
          });
        }
      };

    const updateStory = async () => {
        if(story?.hasOwnProperty('timestamp')) {
            // Check if any required field is empty
            const requiredFields = ['title', 'details', 'locationOfFarm', 'sizeOfCultivation', 'durationToYield', 'climaticConditions', 'geographicalConditions', 'groundWaterSupply', 'externalWaterSupply', 'typeOfProduce', 'name', 'contact', 'communityBelongingTo', 'avgProductionExpenditure'];
            const emptyFields = requiredFields.filter(field => !story[field]);
            if (emptyFields.length > 0) {
                toast.error(`Please fill out all required fields: ${emptyFields.join(', ')}`);
                return;
            }

            // Check if any dropdown is not selected
            const dropdownFields = ['climaticConditions', 'geographicalConditions', 'groundWaterSupply', 'externalWaterSupply', 'typeOfProduce', 'communityBelongingTo'];
            const invalidDropdowns = dropdownFields.filter(field => story[field] === 'Select');
            if (invalidDropdowns.length > 0) {
                toast.error(`Please select an option for: ${invalidDropdowns.join(', ')}`);
                return;
            }

            // Check details field word count
            if (story.details.split(/\s+/).length > 500) {
                toast.error("Details field should have up to 500 words.");
                return;
            }

            // Update story
            if (isAdmin) {
                const docRef = doc(db, "Stories", story.id);
                const storyUpdated = { ...story, timestamp: serverTimestamp() };
                await updateDoc(docRef, storyUpdated);
                setStory({ 
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
                });
                toast.success("Updated Story");
                handleCloseUpdateForm();
            } else {
                toast.error("You do not have permission to update this story.");
            }
        }
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

    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/stories/${id}`);
    };

    const handleOpen = (id, e) => {
        e.stopPropagation();
        router.push(`/update-story/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const firstImage = images && images.length > 0 ? images[0] : 'No Image'; // Change to your "No Image" path

    return (
        <div className="mt-8 bg-white">
            <div className="bg-white rounded-md p-4 mb-4 shadow-md">
            <div className="mb-4 overflow-hidden rounded-md flex items-center justify-center">
                    <img src={firstImage} alt={title} className="h-80 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl text-black font-semibold mb-2">{title}</h3>
                    <button onClick={(e) => seeMore(id, e)} className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center">
                        <ArrowRightIcon className="h-5 w-5 mr-1" />
                    </button>
                </div>
                <p className="text-gray-600">
                    {details.split(' ').slice(0, 15).join(' ')}{details.split(' ').length > 15 ? ' ...' : ''}
                </p>

                <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500">Published on {moment(timestamp).format("MMMM Do, YYYY")}</span>
                {isAdmin && (
                    <div className="flex items-center">
                        <button onClick={(e) => handleOpen(id, e)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Update</button>
                        <button onClick={(e) => deleteStory(id, e)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center">
                            <TrashIcon className="h-5 w-5 mr-1" />
                            Delete
                        </button>
                    </div>
                )}
                </div>
            </div>
            {updateForm && (
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
                                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                                    placeholder="Details"
                                                    rows={6}
                                                ></textarea>
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
            )}
        </div>
    );
};

export default AdminStory;
