import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";

const Modal = ({ onClose, children, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <Fragment>
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="relative">
                            <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
                                <XIcon className="h-6 w-6" />
                            </button>
                            <div>{children}</div>
                            {images.length > 1 && (
                                <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                                    <button onClick={goToPrevious} className="absolute left-0 m-4 text-gray-500 hover:text-gray-700">
                                        <ArrowLeftIcon className="h-6 w-6" />
                                    </button>
                                    <button onClick={goToNext} className="absolute right-0 m-4 text-gray-500 hover:text-gray-700">
                                        <ArrowRightIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="fixed inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;
