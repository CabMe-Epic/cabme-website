import InputField from '@/app/components/input-field/input-field';
import ThemeButton from '@/app/components/theme-button/theme-button';
import React from 'react';
import Image from 'next/image';
import CountryInput from '@/app/components/country-input/country-Input';

const PersonalDetails = (props: any) => {
    return (
        <div>
            <main className='max-w-[1250px] m-auto'>
                {/*  */}
                <div className="flex items-center justify-start sm:justify-center mt-10">
                    <div className="flex relative items-center justify-between w-[374px] m-auto sm:px-0 sm:p-0 sm:w-[1201px] space-x-4">
                        {/* Step 1 */}
                        <div className="flex items-center">
                            <div className="relative flex  flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex  items-center justify-center">
                                    {/* <div className="w-3 h-3  p-2 rounded-full"></div> */}
                                    <Image src="/carDetails/done.png" width={20} height={20} alt="" />
                                </div>
                                <span className="ml-2 text-center text-xs">Login & Registration</span>
                            </div>
                        </div>
                        <div className="flex-grow p-0 h-[1px] bg-gray-300 border-b-[1px] border-black -z-10 absolute sm:left-[32px] left-[45px] top-[15px] items-center w-[270px] sm:w-[1100px] "></div>
                        {/* Step 2 */}
                        <div className="flex items-center">
                            <div className="relative flex  flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex  items-center justify-center">
                                    <div className="w-3 h-3 bg-[#ff0000]  p-2 rounded-full"></div>
                                </div>
                                {/* <span className="ml-2 text-center text-xs">Personal Details</span> */}
                                <span className="ml-2 text-center text-xs">Document Verification</span>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex items-center">
                            <div className="relative flex  flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex  items-center justify-center">
                                    <div className="w-3 h-3 p-2 rounded-full"></div>
                                </div>
                                <span className="ml-2 text-center text-xs">Payment Method</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}

                <div className='grid grid-cols-1 sm:grid-cols-[55%_45%] gap-0 mt-10'>

                    <section className='mx-auto'>
                        {/* <div className='my-6 p-6 sm:p-10 border flex flex-col items-center sm:gap-10 gap-4 rounded-lg shadow-md w-[390px] sm:w-full mx-auto'>
                            <div className=''>
                                <h1 className="text-[24px] sm:text-3xl font-bold">PERSONAL DETAILS</h1>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5 w-full">
                                <InputField type="text" className=" " placeholder="First Name" />
                                <InputField type="text" className=" " placeholder="Last Name" />
                                <input className={` h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB]`} type="date" placeholder="Date of Birth" />
                                <select name="" id="" className={` h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB]`}>
                                    <option value="Gender">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="flex flex-row gap-5 items-center sm:block hidden">
                                <ThemeButton text="Back"
                                    className='flex px-12 flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center text-md !text-[#F1301E] !border-[#F1301E] border-2 !bg-[#fff]' />

                                <ThemeButton text="Next" className='flex px-12 flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-md from-[#F1301E] to-[#FA4F2F]' />
                            </div>

                        </div> */}

                        {/* <div className='my-6 sm:w-full sm:p-10 border flex flex-col items-center rounded-lg shadow-md sm:mx-auto mx-4 p-4'>
                            <div className=''>
                                <h1 className="text-[24px] sm:text-3xl font-bold sm:mb-10 mb-6">DOCUMENT VERIFICATION</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:gap-5 w-full">
                                <InputField type="text" placeholder="Enter PAN Number" />
                                <InputField type="text" placeholder="Enter Driving License Number*" />
                                <InputField type="text" placeholder="Enter AADHAR Number" />
                            </div>

                            <div className="flex flex-row gap-2 items-start sm:px-8 sm:px-2 mt-4 mb-4">
                                <span className='text-[#000000] font-bold text-[16px]'>NOTE:</span>
                                <p className="sm:text-[16px] text-sm text-justify">You need to submit your Driving License and Aadhar card after making payment to confirm your car booking</p>
                            </div>
                        </div> */}

                        {/* <div className='my-6 h-[345px] sm:w-full sm:h-fit p-6 sm:p-10 border flex  flex-col items-center justify-center gap-10 rounded-lg shadow-md mx-4 sm:mx-0'>
                            <div className=''>
                                <h1 className=" text-[24px] sm:text-3xl font-bold">DELIVERY ADDRESS</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:gap-5 w-full">
                                <InputField type="text" placeholder="Enter Address" className="mb-4" />
                                <div className="grid grid-cols-2 gap-2 sm:gap-5 w-full">
                                    <InputField type="text" className=" " placeholder="State" />
                                    <InputField type="text" className="" placeholder="Pincode" />
                                </div>

                            </div>

                            <div className="flex flex-row gap-5 items-start px-2">
                                <ThemeButton text="Back"
                                    className='px-12 flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center text-md !text-[#F1301E] !border-[#F1301E] border-2 !bg-[#fff]' />

                                <ThemeButton text="Next" className='px-12 flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-md from-[#F1301E] to-[#FA4F2F]' />
                            </div>

                        </div> */}

                    </section>

                    <section className='px-4'>
                        <main className="flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md p-4 shadow-custom-shadow border">
                            <div className='w-[280px] sm:w-[376px] h-[50px] bg-black text-white font-semibold text-[18px] sm:text-[20px] flex justify-center items-center rounded-xl'>
                                <span className="text-center">Booking Summary</span>
                            </div>
                            <div className="m-auto my-5">
                                <span className="font-bold text-md sm:text-[24px]">
                                    Fare Details
                                </span>
                            </div>
                            <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className=" ">Base Fare</span>
                                    <span className=" ">₹ 5,229</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Doorstep delivery & pickup</span>
                                    <span className="  ">₹ 500</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Insurance & GST</span>
                                    <span className="  ">Included</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Refundable Deposit</span>
                                    <span className="  ">₹ 3000</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-8 justify-center shadow-custom-inner font-bold text-lg py-2 sm:text-2xl">
                                    <span className="  ">Total</span>
                                    <span className="   text-[#ff0000]">₹ 7686</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Kms Limit</span>
                                    <span className="  ">₹ 506 kms</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Fuel</span>
                                    <span className="  ">Excluded</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Extra kms charge</span>
                                    <span className="  ">₹ 7/km</span>
                                </div>

                                <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[2fr_1fr] gap-4 sm:gap-14 justify-center">
                                    <span className="  ">Tolls, Parking & Inner-state taxes</span>
                                    <span className="  ">To be paid by you</span>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <span className="flex flex-row my-5 mt-10 w-full">
                                    <Image src="/png/offer.png" width={20} height={20} alt="offer" />
                                    <select name="offer" id="offer" className="border-0 outline-0 bg-transparent sm:w-full">
                                        <option value="View all promo coupons">View all promo coupons</option>
                                    </select>
                                </span>

                                <div className=" h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded items-center bg-white px-4 w-full">
                                    <input type="text" placeholder="DJF4D4F" className="w-full border-0 outline-none pr-4 text-[#888787]" />
                                    <button className="text-[#ff0000]">Apply</button>
                                </div>

                                <div className="mt-8 mb-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] xs:px-6 flex flex-row items-center justify-between px-4 py-5 rounded-3xl w-full">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className='text-sm'>Total Amount</div>
                                        <div className="text-[#ff0000] p-0 text-[24px] sm:text-[30px] text-sm nowrap font-bold">₹ 15,000</div>
                                    </div>
                                    <div>
                                        <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] xs:text-[20px] text-md sm:text-[24px] font-semibold text-white sm:w-[150px] w-[110px] sm:w-[178.31px] xs:h-[45px] h-[36px] sm:h-[53.08px] rounded-full drop-shadow-lg">Checkout</button>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col items-center border-[1.5px] w-full sm:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                                <span className="font-bold text-[18px] sm:text-[20px]">Pay ₹10,000 Now</span>
                                <span className="text-[#ff0000] font-semibold text-[18px] sm:text-[20px]">Balance on Delivery</span>
                            </div>
                        </main>
                    </section>



                </div>
            </main>
        </div>
    )
}
export default PersonalDetails;