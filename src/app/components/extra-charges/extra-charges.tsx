import React from 'react'

const ExtraCharges = () => {
  return (
    <div>
          <div className=" mx-auto p-6 bg-white rounded-lg shadow-md max-w-[1250px] border">
          <h2 className="text-2xl font-bold mb-4 border-b-[1px] pb-4 border-grey-100">Extra Services</h2>
          <div className="grid grid-cols-3 gap-4">

            <div className="flex flex-col items-start justify-center gap-4 pr-3 border-r-[2px]">
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Package Type</span>
                <span className='text-[#ff0000]'>30 Kms/day</span>
              </div>
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Free kms for Rental</span>
                <span className='text-[#ff0000]'>900 kms</span>
              </div>
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Extra kms charges at</span>
                <span className='text-[#ff0000]'>9/km</span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 pr-3 border-r-[2px]">
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Package Type</span>
                <span className='text-[#ff0000]'>30 Kms/day</span>
              </div>
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Free kms for Rental</span>
                <span className='text-[#ff0000]'>900 kms</span>
              </div>
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Extra kms charges at</span>
                <span className='text-[#ff0000]'>9/km</span>
              </div>
            </div>

            <div className="flex flex-col  items-center justify-center gap-4 pr-3 ">
              <div className="flex items-center gap-4">
                <span className='text-[#6B6767]'>Baby Seat-₹350/-</span>
              </div>

            </div>
          </div>
        </div>
          <div className=" max-w-[1250px] my-5 mx-auto">
          <span className="text-[#6B6767]">
            Extra kms will be charged at <span className="text-[#ff0000]">13/km</span>
          </span>
          </div>
    </div>
  )
}

export default ExtraCharges;