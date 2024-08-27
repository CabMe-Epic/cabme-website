"use client"
import React, { useState, useEffect, useRef } from 'react';

const InputField = ({ type, placeholder, className, name, otp, onChange }: any) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        console.log("key");
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          event.preventDefault();
        }
      };
    
      const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        console.log(event.key, "event.key");
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          event.preventDefault();
    
    
        }
      };

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
          event.preventDefault();
          console.log('Wheel event detected');
        };
    
        const inputElement = inputRef.current;
        if (inputElement) {
          // Cast the input element to any to satisfy TypeScript
          (inputElement as any).addEventListener('wheel', handleWheel, { passive: false });
    
          return () => {
            (inputElement as any).removeEventListener('wheel', handleWheel);
          };
        }
      }, []);
    return (

        <input className={` w-full  h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB] ${className}`}
            type={type}
            ref={inputRef}
            value={otp}
            name={name}
            onKeyUp={handleOnKeyUp}
            onKeyDown={handleOnKeyDown}
            onChange={onChange}
            placeholder={placeholder}
        />

    );
}

export default InputField;
