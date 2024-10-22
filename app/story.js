import moment from "moment";
import { useRouter } from 'next/navigation';

const Story = ({
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

    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/stories/${id}`);
    };

    const firstImage = images && images.length > 0 ? images[0] : 'No Image'; // Change to your "No Image" path

    return (
        <div className="mt-8 border border-gray-300">
            <div onClick={(e) => seeMore(id, e)} className="rounded-md cursor-pointer p-4 mb-4 transition-all duration-300 hover: group">
                <div className="mb-4 overflow-hidden rounded-md">
                    <img src={firstImage} alt={title} className="w-full h-80 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl text-black font-semibold mb-2">
                        <span className="bg-gradient-to-r from-yellow-500 to-yellow-500 bg-[length:0%_4px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_4px] transition-all duration-500">
                            {title}
                        </span>
                    </h3>
                </div>
                <p className="text-gray-600 mt-4">
                    {details.split(' ').slice(0, 15).join(' ')}{details.split(' ').length > 15 ? ' ...' : ''}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-500">Published on {moment(timestamp).format("MMMM Do, YYYY")}</span>
                </div>
            </div>
        </div>
    );
};

export default Story;
