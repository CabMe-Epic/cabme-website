"use client"
import InputField from '@/app/components/input-field/input-field';
import ThemeButton from '@/app/components/theme-button/theme-button';
import React, { useState } from 'react';
import Image from 'next/image';
import CountryInput from '@/app/components/country-input/country-Input';

const PaymentPage = (props: any) => {
    const [openOption, setOpenOption] = useState(null);

    const toggleOption = (option: any) => {
        if (openOption === option) {
            setOpenOption(null);
        } else {
            setOpenOption(option);
        }
    };
    return (
        <div>
            <main className='max-w-[1250px] m-auto'>
                {/*  */}
                <div className="flex relative items-center justify-center mt-10 w-[100%] overflow-hidden pr-5">
                    <div className="border-b-[1px] absolute -z-10 left-[5%] top-4 border-black w-[88%]"></div>
                    <div className="flex  items-center justify-between w-[1200px] space-x-4 ">
                          {/* Step 1 */}
                          <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-[1px] border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <Image src="/carDetails/done.png" width={20} height={20} alt="" />
                                </div>
                                <span className="ml-2 text-xs text-center">Login & Registration</span>
                            </div>
                        </div>
                       
                        {/* Step 2 */}
                        <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-[1px] border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <Image src="/carDetails/done.png" width={20} height={20} alt="" />
                                </div>
                                <span className="ml-2 text-xs text-center">Personal Details</span>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-[1px] border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-3 h-3 p-2 bg-[#ff0000] rounded-full"></div>
                                </div>
                                <span className="ml-2 text-xs text-center">Payment Method</span>
                            </div>
                        </div>
                  
                    </div>
                </div>
                {/*  */}
                

                <div className=' flex flex-row flex-wrap justify-center gap-10 mt-10'>

                    <section>
                        <div className='my-6 p-6 md:p-10 border flex flex-col items-center justify-center gap-6 md:gap-10 rounded-lg shadow-md'>
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-center">CHOOSE PAYMENT METHOD</h1>
                            </div>

                            <div className="max-w-full md:max-w-[588px] w-full md:w-[488px] mx-auto bg-white rounded-lg p-4">
                                <h2 className="text-lg md:text-xl font-semibold mb-4 relative overflow-hidden">Pay Online <span className="border-b-[1px] border-[#000000] w-full absolute top-3 left-32"></span></h2>

                                <div className="border-b-[1px] py-2 border-[#000000] flex flex-row my-2 pb-4 items-center gap-2">
                                    <div><Image className="mt-1" src="/carDetails/upi.png" width={50} height={50} alt="upi" /></div>
                                    <div className="w-full">
                                        <select className="block outline-0 w-full mt-1 rounded-md">
                                            <option value="">UPI (GPay/PhonePay/Paytm)</option>
                                            <option value="gpay">Google Pay</option>
                                            <option value="phonepay">PhonePay</option>
                                            <option value="paytm">Paytm</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border-b-[1px] py-2 border-[#000000] flex flex-row my-2 pb-4 items-center gap-2">
                                    <div>
                                        <Image className="mt-1" src="/carDetails/wallet.png" width={20} height={20} alt="wallet" />
                                    </div>
                                    <div className="w-full">
                                        <select className="block outline-0 w-full mt-1 rounded-md">
                                            <option value="">Wallet</option>
                                            <option value="wallet1">Wallet 1</option>
                                            <option value="wallet2">Wallet 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border-b-[1px] border-[#000000] py-2 flex flex-row my-2 pb-4 items-center gap-2">
                                    <div>
                                        <Image className="mt-1" src="/carDetails/netbanking.png" width={20} height={20} alt="netbanking" />
                                    </div>
                                    <div className="w-full">
                                        <select className="block outline-0 w-full mt-1 rounded-md">
                                            <option value="">Net Banking</option>
                                            <option value="bank1">Bank 1</option>
                                            <option value="bank2">Bank 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="border-b-[1px] border-[#000000] py-2 flex flex-row my-2 pb-4 items-center gap-2">
                                    <div>
                                        <Image className="mt-1" src="/carDetails/debitcard.png" width={20} height={20} alt="debitcard" />
                                    </div>
                                    <div className="w-full">
                                        <select className="block outline-0 w-full mt-1 rounded-md">
                                            <option value="">Debit/Credit Card</option>
                                            <option value="visa">Visa</option>
                                            <option value="mastercard">MasterCard</option>
                                            <option value="amex">American Express</option>
                                        </select>
                                    </div>
                                </div>
                                <h2 className="relative text-lg md:text-xl font-semibold mt-4 mb-2 overflow-hidden">Pay Cash<span className="border-b-[1px] border-[#000000] w-full absolute top-3 left-32"></span></h2>
                                <div className="py-2 border-b-[1px] mb-10 border-[#000000] pb-2 flex flex-row items-center gap-2">
                                    <div>
                                        <Image className="mt-1" src="/carDetails/cash.png" width={20} height={20} alt="cash" />
                                    </div>
                                    <div className="w-full">
                                        <select className="block outline-0 w-full mt-1 rounded-md">
                                            <option value="">Cash</option>
                                            <option value="cash">Pay with Cash</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <InputField type="text" className="w-full " placeholder="Credit Card Number" />
                                    <div className="flex flex-col md:flex-row item-center gap-2">
                                        <div className="w-full"><InputField type="text" className="w-full" placeholder="CVV" /></div>
                                        <div className="w-full"><InputField type="text" className="w-full" placeholder="Expiry Date" /></div>
                                    </div>
                                    <InputField type="text" className="w-full" placeholder="Name on Card" />
                                </div>
                            </div>
                        </div>
                    </section>


                    <section>
                        <main className="flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md p-4 ">
                            <div className='w-[300px] md:w-[376px] h-[50px] bg-black text-white font-bold text-[18px] md:text-[20px] flex justify-center items-center rounded-xl'>
                                <span className="text-center">Booking Summary</span>
                            </div>
                            <div className="m-auto my-5">
                                <span className="font-bold text-[20px] md:text-[24px]">
                                    Fare Details
                                </span>
                            </div>
                            <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Base Fare</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">₹ 5,229</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Doorstep delivery & pickup</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">₹ 500</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Insurance & GST</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Included</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Refundable Deposit</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">₹ 3000</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-8 justify-center shadow-inner font-bold text-[24px] md:text-[30px]">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Total</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10 text-[#ff0000]">₹ 7686</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Kms Limit</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">₹ 506 kms</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Fuel</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Excluded</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Extra kms charge</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">₹ 7/km</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-14 justify-center">
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">Tolls, Parking & Inner-state taxes</span>
                                    <span className="w-[150px] md:w-[220px] ml-2 md:ml-10">To be paid by you</span>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <span className="flex flex-row my-5 mt-10">
                                    <Image src="/png/offer.png" width={20} height={20} alt="offer" />
                                    <select name="offer" id="offer" className="border-0 outline-0 bg-transparent w-full md:w-[405px]">
                                        <option value="View all promo coupons">View all promo coupons</option>
                                    </select>
                                </span>

                                <div className="w-full md:w-[418px] h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded items-center bg-white px-4">
                                    <input type="text" placeholder="DJF4D4F" className="w-full border-0 outline-none pr-4 text-[#888787]" />
                                    <button className="text-[#ff0000]">Apply</button>
                                </div>

                                <div className="my-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl gap-20 w-full md:w-auto">
                                    <div className="flex flex-col items-center">
                                        <div className='text-sm'>Total Amount</div>
                                        <div className="text-[#ff0000] p-0 text-[24px] md:text-[30px] text-sm nowrap font-bold">₹ 15,000</div>
                                    </div>
                                    <div>
                                        <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-[20px] md:text-[24px] font-bold text-white w-[150px] md:w-[178.31px] h-[45px] md:h-[53.08px] rounded-full drop-shadow-lg">Checkout</button>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col items-center border-[1.5px] w-full md:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                                <span className="font-bold text-[18px] md:text-[20px]">Pay ₹10,000 Now</span>
                                <span className="text-[#ff0000] font-bold text-[18px] md:text-[20px]">Balance on Delivery</span>
                            </div>
                        </main>
                    </section>




                </div>
            </main>
        </div>
    )
}
export default PaymentPage;