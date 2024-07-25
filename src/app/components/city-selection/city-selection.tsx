import Image from 'next/image';
import React from 'react';

const City = ({ city, isSelected, onClick }: any) => {
    // Find the matching city option

    return (
        <div
            className={`flex flex-row gap-4 bg-[#F9F9F9] m-1 items-center p-2 cursor-pointer rounded-lg w-auto sm:w-[500px] `}
            onClick={() => onClick(city.name)}
        >
            <span className={`border-2 flex justify-center items-center  border-[#FF0000] w-[30px] h-[30px] rounded-full`}>
                <span className={`m-auto ${isSelected ? '   w-[18px] h-[18px] rounded-full bg-[#FF0000] ' : 'border-2 border-transparent  '}`}>
                </span>
            </span>
            <Image
                src={city?.image}
                alt={city.name}
                width={100}
                height={100}
                className="w-12 h-12 p-.5 border rounded-md"
            />
            <p className="mt-2 text-sm font-[600]">{city?.name}</p> 
        </div>
    );
};

export default City;
