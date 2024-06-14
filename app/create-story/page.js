'use client'

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import toast from "react-hot-toast"
import { db, storage } from "../firebase/config"
import Sidebar from "../sidebar"


export default function Page() {
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

      const [images, setImages] = useState([]);

  

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

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    // Check if total selected images exceed 5
    if (selectedImages.length > 5) {
        toast.error("You can upload a maximum of 5 images.");
        // Clear the selected files to prevent further processing
        e.target.value = null;
        return;
    }
    // Update the images state with the selected files
    setImages([...selectedImages]);
};
  

const onSubmit = async () => {
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

    const toastId = toast.loading("Creating story...");

    try {
        // Upload images to storage and get URLs
        const imageUrls = await Promise.all(images.map(async (image) => {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        }));

        const collectionRef = collection(db, "Stories");
        await addDoc(collectionRef, { ...story, images: imageUrls, timestamp: serverTimestamp() });

        // Clear the checkboxes
        setStory(prevStory => ({
            ...prevStory,
            typeOfProduce: []
        }));

        setImages([]);

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

        toast.success("Successfully Created New Story!", { id: toastId });
    } catch (e) {
        console.error(e);
        toast.error("Failed to create story. Please try again.", { id: toastId });
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


    return <div className="bg-gray-100 min-h-screen flex">
    {/* Sidebar */}
    <Sidebar />
  
    {/* Main Content */}
    <div className="flex-1 p-8">
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create Story</h2>
              </div>
              <div className="overflow-auto">
                <div>
                <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Title</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="title" 
                                        value={story.title} 
                                        onChange={e => setStory({...story, title:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Story</h5>
                                    <textarea 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        placeholder="story" 
                                        rows="4" 
                                        value={story.details} 
                                        onChange={e => setStory({...story, details:e.target.value})}
                                    ></textarea>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Location of Farm</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="locationOfFarm" 
                                        value={story.locationOfFarm} 
                                        onChange={e => setStory({...story, locationOfFarm:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Size of Cultivation</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="sizeOfCultivation" 
                                        value={story.sizeOfCultivation} 
                                        onChange={e => setStory({...story, sizeOfCultivation:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Duration to Yield</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="durationToYield" 
                                        value={story.durationToYield} 
                                        onChange={e => setStory({...story, durationToYield:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Climatic Conditions</h5>
                                    <select
                                                    className="w-full bg-green-200 rounded-md p-2 mb-2"
                                                    value={story.climaticConditions}
                                                    onChange={e => {
                                                        const selectedValue = e.target.value === "Select" ? null : e.target.value;
                                                        setStory({ ...story, climaticConditions: selectedValue });
                                                    }}
                                                >
                                                    {climaticOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Geographical Conditions</h5>
                                    <select
                                                    className="w-full bg-green-200 rounded-md p-2 mb-2"
                                                    value={story.geographicalConditions}
                                                    onChange={e => {
                                                        const selectedValue = e.target.value === "Select" ? null : e.target.value;
                                                        setStory({ ...story, geographicalConditions: selectedValue });
                                                    }}
                                                >
                                                    {geographicalOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Ground Water Supply</h5>
                                    <select
                                                    className="w-full bg-green-200 rounded-md p-2 mb-2"
                                                    value={story.groundWaterSupply}
                                                    onChange={e => {
                                                        const selectedValue = e.target.value === "Select" ? null : e.target.value;
                                                        setStory({ ...story, groundWaterSupply: selectedValue });
                                                    }}
                                                >
                                                    {groundWaterSupplyOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">External Water Supply</h5>
                                    <select
                                                    className="w-full bg-green-200 rounded-md p-2 mb-2"
                                                    value={story.externalWaterSupply}
                                                    onChange={e => {
                                                        const selectedValue = e.target.value === "Select" ? null : e.target.value;
                                                        setStory({ ...story, externalWaterSupply: selectedValue });
                                                    }}
                                                >
                                                    {externalWaterSupplyOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Type of Produce (upto 3)</h5>
                                    <div className="w-full bg-green-200 rounded-md p-2 mb-2">
                                    {produceOptions.map(option => (
                                        <label key={option} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={story.typeOfProduce.includes(option)}
                                            onChange={() => handleProduceCheckboxChange(option)}
                                        />
                                        <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    </div>

                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Name of Chief Owner/Farmer</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="name" 
                                        value={story.name} 
                                        onChange={e => setStory({...story, name:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Contact</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="contact" 
                                        value={story.contact} 
                                        onChange={e => setStory({...story, contact:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Community Belonging To</h5>
                                    <select
                                                    className="w-full bg-green-200 rounded-md p-2 mb-2"
                                                    value={story.communityBelongingTo}
                                                    onChange={e => {
                                                        const selectedValue = e.target.value === "Select" ? null : e.target.value;
                                                        setStory({ ...story, communityBelongingTo: selectedValue });
                                                    }}
                                                >
                                                    {communityOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Average Production Expenditure</h5>
                                    <input 
                                        className="w-full bg-green-200 rounded-md p-2 mb-2" 
                                        type="text" 
                                        placeholder="avgProductionExpenditure" 
                                        value={story.avgProductionExpenditure} 
                                        onChange={e => setStory({...story, avgProductionExpenditure:e.target.value})}
                                    />
                                    <h5 class="text-base font-semibold leading-6 text-gray-900 mb-2" id="modal-title">Images (upto 5)</h5>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />

                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <button 
                            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto" 
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    
                </div>
              </div>
          </div>
  </div>
  }