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
                    <div className="flex relative items-center justify-between w-[330px] m-auto sm:px-10 sm:p-0 sm:w-[1201px] space-x-4">
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
                        <div className="flex-grow p-0 h-[1px] bg-gray-300 border-b-[1px] border-black -z-10 absolute sm:left-[82px] left-[45px] top-[15px] items-center w-[230px] sm:w-[1000px] "></div>
                        {/* Step 2 */}
                        <div className="flex items-center">
                            <div className="relative flex  flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex  items-center justify-center">
                                    <div className="w-3 h-3 bg-[#ff0000]  p-2 rounded-full"></div>
                                </div>
                                <span className="ml-2 text-center text-xs">Personal Details</span>
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

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10'>

                    <section>
                        <div className='my-6 sm:h-[515px] p-10 border flex  flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">PERSONAL DETAILS</h1>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                <InputField type="text" className=" " placeholder="First Name" />
                                <InputField type="text" className=" " placeholder="Last Name" />
                    <input className={` h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB]`} type="date" placeholder="Date of Birth" />
                                <select name="" id="" className={` h-[58px] pl-5 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB]`}>
                                    <option value="Gender">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="flex flex-row gap-5 items-center">
                                <ThemeButton text="Back"
                                    className='w-[121px] h-[55px] flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center text-[24px] !text-[#F1301E] !border-[#F1301E] border-2 !bg-[#fff]' />

                                <ThemeButton text="Next" className='w-[121px] h-[55px] flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]' />
                            </div>

                        </div>
                        {/*  */}
                        <div className='my-6 sm:h-[515px] p-10 border flex  flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">DOCUMENT VERIFICATION</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <InputField type="text" className="!w-[300px] "  placeholder="Enter PAN Number" />
                                <InputField type="text" className="!w-[300px]"  placeholder="Enter Driving License Number*" />
                                <InputField type="text" className="!w-[300px]"  placeholder="Enter AADHAR Number" />
                            </div>

                            <div className="flex flex-row gap-2 items-start px-2">
                                <span className='text-[#000000] font-bold text-[16px]'>NOTE:</span>
                                <p className="text-[16px]">You need to submit your Driving License and Aadhar card after making payment to confirm your car booking</p>
                            </div>
                        </div>
                        {/*  */}
                            <div className='my-6 h-[515px] p-10 border flex  flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">DELIVERY ADDRESS</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5"> 
                                <InputField type="text"  placeholder="Enter Address" className="" />
                                <div className="grid grid-cols-2 gap-5">
                                <InputField type="text" className=" "  placeholder="State" />
                                <InputField type="text" className="" placeholder="Pincode" />
                                </div>
                                
                            </div>

                            <div className="flex flex-row gap-5 items-start px-2">
                            <ThemeButton text="Back"
                                    className='w-[121px] h-[55px] flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center text-[24px] !text-[#F1301E] !border-[#F1301E] border-2 !bg-[#fff]' />

                                <ThemeButton text="Next" className='w-[121px] h-[55px] flex  flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]' />
                            </div>

                        </div>

                    </section>

                    <section>
                        <main className=" flex  flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-mdz">
                            <div className='w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex  justify-center items-center rounded-xl'>
                                <span className="text-center">Booking Summary</span>
                            </div>
                            <div className="m-auto my-5">
                                <span className="font-bold text-[24px]">
                                    Fare Details
                                </span>
                            </div>
                            <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Base Fare</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">₹ 5,229</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Doorstep delivery & pickup</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">₹ 500</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Insurance & GST</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">Included</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Refundable Deposit</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">₹ 3000</span>
                                </div>

                                <div className="grid grid-cols-2 w-fit gap-8 justify-center shadow-inner font-bold text-[30px]">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Total</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10 text-[#ff0000]">₹ 7686</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Kms Limit</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">₹ 506 kms</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Fuel</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">Excluded</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Extra kms charge</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">₹ 7/km</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[120px] sm:w-[220px] ml-10">Tolls,Parking & Inner-state taxes</span>
                                    <span className="w-[120px] sm:w-[220px] ml-10">To be paid by you</span>
                                </div>
                            </div>
                            <div className="m-auto">

                                <span className="flex flex-row my-5 mt-10 w-[340px]">
                                    <Image src="/png/offer.png" width={20} height={20} alt="offer" />
                                    <select name="offer" id="offer" className="border-0 outline-0 bg-transparent w-[405px]">
                                        <option value="View all promo coupons">View all promo coupons</option>
                                    </select>
                                </span>

                                <div className=" w-[340px] sm:w-[418px]  h-[53px] flex  flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                                    <input type="text" placeholder="DJF4D4F" className="w-[100%] border-0 outline-none pr-4 text-[#888787]" />
                                    <button className="text-[#ff0000]">Apply</button>
                                </div>

                                <div className="my-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] flex  flex-row items-center justify-between px-4 py-5 rounded-3xl">
                                    <div className="flex flex-col">
                                        <span>Total Amount</span>
                                        <span className="text-[#ff0000] p-0 text-[30px] font-bold">₹ 15,000</span>
                                    </div>
                                    <div>
                                        <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-[24px] font-bold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">Proceed</button>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col items-center border-[1.5px] w-[340px] sm:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                                <span className="font-bold text-[20px]">Pay ₹10,000 Now</span>
                                <span className="text-[#ff0000] font-bold text-[20px]">Balance on Delivery</span>
                            </div>
                        </main>
                    </section>



                </div>
            </main>
        </div>
    )
}
export default PersonalDetails;