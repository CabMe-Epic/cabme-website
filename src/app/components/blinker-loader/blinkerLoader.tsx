import React from 'react';
import Image from 'next/image';

const BlinkerLoader = () => {
  return (
    <div className="flex fixed left-0 top-0 z-[10000] items-center justify-center h-screen w-screen bg-gray-100">
      <div className="animate-blink">
        <Image src="/logo.svg" alt="Logo" width={200} height={200} />
      </div>
    </div>
  );
};

export default BlinkerLoader;
