import React from 'react';
import Image from 'next/image';

const BlinkerLoader = () => {
  return (
    <div className="flex fixed left-0 top-0 z-[10000] items-center justify-center h-screen w-screen bg-[#0000009f]">
      <div className="animate-spin">
        <Image src="/loaderRound.png" alt="Logo" width={50} height={50} />
      </div>
    </div>
  );
};

export default BlinkerLoader;
