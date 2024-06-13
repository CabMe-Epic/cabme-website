"use client"
import React, { useState } from 'react';

const InputField = ({ type, placeholder, className }: any) => {
    return (
        <div>
            <input className={`w-[494px] h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB] ${className}`} type={type} placeholder={placeholder} />
        </div>
    );
}

export default InputField;
