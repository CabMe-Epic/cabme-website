import React from 'react';

interface RadioProps {
    name?: string;
    id?: string;
    content?: string;
    checked?: boolean;
    onClick?: any;
    className?: string;
    iconSrc?: string;
    selected?: boolean; // Prop to indicate if the button is selected
}

const RadioButtonNew = ({
    name,
    id,
    content,
    checked,
    onClick,
    className,
    iconSrc,
    selected,
}: RadioProps) => {
    return (
        <div className={`flex gap-1 sm:gap-2 p-4 justify-center items-center w-[120px] sm:w-[150px] ${selected ? 'bg-white py-2 rounded-md w-full shadow-md transition-all duration-25 sm:min-w-[150px] sm:min-h-[60px]' : ''}`}
        onClick={onClick}>
            <input
                className="radio-button hidden"
                type="radio"
                name={name}
                id={id}
                checked={selected} // Use selected prop to control the checked state
                readOnly
                style={{ width: '30px', cursor: 'pointer' }}
            />
            {/* Render Icon with Conditional Shadow */}
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt={content}
                    className={`w-6 h-6 sm:w-10 sm:h-10 object-cover rounded-md cursor-pointer transition ${selected ? '' : ''
                        }`}
                />
            )}
            <label htmlFor={id} className={className} style={{ cursor: 'pointer', whiteSpace: "nowrap" }}>
                {content == "One-way" ? "One Way" : content == "Out-station" ? "Round Trip" : content}
            </label>
        </div>
    );
};

export default RadioButtonNew;
