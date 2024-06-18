"use client"
import React, { useState } from 'react';

const InputField = ({ type, placeholder, className }: any) => {
    return (
        
            <input className={ ` w-full  h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB] ${className}`} type={type} placeholder={placeholder} />
        
    );
}

export default InputField;
