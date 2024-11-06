"use client";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/input-field/input-field";
import ThemeButton from "@/app/components/theme-button/theme-button";
import React from "react";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingSummery from "@/app/components/booking-summery";
import { useDispatch } from "react-redux";
import {setUserIdRedux,setTokenRedux} from '../../../../redux/slices/locationSlice';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSignIn, setShowSignIn] = React.useState(true);
  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [phone, setPhoneNumber] = React.useState("");
  const [verificationResult, setVerificationResult] = React.useState(null);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/user-signup`,
        formData
      );
      console.log("Signup successful:", { response });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setShowSignIn(true);
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      if (error.response) {
        console.log("Error response:", error.response);
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        console.error("Network error occurred:", error.message);
        toast.error("Network error occurred. Please try again.");
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/login/request-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );
      const result = await response.json();
      console.log({ result });

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP has been sent to your phone.");
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/login/verify-otp`,
        {
          phone,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log({ result });

      if (response.status === 200) {
        const token = result.result.token;
        // localStorage.setItem("userId", result?.result?.user?.id);
        dispatch(setUserIdRedux(result?.result?.user?.id))
        // localStorage.setItem("token", token);
        dispatch(setTokenRedux(token))
        console.log({ token });
        setVerificationResult(result);
        toast.success("OTP verification successful. You are now logged in.");
        router.push("/personal-details");
      } else {
        toast.error(result.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!otpSent) {
      await handleSendOtp();
    } else {
      await handleVerifyOtp();
    }
  };

  return (
    <div>
      <main className="max-w-[1250px] m-auto">
        {/*  */}
        <div className="z-[99999]"><ToastContainer /></div>

        <div className="flex items-center justify-center mt-10">
          <div className="flex relative items-center justify-between sm:w-[1201px] space-x-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="relative flex flex-col gap-2 items-center sm:left-0 left-[-5px] sm:top-0 top-[2px]">
                <div className="sm:w-8 w-6 h-6 sm:h-8  border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#ff0000] p-2 rounded-full"></div>
                </div>
                <span className="ml-2 text-center sm:text-xs text-[12px]">
                  Login & Registration
                </span>
              </div>
            </div>
            <div className="flex-grow p-0 h-[1px] bg-gray-300 border-b-[1px] border-black -z-10 absolute top-[15px] sm:left-[65px] left-[32px]  items-center w-[280px] sm:w-[1064px]"></div>
            {/* Step 2 */}
            <div className="flex items-center">
              <div className="relative flex flex-col gap-2 items-center sm:left-0 left-[-5px] sm:top-0 top-[2px]">
                <div className="sm:w-8 w-6 h-6 sm:h-8  border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3  p-2 rounded-full"></div>
                </div>
                {/* <span className="ml-2 text-center text-xs">Personal Details</span> */}
                <span className="ml-2 text-center sm:text-xs text-[12px]">
                  Document Verification
                </span>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-center">
              <div className="relative flex flex-col gap-2 items-center sm:left-0 left-[-5px] sm:top-0 top-[2px]">
                <div className="sm:w-8 sm:h-8 w-6 h-6 border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 p-2 rounded-full"></div>
                </div>
                <span className="ml-2 text-center sm:text-xs text-[12px]">
                  Payment Method
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}

        <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] sm:gap-0 gap-0 mt-10 m-auto sm:m-[10px] gap-6">
          <div className="w-full mx-auto bg-grey-100">
            {showSignIn ? (
              <section className="sm:mx-auto mx-4">
                <div className="my-6 sm:w-[650px] sm:p-10 p-6 border flex flex-col items-center gap-4 rounded-lg shadow-bottom-shadow">
                  <div className="">
                    <h1 className="lg:text-3xl text-2xl font-bold mb-8">
                      SIGN IN
                    </h1>
                  </div>
                  <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(phone) => setPhoneNumber(phone)}
                      containerStyle={{
                        width: "100%",
                        height: "58px",
                        borderRadius: "8px",
                        border: 0,
                        background: "#FCFBFB",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "58px",
                        paddingLeft: 50,
                        borderRadius: "8px",
                        background: "#FCFBFB",
                      }}
                      buttonStyle={{
                        border: 0,
                        borderRadius: "8px",
                        width: "50px",
                        padding: "10px",
                        background: "transparent",
                      }}
                      dropdownStyle={{ borderRadius: "8px", border: 0 }}
                      searchStyle={{ borderRadius: "8px" }}
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
                    <ThemeButton
                      text={otpSent ? "Verify OTP" : "Sign In"}
                      className="sm:w-[180px] sign-button sm:h-[50px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b shadow-sign-button sm:text-xl from-[#F1301E] to-[#FA4F2F]"
                      onClick={handleSignIn}
                    />
                  </div>
                  <div className="flex gap-2">
                    <p>Don&apos;t have an account?</p>
                    <span
                      onClick={() => setShowSignIn(false)}
                      className="cursor-pointer text-blue-500"
                    >
                      Sign Up
                    </span>
                  </div>
                </div>
              </section>
            ) : (
              <section className="w-full mx-auto bg-grey-100">
                <main className="flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md w-[390px] sm:w-[600px] mx-auto">
                  {/* Your booking summary and payment details section */}
                  <div>
                    <span
                      onClick={() => setShowSignIn(true)}
                      className="cursor-pointer text-blue-500"
                    >
                      Back to Sign In
                    </span>
                  </div>

                  <section className="mx-auto">
                    <div className="my-6 w-[390px] h-[415px] sm:h-[auto] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md">
                      <div className="">
                        <h1 className="text-[36px] font-bold">
                          SIGN IN / SIGN UP
                        </h1>
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e: any) => {
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e: any) => {
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
                        <PhoneInput
                          country={"in"}
                          value={formData?.phone}
                          onChange={(phone) =>
                            setFormData({ ...formData, phone: phone })
                          }
                          containerStyle={{
                            width: "100%",
                            height: "58px",
                            borderRadius: "8px",
                            border: 0,
                            background: "#FCFBFB",
                          }}
                          inputStyle={{
                            width: "100%",
                            height: "58px",
                            paddingLeft: 50,
                            borderRadius: "8px",
                            background: "#FCFBFB",
                          }}
                          buttonStyle={{
                            border: 0,
                            borderRadius: "8px",
                            width: "50px",
                            padding: "10px",
                            background: "transparent",
                          }}
                          dropdownStyle={{ borderRadius: "8px", border: 0 }}
                          searchStyle={{ borderRadius: "8px" }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="mail"
                          placeholder="Email ID"
                          value={formData.email}
                          name="email"
                          onChange={(e: any) => {
                            setFormData({ ...formData, email: e.target.value });
                          }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="text"
                          placeholder="Address"
                          value={formData.address}
                          name="address"
                          onChange={(e: any) => {
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          name="city"
                          onChange={(e: any) => {
                            setFormData({ ...formData, city: e.target.value });
                          }}
                        />
                      </div>
                      <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                        <InputField
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          name="state"
                          onChange={(e: any) => {
                            setFormData({ ...formData, state: e.target.value });
                          }}
                        />
                      </div>
                      <div>
                        <ThemeButton
                          onClick={handleSignUp}
                          text="Sign Up"
                          className="w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]"
                        />
                      </div>
                    </div>
                  </section>
                </main>
              </section>
            )}
          </div>

          {/* <section className="mx-auto">
                        <div className='my-6 w-[390px] h-[415px] sm:h-[500px] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">SIGN IN</h1>
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
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
                                <ThemeButton
                                    text={otpSent ? "Verify OTP" : "Sign In"}
                                    className='w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]'
                                    onClick={handleSignIn}
                                />
                            </div>
                        </div>
                    </section> */}

          {/* <section className="mx-auto">
                        <div className="my-6 w-[390px] h-[415px] sm:h-[auto] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md">
                            <div className="">
                                <h1 className="text-[36px] font-bold">SIGN IN / SIGN UP</h1>
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField type="text" placeholder="First Name" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField type="text" placeholder="Last Name" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
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
                                <InputField type="mail" placeholder="Email ID" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField type="text" placeholder="City" />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField type="text" placeholder="State" />
                            </div>
                            <div>
                                <ThemeButton
                                    text="Sign Up"
                                    className="w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]"
                                />
                            </div>
                        </div>
                    </section> */}
            {/* <BookingSummery roundPrice={function (amount: number): number {
            throw new Error("Function not implemented.");
          } } onTotalAmountChange={function (amount: number): void {
            throw new Error("Function not implemented.");
          } } /> */}
          {/* <section className="w-full sm:mx-auto bg-grey-100 ">
            <main className=" flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md w-full sm:w-[600px] mx-auto">
              <div className=" w-[80%] sm:w-[400px] sm:h-[50px] h-[43px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                <span className="text-center text-md">Booking Summary</span>
              </div>
              <div className="m-auto my-5">
                <span className="sm:font-bold font-semibold sm:text-[24px] text-[22px]">
                  Fare Details
                </span>
              </div>
              <div className="grid grid-cols-1 items-start sm:w-[518px] justify-center gap-4 sm:font-semibold sm:text-md text-sm">
                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Base Fare</span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">₹ 5,229</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    Doorstep delivery & pickup
                  </span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">₹ 500</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    Insurance & GST
                  </span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Included</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    Refundable Deposit
                  </span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">₹ 3000</span>
                </div>

                <div className="grid grid-cols-2 sm:w-fit gap-8 justify-center font-bold sm:text-[30px] text-xl shadow-custom-inner py-[3px]">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Total</span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10 text-[#ff0000]">
                    ₹ 7686
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Kms Limit</span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">₹ 506 kms</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Fuel</span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">Excluded</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    Extra kms charge
                  </span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">₹ 7/km</span>
                </div>

                <div className="grid grid-cols-2 gap-14  justify-center">
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    Tolls,Parking & Inner-state taxes
                  </span>
                  <span className=" sm:w-[220px] ml-4 sm:ml-10">
                    To be paid by you
                  </span>
                </div>
              </div>
              <div>
                <span className="flex flex-row my-5 mt-10">
                  <Image
                    src="/png/offer.png"
                    width={20}
                    height={20}
                    alt="offer"
                  />
                  <select
                    name="offer"
                    id="offer"
                    className="border-0 outline-0 bg-transparent sm:w-[320px] sm:w-[405px] font-semibold sm:text-md text-sm"
                  >
                    <option value="View all promo coupons">
                      View all promo coupons
                    </option>
                  </select>
                </span>

                <div className="w-[330px] sm:w-[418px]  sm:h-[53px] h-[42px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                  <input
                    type="text"
                    placeholder="DJF4D4F"
                    className="w-[300px] sm:w-[428px]  border-0 outline-none pr-4 text-[#888787]"
                  />
                  <button className="text-[#ff0000] sm:text-md text-sm">
                    Apply
                  </button>
                </div>

                <div className="my-6 h-[79px] shadow-custom-shadow bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-md">Total Amount</span>
                    <span className="text-[#ff0000] p-0 sm:text-[30px] font-bold text-xl sm:text-2xl">
                      ₹ 15,000
                    </span>
                  </div>
                  <div>
                    <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-md  sm:text-[24px] font-bold text-white sm:w-[178.31px] w-[130px] sm:h-[53.08px] h-[42px] rounded-full shadow-sign-button">
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center border-[1.5px] w-[330px] sm:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                <span className="font-bold sm:text-[20px] text-md">
                  Pay ₹10,000 Now
                </span>
                <span className="text-[#ff0000] font-semibold sm:text-[20px] text-md">
                  Balance on Delivery
                </span>
              </div>
            </main>
          </section> */}
        </div>
      </main>
    </div>
  );
};
export default SignIn;
