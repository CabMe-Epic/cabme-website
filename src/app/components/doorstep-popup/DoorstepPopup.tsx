import React, { useState } from 'react';

interface PackageItem {
    location: string;
    subLocation?: string;
    price: string | number;
}

interface DropLocationProps {
    currentPackage: PackageItem[];
    onSelectItem?: (item: PackageItem | null) => void; // Add this prop
}

const DropLocation: React.FC<DropLocationProps> = ({ currentPackage, onSelectItem }) => {
    const [selectedItem, setSelectedItem] = useState<PackageItem | null>(null);

    const handleSelectItem = (item: PackageItem) => {
        setSelectedItem(item);
        if (onSelectItem) {
            onSelectItem(item); // Call the callback function
        }
    };

    return (
        <div className="bg-white shadow-md max-w-[900px] w-[340px] md:w-[600px] rounded-xl">
            <h2 className="text-xl font-semibold text-black mb-4 p-4 pb-0">Drop Location</h2>
            <div className="bg-[#ff0000] text-white p-2 py-4">
                <div className="flex justify-between text-xl mx-4">
                    <span className="font-semibold">Location</span>
                    <span className="font-semibold">Cost</span>
                </div>
            </div>
            <div className="bg-white divide-y divide-gray-200 rounded-xl">
                {currentPackage?.map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => handleSelectItem(item)} // Handle item selection
                        className={`p-4 mx-2 flex justify-between cursor-pointer text-sm ${selectedItem === item ? 'bg-gray-100' : ''}`}
                    >
                        <div>
                            <p className="font-semibold text-gray-700">{item.location}</p>
                            <p className="text-gray-500 font-[400]">{item.subLocation || 'N/A'}</p>
                        </div>
                        <p className="text-gray-500">₹{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropLocation;
