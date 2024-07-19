import Image from "next/image";
import React, { useState } from "react";

const locations = [
    { name: "Jaipur", image: "/images/jaipur.svg" },
    { name: "Udaipur", image: "/images/udaipur.svg" },
    { name: "Jodhpur", image: "/images/jodhpur.svg" },
    { name: "Delhi NCR", image: "/images/delhi.svg" },
    { name: "Bangalore", image: "/images/bengluru.svg" },
];

const SelectOption = ({ cities = locations }) => {
    const [selected, setSelected] = useState(locations[0]);
    const [toggle, setToggle] = useState(false);
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropOffLocation, setDropOffLocation] = useState("");
    const [heading, setHeading] = useState("pickup");

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggle(!toggle);

        if(heading == "pickup"){
            setHeading("dropOff");
        }else{
            setHeading("pickup");
        }
    

    };

    const handleLocationSelect = (location: any, e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        if (heading === "pickup") {
            setPickupLocation(location.name);
            setHeading("dropOff");
        } else {
            setDropOffLocation(location.name);
            setHeading("pickup");
        }
        setSelected(location);
        setToggle(false);
    };

    const findLocationImage = (locationName: any) => {
        const location = locations.find((loc) => loc.name === locationName);
        return location ? location.image : "/images/default.svg";
    };

    const locationName = selected.name;
    const imageUrl = findLocationImage(locationName);

    console.log(pickupLocation, 'locp', dropOffLocation, "locd")

    return (
        <div className="relative inline-block w-[200px]">
            <button
                type="button"
                className="relative w-full bg-white rounded-md pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm"
                onClick={handleToggle}
            >
                <span className="flex items-center">
                    <Image
                        src={imageUrl}
                        alt={selected.name}
                        width={100}
                        height={100}
                        className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                    </svg>
                </span>
            </button>

            <ul
                className={`absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm ${!toggle ? "hidden opacity-0" : "block opacity-100"}`}
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
            >
                {cities.map((location, index) => (
                    <li
                        key={index}
                        className={`cursor-default select-none relative py-2 pl-3 pr-9 ${selected.name === location.name ? "text-black" : "text-gray-900"}  `}
                        id={`listbox-option-${index}`}
                        role="option"
                        onClick={(e) => handleLocationSelect(location, e)}
                    >
                        <div className="flex items-center">
                            <Image
                                src={findLocationImage(location.name) || ""}
                                alt={location.name}
                                width={24}
                                height={24}
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span
                                className={`ml-3 block truncate ${selected.name === location.name ? "font-semibold" : "font-normal"}`}
                            >
                                {location.name}
                            </span>
                        </div>
                        {selected.name === location.name && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5 9l3 3 7-7-1.5-1.5L8 9.5 6.5 8z"
                                    />
                                </svg>
                            </span>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default SelectOption;
