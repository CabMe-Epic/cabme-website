import React, { useState } from 'react';

const locations = [
  { name: 'Amritsar', image: '/images/amritsar.png' },
  { name: 'Agra', image: '/images/agra.png' },
  { name: 'Jaipur', image: '/images/jaipur.png' },
  { name: 'Hyderabad', image: '/images/hyderabad.png' },
  { name: 'Udaipur', image: '/images/udaipur.png' },
  { name: 'Mumbai', image: '/images/mumbai.png' },
];

const SelectOption = () => {
  const [selected, setSelected] = useState(locations[0]);

  return (
    <div className="relative inline-block w-64">
      <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
        Pickup Location
      </label>
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span className="flex items-center">
          <img src={selected.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
          <span className="ml-3 block truncate">{selected.name}</span>
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </span>
      </button>
      <ul
        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        // tabIndex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {locations.map((location, index) => (
          <li
            key={index}
            className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
              selected.name === location.name ? 'text-white bg-indigo-600' : 'text-gray-900'
            }`}
            id={`listbox-option-${index}`}
            role="option"
            onClick={() => setSelected(location)}
          >
            <div className="flex items-center">
              <img src={location.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
              <span
                className={`ml-3 block truncate ${
                  selected.name === location.name ? 'font-semibold' : 'font-normal'
                }`}
              >
                {location.name}
              </span>
            </div>
            {selected.name === location.name && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
