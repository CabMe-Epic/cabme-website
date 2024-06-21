import React from 'react'

const DescCar = ({desc}: any) => {
    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md max-w-[1250px] border">
            <h2 className="text-2xl font-semibold mb-4 border-b-[1px] pb-4 border-grey-100">Description of Car</h2>
            <div className="">

                <div className="flex flex-col items-start justify-center gap-4 text-sm">
                    <div className="flex flex-col items-center gap-6 text-[#6B6767]">
                        <p>{desc} </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DescCar;
