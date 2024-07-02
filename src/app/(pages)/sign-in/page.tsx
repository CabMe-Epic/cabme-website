"use client"
import InputField from '@/app/components/input-field/input-field';
import ThemeButton from '@/app/components/theme-button/theme-button';
import React from 'react';
import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';
// import CountryInput from '@/app/components/country-input/country-Input';
import PhoneInput from 'react-phone-input-2';

const SignIn = (props: any) => {
    const [otpSent, setOtpSent] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    const [phone, setPhoneNumber] = React.useState('');
    const [verificationResult, setVerificationResult] = React.useState(null);
    console.log({ phone }, { otp }, { props })

    const handleSendOtp = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/login/request-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });
            const result = await response.json();
            console.log({ result })
            if (result) {
                setOtpSent(true);
                alert('OTP has been sent to your phone.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/login/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, otp }),
            });
            const result = await response.json();
            console.log({ result })
            if (result) {
                setVerificationResult(result);
                alert('OTP verification successful. You are now logged in.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleSignIn = async () => {
        if (!otpSent) {
            await handleSendOtp();
        } else {
            await handleVerifyOtp();
        }
    }


    return (
        <div>
            <main className='max-w-[1250px] m-auto'>
                {/*  */}
                <div className="flex items-center justify-center mt-10">
                    <div className="flex relative items-center justify-between sm:w-[1201px] space-x-4">
                        {/* Step 1 */}
                        <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-[#ff0000] p-2 rounded-full"></div>
                                </div>
                                <span className="ml-2 text-center text-xs">Login & Registration</span>
                            </div>
                        </div>
                        <div className="flex-grow p-0 h-[1px] bg-gray-300 border-b-[1px] border-black -z-10 absolute top-[15px] sm:left-[65px] left-[32px]  items-center w-[280px] sm:w-[1064px]"></div>
                        {/* Step 2 */}
                        <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-3 h-3  p-2 rounded-full"></div>
                                </div>
                                <span className="ml-2 text-center text-xs">Personal Details</span>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex items-center">
                            <div className="relative flex flex-col gap-2 items-center">
                                <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-3 h-3 p-2 rounded-full"></div>
                                </div>
                                <span className="ml-2 text-center text-xs">Payment Method</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}

                <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-0 mt-10 m-auto sm:m-[10px]'>
                    <section className="mx-auto">
                        <div className='my-6 w-[390px] h-[415px] sm:h-[500px] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">SIGN IN</h1>
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
                                {/* <InputField type="text" placeholder="Enter Phone Number" /> */}
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhoneNumber(phone)}
                                    containerStyle={{ width: '100%', height: '58px', borderRadius: '8px', border: 0, background: "#FCFBFB" }}
                                    inputStyle={{ width: '100%', height: '58px', paddingLeft: 50, borderRadius: '8px', background: "#FCFBFB" }}
                                    buttonStyle={{ border: 0, borderRadius: '8px', width: "50px", padding: "10px", background: "transparent" }}
                                    dropdownStyle={{ borderRadius: '8px', border: 0 }}
                                    searchStyle={{ borderRadius: '8px' }}
                                />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField
                                    type="text"
                                    placeholder="Enter 4 Digit OTP"
                                    otp={otp}
                                    onChange={(e: any) => setOtp(e.target.value)}
                                />
                            </div>
                            <div>
                                {/* <ThemeButton text="Sign In" className='w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]' /> */}
                                <ThemeButton
                                    text={otpSent ? "Verify OTP" : "Sign In"}
                                    className='w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]'
                                    onClick={handleSignIn}
                                />

                            </div>

                        </div>
                    </section>

                    <section className="w-full mx-auto bg-grey-100 ">
                        <main className=" flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md w-[390px] sm:w-[600px] mx-auto">
                            <div className=' w-[340px] sm:w-[400px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl'>
                                <span className="text-center text-md">Booking Summary</span>
                            </div>
                            <div className="m-auto my-5">
                                <span className="font-bold text-[24px]">
                                    Fare Details
                                </span>
                            </div>
                            <div className="grid grid-cols-1 items-start sm:w-[518px] justify-center gap-4 font-semibold">
                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Base Fare</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">₹ 5,229</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Doorstep delivery & pickup</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">₹ 500</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Insurance & GST</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Included</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Refundable Deposit</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">₹ 3000</span>
                                </div>

                                <div className="grid grid-cols-2 sm:w-fit gap-8 justify-center shadow-inner font-bold text-[30px]">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Total</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10 text-[#ff0000]">₹ 7686</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Kms Limit</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">₹ 506 kms</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Fuel</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Excluded</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Extra kms charge</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">₹ 7/km</span>
                                </div>

                                <div className="grid grid-cols-2 gap-14  justify-center">
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">Tolls,Parking & Inner-state taxes</span>
                                    <span className="w-[130px] sm:w-[220px] ml-4 sm:ml-10">To be paid by you</span>
                                </div>
                            </div>
                            <div>

                                <span className="flex flex-row my-5 mt-10">
                                    <Image src="/png/offer.png" width={20} height={20} alt="offer" />
                                    <select name="offer" id="offer" className="border-0 outline-0 bg-transparent w-[320px] sm:w-[405px]">
                                        <option value="View all promo coupons">View all promo coupons</option>
                                    </select>
                                </span>

                                <div className="w-[330px] sm:w-[418px]  h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                                    <input type="text" placeholder="DJF4D4F" className="w-[300px] sm:w-[428px]  border-0 outline-none pr-4 text-[#888787]" />
                                    <button className="text-[#ff0000]">Apply</button>
                                </div>

                                <div className="my-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                                    <div className="flex flex-col">
                                        <span className="text-xs sm:text-md">Total Amount</span>
                                        <span className="text-[#ff0000] p-0 sm:text-[30px] font-bold text-xl sm:text-2xl">₹ 15,000</span>
                                    </div>
                                    <div>
                                        <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-md  sm:text-[24px] font-bold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">Proceed</button>
                                    </div>

                                </div>

                            </div>
                            <div className="flex flex-col items-center border-[1.5px] w-[330px] sm:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
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
export default SignIn;