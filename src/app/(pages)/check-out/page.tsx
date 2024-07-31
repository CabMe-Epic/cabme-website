"use client";
import BookingSummery from "@/app/components/booking-summery";
import InputField from "@/app/components/input-field/input-field";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { postAadharBack, postAadharFront, postPanCard } from "../../../../networkRequests/hooks/api";
import { getSessionData, setSessionData } from "@/app/utils/sessionStorageUtil";
import { useStore } from "@/app/zustand/store/store";

interface SelectedUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  address: string;
  state: string;
  city: string;
}

interface User extends SelectedUser {
  id: string;
  _id?: string;
  phone: string;
  phoneVerified: boolean;
  aadharNumber: string;
  aadharCardFrontImageUrl: string;
  aadharCardBackImageUrl: string;
  aadharVerified: boolean;
  panNumber: string;
  panVerified: boolean;
  drivingLicenseNumber: string;
  drivingLicenseFrontImageUrl: string;
  drivingLicenseBackImageUrl: string;
  role: string;
  starRating: number;
}

const Checkout = () => {
  const updateUserData = useStore((state) => state.updateUserData);
  const userData = useStore((state) => state.userData);
  console.log("USER DATA", { userData })


  const [aadharGenerate, setAadharGenerate] = useState(false);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(true);
  const [three, setThree] = useState(true);
  const [four, setFour] = useState(true);

  useEffect(() => {
    console.log({ userData })
    if (userData?.phoneVerified) {
      setTwo(false);
      setOne(false);
    }
  }, []);

  const [phone, setPhoneNumber] = useState("");


  const [aadharFrontPost, setAadharFrontPost] = useState<string | null>(null);
  const [aadharBackPost, setAadharBackPost] = useState<string | null>(null);

  const [panCardPost, setPanCardPost] = useState<string | null>(null);

  const [userDetails, setUserDetails] = useState<User | null>(null);
  // console.log({ userDetails })

  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>({
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
  });

  console.log({ selectedUser })



  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("USER", { user })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userData?._id) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/current-user/${userData?._id}`);
          setUser(response?.data?.result);
        }
      } catch (err: any) {
        throw err;
        // setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...(prevState as SelectedUser),
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {

      if (!selectedUser || !phone) {
        setTwo(true)
        setThree(false)
        console.log("Skipping signup due to missing fields:", { selectedUser, phone });
        return;
      }

      const payload = {
        ...selectedUser,
        phone: phone,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/user-signup`,
        payload
      );
      console.log("Signup successful:", { response });
      if (response?.data?.success) {
        updateUserData(response?.data?.result?.user)
        setOne(false)
        setTwo(true)
        setThree(false)
        toast.success(response?.data?.message);
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

  const handlePhoneChange = (event: any) => {
    setPhoneNumber(event.target.value);
  }

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
        setAadharGenerate(true);
        setErrorMessage(result?.message)
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const [otp, setOtp] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [aadharOtp, setAadharOtp] = useState("");
  const [aadharData, setAadharData] = useState('');

  const handleGenerateAadharOTP = async () => {
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
      const session = getSessionData('user');
      if (data?.otpResponse?.data?.requestId) {
        setAadharGenerate(true)
        setAadharData(data)
      }
    } catch (error) {
      console.error('Error fetching OTP:', error);
    }
  };

  const handleVerifyAadharOTP = async () => {
    try {
      console.log({ aadharFrontPost }, { aadharBackPost })
      const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchOkycData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //@ts-ignore
          currentUserId: currentUser?.id as any || session?.id as any,
          otp: aadharOtp,
          //@ts-ignore
          requestId: aadharData?.otpResponse?.data?.requestId,
          aadhaarNumber: aadhar,
          aadharCardFrontImageUrl: aadharFrontPost,
          aadharCardBackImageUrl: aadharBackPost
        })
      });
      const data = await response.json();
      console.log({ data })
      if (data?.verificationResponse?.statusCode === 200) {
        const value = data?.user
        setSessionData("user", value)
        toast.success("Aadhar card has been verified.")
      }
    } catch (error) {
      console.error('Error fetching OTP:', error);
    }
  }

  const handleVerifyOTP = async () => {
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
        const currentUser = result?.result?.user
        const token = result?.result?.token;
        updateUserData(currentUser)
        if (currentUser?.phoneVerified) {
          window.location.reload();
        }
        setOne(false)
        setTwo(false)
        toast.success("OTP verification successfully.");
      } else {
        toast.error(result.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const [panCard, setPanCard] = useState('');

  const handleVerifiedPan = async () => {
    setThree(true)
    setFour(false)
    const panData = {
      panNumber: 'cjzpa1072n',
      panVerified: true,
      panImageUrl: 'https://beta.cabme.in/car-listing',
    };
    // updateUserData(panData);
    // setThree(true)
    // setFour(false)
    // try {
    //   const session = getSessionData('user');
    //   console.log({ session })
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchPanData`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       panNumber: panCard,
    //       //@ts-ignore
    //       currentUserId: currentUser?._id || session?.id,
    //       panImageUrl: panCardPost
    //     })
    //   });
    //   const data = await response.json();
    //   console.log({ data })
    //   if (data?.success) {
    //     const update = data?.user
    //     setSessionData("user", update)
    // setCurrentUser(update)
    //     toast.success("Pan card has been verified.")
    //     setThree(true)
    //     setFour(false)
    //   }
    // } catch (error) {
    //   console.error('Error fetching OTP:', error);
    // }
  }

  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);
  const [dlFrontImage, setDlFrontImage] = useState<any>(null);
  const [panFrontImage, setPanFrontImage] = useState<any>(null);
  const [showDocSelect, setShowDocSelect] = useState<any>("DrivingLicense");


  const handleFrontImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0]
      }
      setFrontImage(file);
      try {
        const res = await postAadharFront(imagePayload);
        const cleanUrl = res.replace(/\n/g, '');
        setAadharFrontPost(cleanUrl);
      } catch (error) {
        console.error('Error uploading Aadhar front image:', error);
      }
    }
  };

  const handleBackImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0]
      }
      setBackImage(file);
      try {
        const res = await postAadharBack(imagePayload);
        const cleanUrl = res.replace(/\n/g, '');
        setAadharBackPost(cleanUrl);
      } catch (error) {
        console.error('Error uploading Aadhar front image:', error);
      }
    }
  };

  const handleDlFrontImageChange = (e: any) => {
    const file = e.target.files[0];
    setDlFrontImage(URL.createObjectURL(file));
  };

  const handlePanFrontImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0]
      }
      setPanFrontImage(file);
      try {
        const res = await postPanCard(imagePayload);
        const cleanUrl = res.replace(/\n/g, '');
        setPanCardPost(cleanUrl);
      } catch (error) {
        console.error('Error uploading Aadhar front image:', error);
      }
    }
  };


  const handleRemoveFrontAadhar = () => {
    setFrontImage(null);
  };

  const handleRemoveBackAadhar = () => {
    setBackImage(null);
  };
  const handleRemoveDlFront = () => {
    setDlFrontImage(null);
  };

  const handleRemovePanFront = () => {
    setPanFrontImage(null);
  };


  const handleDocSelect = (e: any) => {
    console.log(e.target.value, "ee");
    setShowDocSelect(e.target.value);
  };

  return (
    <div className="py-6 lg:flex items-start max-w-[1300px] gap-8 m-auto px-4">
      <ToastContainer />
      <div className="max-w-[765px] w-full mx-auto">
        {(one == false) && two && three ? (""
        ) : (
          <div>
            {/*-------------------------------------------------------- section one start */}
            <div className="h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
              <h6 className="text-[12px] font-bold" style={{ color: 'red' }}>{otp ? "" : errorMessage}</h6>
              <h2 className="sm:text-[20px] text-lg font-semibold">1. Start Your Order</h2>
              {one ? (
                <div>
                  <div className="mt-4 sm:flex gap-6 items-center">
                    <InputField
                      placeholder="Please enter your phone number*"
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                    {aadharGenerate ? (
                      <div className="w-[200px] text-[#FF0000] underline font-semibold cursor-pointer"
                        onClick={handleSendOtp}
                      >
                        Resend OTP
                      </div>
                    ) : (
                      <button
                        className="w-[209px] font-semibold sm:h-[55px] h-[42px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all sm:mt-0 mt-4"
                        onClick={handleSendOtp}
                      >
                        Generate OTP
                      </button>
                    )}
                  </div>
                  {aadharGenerate ? (
                    <div className="mt-4 flex gap-4 items-center">
                      <InputField
                        type="number"
                        placeholder="Enter OTP"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        otp={otp}
                        onChange={(e: any) => setOtp(e.target.value)}
                      />
                      <button
                        onClick={handleVerifyOTP}
                        className="w-[209px] h-[55px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {/*-------------------------------------------------------- section one end */}
            {/*-------------------------------------------------------- section two start */}
            <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
              <h2 className="sm:text-[20px] text-lg font-semibold">2. About you</h2>
              {!two ? (
                <div>
                  <div className="mt-4 flex gap-10 items-center">
                    <div className="flex gap-2 w-full">
                      <InputField
                        name="firstName"
                        placeholder="First name*"
                        otp={userData?.firstName}
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        onChange={handleInputChange}
                      />
                      <InputField
                        name="lastName"
                        placeholder="Last name*"
                        otp={userData?.lastName}
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <InputField
                      name="email"
                      placeholder="Enter your email address*"
                      otp={userData?.email}
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="my-5">
                    <InputField
                      name="address"
                      placeholder="Enter your address*"
                      otp={userData?.address}
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-4 flex gap-10 items-center">
                    <div className="flex gap-2 w-full">
                      <InputField
                        name="state"
                        placeholder="State*"
                        otp={userData?.state}
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        onChange={handleInputChange}
                      />
                      <InputField
                        name="city"
                        placeholder="City*"
                        otp={userData?.city}
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex gap-10 items-center">
                    <button
                      onClick={handleSignUp}
                      className="w-[360px] h-[55px] rounded-md text-white font-semibold bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/*-------------------------------------------------------- section two end */}
            {/*-------------------------------------------------------- section three start */}
            <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
              <h2 className="sm:text-[20px] text-lg font-semibold">3. KYC Verification</h2>
              {!three ? (
                <div>
                  <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                    Upload Aadhar Card{" "}

                    {/* {data?.verificationResponse?.statusCode} */}
                    <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                      <Image
                        src="/greendone.svg"
                        width={20}
                        height={20}
                        alt={"img"}
                      />{" "}
                      Verified Account
                    </span>
                  </h4>
                  <div className="mt-4 sm:flex grid gap-6 items-center">
                    <InputField
                      placeholder="Enter Aadhar card number*"
                      onChange={(e: any) => setAadhar(e.target.value)}
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                    />
                    <div className="flex justify-center space-x-4">
                      <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative">
                        {frontImage ? (
                          <div className="relative">
                            <span
                              onClick={handleRemoveFrontAadhar}
                              className="absolute w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                            >
                              {" "}
                              Remove
                            </span>
                            <Image
                              src={frontImage}
                              alt="Front"
                              width={100}
                              height={55}
                              className="w-[100px] !h-[55px] object-contain rounded-md cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div className="cursor-pointer flex flex-col items-center justify-center">
                            <span className="text-sm cursor-pointer text-[14px]">
                              Front image
                            </span>
                            <Image
                              src="/upload.svg"
                              className="aboslute left-0 top-10"
                              width={20}
                              height={20}
                              alt="upload"
                            />
                            <input
                              type="file"
                              onChange={handleFrontImageChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-[130px] cursor-pointer h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative">
                        {backImage ? (
                          <div className="relative">
                            <span
                              onClick={handleRemoveBackAadhar}
                              className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                            >
                              {" "}
                              Remove
                            </span>
                            <Image
                              src={backImage}
                              alt="Back"
                              width={100}
                              height={55}
                              className="w-[100px] !h-[55px] object-contain rounded-md cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div className="cursor-pointer  flex flex-col items-center justify-center">
                            <span className="!cursor-pointer text-sm">
                              Back image
                            </span>
                            <Image
                              src="/upload.svg"
                              className="aboslute left-0 top-10 cursor-pointer"
                              width={20}
                              height={20}
                              alt="upload"
                            />
                            <input
                              type="file"
                              onChange={handleBackImageChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateAadharOTP}
                    className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all">
                    Generate OTP
                  </button>
                  {aadharGenerate ? (
                    <div className="mt-4 flex gap-4 items-center">
                      <InputField
                        type="number"
                        placeholder="Enter OTP"
                        onChange={(e: any) => setAadharOtp(e.target.value)}
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                      <button
                        onClick={handleVerifyAadharOTP}
                        className="w-[209px] h-[55px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all">
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                    Driving License/PAN Card{" "}
                    <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                      <Image
                        src="/greendone.svg"
                        width={20}
                        height={20}
                        alt={"img"}
                      />{" "}
                      Verified Account
                    </span>
                  </h4>

                  <div>
                    <select
                      onChange={(e) => handleDocSelect(e)}
                      name=""
                      id=""
                      className="border-0 bg-white font-light placeholder:text-[#312D4E] w-[100%] h-[55px] outline-0 mt-2 rounded-md cursor-pointer"
                    >
                      <option value="DrivingLicense">Driving License</option>
                      <option value="PanCard">PAN Card</option>
                    </select>
                  </div>

                  {showDocSelect === "DrivingLicense" ? (
                    <div>
                      <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                        Driving License{" "}
                        <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      </h4>
                      <div className="sm:flex items-center gap-4 ">
                        <InputField
                          placeholder="Driving License Number"
                          className="border-0 bg-white sm:!w-[400px] font-light placeholder:text-[#312D4E] mt-5"
                        />
                        <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative mt-5">
                          {dlFrontImage ? (
                            <div className="relative ">
                              <span
                                onClick={handleRemoveDlFront}
                                className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                              >
                                {" "}
                                Remove
                              </span>
                              <Image
                                src={dlFrontImage}
                                alt="Front"
                                width={100}
                                height={55}
                                className="w-[100px] !h-[55px] object-contain rounded-md cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="cursor-pointer flex flex-col items-center justify-center">
                              <span className="text-sm cursor-pointer text-[14px]">
                                Front image
                              </span>
                              <Image
                                src="/upload.svg"
                                className="aboslute left-0 top-10"
                                width={20}
                                height={20}
                                alt="upload"
                              />
                              <input
                                type="file"
                                onChange={handleDlFrontImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                  


                      <div className="flex items-center justify-between w-[73%] ">
                      <button
                        onClick={() => {
                          setThree(true)
                          setFour(false)
                        }}
                        className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                      >
                        Continue
                      </button>
                      <div className="mt-4">
                        <Image src="/notVerified.svg" alt=""  width={30} height={30} />
                      </div>
                      </div>

                    </div>
                  ) : (
                    <div>
                      <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                        PAN Card{" "}
                        <span className="flex items-center gap-2 text-[#01A601]">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      </h4>

                      <div className="sm:flex items-center gap-4 ">
                        <InputField
                          placeholder="PAN Number"
                          onChange={(e: any) => setPanCard(e.target.value)}
                          className="border-0 bg-white sm:!w-[400px] font-light placeholder:text-[#312D4E] mt-5"
                        />
                        <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative mt-5">
                          {panFrontImage ? (
                            <div className="relative ">
                              <span
                                onClick={handleRemovePanFront}
                                className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                              >
                                {" "}
                                Remove
                              </span>
                              <Image
                                src={panFrontImage}
                                alt="Front"
                                width={100}
                                height={55}
                                className="w-[100px] !h-[55px] object-contain rounded-md cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="cursor-pointer flex flex-col items-center justify-center">
                              <span className="text-sm cursor-pointer text-[14px]">
                                Front image
                              </span>
                              <Image
                                src="/upload.svg"
                                className="aboslute left-0 top-10"
                                width={20}
                                height={20}
                                alt="upload"
                              />
                              <input
                                type="file"
                                onChange={handlePanFrontImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                     

                      <div className="flex items-center justify-between w-[73%] ">
                      <button
                        onClick={handleVerifiedPan}
                        className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                      >
                        Continue
                      </button>
                      <div className="mt-4">
                        <Image src="/notVerified.svg" alt=""  width={30} height={30} />
                      </div>
                      </div>
                     
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {/*-------------------------------------------------------- section three end */}
          </div>
        )}


        {
          ((one == false) && two && three) ? <div>   <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] p-8 sm:mt-6 rounded-md shadow-xl">
            <h2 className="text-[20px] font-bold">About You</h2>

            <div className="mt-3 sm:flex justify-between">
              <div>
                <span className="text-[#FF0000] font-semibold">
                  Personal Information
                </span>
                <div className="flex items-center gap-5 mt-4 text-sm">
                  <Image src="/user.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex items-center gap-5 mt-4 text-sm">
                  <Image src="/email.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-5 mt-4 text-sm">
                  <Image src="/phone.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">{user?.phone}</span>
                </div>
              </div>
              <div className="max-w-[300px] sm:mt-0 mt-4">
                <span className="text-[#FF0000] font-semibold ">Address</span>
                <div className="flex items-center gap-5 mt-4  text-sm">
                  <Image src="/location.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">
                    {user?.address}
                  </span>
                </div>
                <div className="flex items-center gap-5 mt-4 text-sm">
                  <Image src="/location.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">{user?.city}</span>
                </div>
                <div className="flex items-center gap-5 mt-4 text-sm">
                  <Image src="/location.svg" alt="user" width={20} height={20} />
                  <span className="text-[#878787]">{user?.state}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-6 text-sm">
                <span className="text-[#FF0000] font-semibold text-[16px]">Documents</span>
                <div className="sm:flex justify-between items-center gap-5 mt-4 ">
                  <span className="text-[#878787] w-[200px]">PAN Number</span>:{" "}
                  <span className="flex items-center gap-2 sm:my-0 my-2">
                    {" "}
                    <span className="text-[#878787]">{user?.panNumber}</span>{" "}
                    <Image src="/pancard.svg" alt="user" width={60} height={60} />{" "}
                    <Image src="/pancard.svg" alt="user" width={60} height={60} />
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#01A601]">
                    <Image
                      src="/greendone.svg"
                      width={20}
                      height={20}
                      alt={"img"}
                    />{" "}
                    Verified Account
                  </span>
                </div>
                <div className="sm:flex justify-between items-center gap-5 mt-4">
                  <span className="text-[#878787] w-[200px]">
                    Driving License Number
                  </span>
                  :{" "}
                  <span className="flex items-center gap-2 sm:my-0 my-2">
                    {" "}
                    <span className="text-[#878787]">{user?.drivingLicenseNumber}</span>{" "}
                    <Image src="/dlcard.svg" alt="user" width={60} height={60} />{" "}
                    <Image src="/dlcard.svg" alt="user" width={60} height={60} />
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#01A601]">
                    <Image
                      src="/greendone.svg"
                      width={20}
                      height={20}
                      alt={"img"}
                    />{" "}
                    Verified Account
                  </span>
                </div>
                <div className="sm:flex justify-between items-center gap-5 mt-4">
                  <span className="text-[#878787] w-[200px]">Aadhar Number</span>:{" "}
                  <span className="flex items-center gap-2 sm:my-0 my-2">
                    {" "}
                    <span className="text-[#878787]">{user?.aadharNumber}</span>{" "}
                    <Image
                      src="/aadharCard.svg"
                      alt="user"
                      width={60}
                      height={60}
                    />{" "}
                    <Image
                      src="/aadharCard.svg"
                      alt="user"
                      width={60}
                      height={60}
                    />
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#01A601]">
                    <Image
                      src="/greendone.svg"
                      width={20}
                      height={20}
                      alt={"img"}
                    />{" "}
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div></div> : ""
        }

        <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
          <h2 className="text-[20px] font-bold">4. Payment</h2>
          <button className="w-[230px] font-semibold mt-4 h-[42px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all">
            Continue
          </button>
        </div>
      </div>
      <div className="max-w-[450px] w-full mx-auto">
        <BookingSummery />
      </div>
    </div>
  );
};
export default Checkout;