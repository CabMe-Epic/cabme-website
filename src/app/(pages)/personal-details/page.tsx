"use client"
import InputField from '@/app/components/input-field/input-field';
import ThemeButton from '@/app/components/theme-button/theme-button';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import BookingSummery from '@/app/components/booking-summery';
import { useSelector } from 'react-redux';


const PersonalDetails = (props: any) => {
    const router = useRouter();

    const [verifyOTPAadhar, setVerifyOTPAadhar] = useState(false);
    const [checkOTPAadhar, setCheckOTPAadhar] = useState(false);
    const [verifyOTPPan, setVerifyOTPPan] = useState(false);
    const [checkOTPPan, setCheckOTPPan] = useState(false);
    const [verifyOTPDL, setVerifyOTDL] = useState(false);
    const [checkOTPDL, setCheckOTPDL] = useState(false);

    const [requestId, setRequestId] = useState();

    const [state, setState] = useState({
        aadharNumber: "",
        aadharOTP: "",
        panNumber: "",
        panOTP: "",
        dLNumber: "",
        dLOTP: ""
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    console.log({ state })
    const aadhar = state?.aadharNumber
    const otp = state?.aadharOTP
    const pan = state?.panNumber

    const handleSendAadharOTP = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/getOkycOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aadhaarNumber: aadhar })
            });
            const data = await response.json();
            console.log({ data })
            if (data?.otpResponse?.data?.requestId) {
                setVerifyOTPAadhar(true)
                setRequestId(data?.otpResponse?.data?.requestId)
            }
        } catch (error) {
            console.error('Error fetching OTP:', error);
        }
    };
    const userIdd = useSelector((state) => state.location.userId)
    const [userId, setUserId] = useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = userIdd;
            setUserId(storedUserId);
        }
    }, []);
    console.log({ userId })

    const handleVerifyAadharOTP = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchOkycData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentUserId: userId,
                    otp: otp,
                    requestId,
                    aadhaarNumber: aadhar
                })
            });
            const data = await response.json();
            console.log({ data })
            if (data?.verificationResponse?.statusCode === 200) {
                setCheckOTPAadhar(true);

            }
        } catch (error) {
            console.error('Error fetching OTP:', error);
        }
    }
    const handleSendPanOTP = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchPanData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    panNumber: pan,
                    currentUserId: userId
                })
            });
            const data = await response.json();
            console.log({ data })
            if (data?.success) {
                setCheckOTPPan(true);
                setVerifyOTPPan(true);
                setTimeout(() => {
                    router.push("/payment");


                }, 2000);

            }
        } catch (error) {
            console.error('Error fetching OTP:', error);
        }

    }
    const handleVerifyPanOTP = async () => {

    }
    const handleSendDLOTP = () => {
        if (state.dLNumber != "") {
            alert("Driving License OTP SENT");
            setVerifyOTDL(true)
        }
    }
    const handleVerifyDLOTP = () => {
        if (state.dLOTP != "") {
            setCheckOTPDL(true);
        }
    }
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
                        <div className="flex  items-center">
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

                <div className='grid grid-cols-1 sm:grid-cols-[55%_45%] gap-6 mt-10'>


                    <section className="mx-auto">
                        <div className="my-6 w-[390px] h-[415px] sm:h-[300px] lg:w-[600px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md">
                            <div className="">
                                <h1 className="text-[36px] font-bold">Aadhar Verification</h1>
                            </div>

                            <div className="w-[300px] sm:w-[100%] sm:h-[68px] flex gap-5 sm:flex-row flex-col">
                                <InputField type="text" name="aadharNumber" value={state.aadharNumber} onChange={handleChange} placeholder="Enter Aadhar Number" />
                                <ThemeButton onClick={handleSendAadharOTP} text="Send Otp" className="w-[221px] h-[56px] 	" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] flex gap-5 ">
                                {
                                    verifyOTPAadhar ? <div className='flex justify-between ml-4 gap-0 w-[465px] '>
                                        <InputField name="aadharOTP" value={state.aadharOTP} onChange={handleChange} type="text" placeholder="Enter OTP" className="mr-5" />
                                        {
                                            checkOTPAadhar ? <div><Image className='object-contain' src="/done.png" width={40} height={40} alt='done' /></div> : <ThemeButton text="VerifyOTP" onClick={handleVerifyAadharOTP} className="w-[230px] h-[56px]" />
                                        }
                                    </div>
                                        : ""
                                }

                            </div>

                        </div>

                        {/* aaadhar end */}

                        <div className="my-6 w-[390px] h-[415px] sm:h-[300px] lg:w-[600px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md">
                            <div className="">
                                <h1 className="text-[36px] font-bold">Pan Card Verification</h1>
                            </div>

                            <div className="w-[300px] sm:w-[100%] sm:h-[68px] flex justify-between gap-5 sm:flex-row  flex-col">
                                <InputField type="text" name="panNumber" otp={state.panNumber.toUpperCase()} value={state.panNumber} onChange={handleChange} placeholder="Enter Pan Number" className="sm:w-[1000px] w-[300px] " />

                                <div className="w-[300px] sm:w-[494px] sm:h-[68px] flex gap-5 ">
                                    {verifyOTPPan
                                        ? (
                                            <Image src="/done.png" className='object-contain' width={40} height={40} alt='done' />
                                        )
                                        : (
                                            < ThemeButton onClick={handleSendPanOTP} text="Verify Pan" className="w-[150px] h-[56px] " />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* pan end */}

                        {/* <div className="my-6 w-[390px] h-[415px] sm:h-[500px] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md">
                            <div className="">
                                <h1 className="text-[36px] font-bold">Driving License Verification</h1>
                            </div>

                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] flex gap-5 ">
                                <InputField type="text" name="dLNumber" value={state.dLNumber} onChange={handleChange} placeholder="Enter Driving License Number" />
                                <ThemeButton onClick={handleSendDLOTP} text="Send Otp" className="w-[221px] h-[56px] 	" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] flex gap-5 ">
                                {
                                    verifyOTPDL ? <div style={{ display: "flex", alignItems: "center", gap: "20px" }}> <InputField name="dLOTP" value={state.dLOTP} onChange={handleChange} type="text" placeholder="Enter OTP" />
                                        {
                                            checkOTPDL ? <div style={{ width: "240px" }}><Image src="/done.png" width={40} height={40} alt='done' /></div> : <ThemeButton text="VerifyOTP" onClick={handleVerifyDLOTP} className="w-[221px] h-[56px]" />
                                        }
                                    </div>
                                        : ""
                                }

                            </div>

                        </div> */}
                        {/* DL end */}
                    </section>

                            {/* <BookingSummery roundPrice={function (amount: number): number {
                        throw new Error('Function not implemented.');
                    } } onTotalAmountChange={function (amount: number): void {
                        throw new Error('Function not implemented.');
                    } } /> */}
                    {/* <section className='px-4'>
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
                    </section> */}



                </div>
            </main>
        </div>
    )
}
export default PersonalDetails;