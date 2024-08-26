"use client";
import BookingSummery from "@/app/components/booking-summery";
import InputField from "@/app/components/input-field/input-field";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  DLUploading,
  DLUploadingBack,
  postAadharBack,
  postAadharFront,
  postPanCard,
} from "../../../../networkRequests/hooks/api";
import { setSessionData } from "@/app/utils/sessionStorageUtil";
import { useStore } from "@/app/zustand/store/store";
import useCarsStore from "@/app/zustand/store/carsStore";
import ProgressBar from "@/app/components/Progress/progress";

interface SelectedUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  dob: any;
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

interface PaymentPayload {
  amount: number;
  productinfo: string;
  firstName?: string;
  lastName: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  country: string;
  zipcode: number;
  city?: string;
  state?: string;
  userId: string;
  vehicleId: string;
}

const Checkout = () => {
  const updateUserData = useStore((state) => state.updateUserData);
  const [data, setData] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState<any>([]);
  const [packageFreeKms, setPackageFreeKms] = useState<any>();
  const [particalAmount, setParticalAmount] = useState<number>(0);
  const [toCity, setToCity] = useState<any>("");
  const [isFullpayment, setIsFullpayment] = useState<any>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // const { data, setData } = useContextApi();
  React.useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    const storedParticalAmount = localStorage.getItem("advancePayment");
    if (storedParticalAmount) {
      setParticalAmount(Number(storedParticalAmount));
    }
  }, [setData, setParticalAmount]);

  useEffect(() => {
    const dropCity = localStorage.getItem("dropOffLocation");
    const isFullpayment = localStorage.getItem("isFullpayment");
    setToCity(dropCity);
    setIsFullpayment(isFullpayment);
  }, []);

  console.log("particalAmount", { particalAmount });

  console.log("data by data", { data });

  console.log("user id", { updateUserData });
  const userData = useStore((state) => state.userData);
  const { payableAmount } = useCarsStore();
  console.log(payableAmount, "hello");
  console.log("USER DATA", { userData });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bookingData = {
    ...data,
    userData,
  };

  console.log("bookingData by data", { bookingData });
  console.log(selectedPromoCode, "selectedPromoCode");
  const [bookingId, setBookingId] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [aadharGenerate, setAadharGenerate] = useState(false);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(true);
  const [three, setThree] = useState(true);
  const [four, setFour] = useState(true);

  console.log({ aadharGenerate });

  const [currentVehicleId, setCurrentVehicleId] = useState<string | null>();

  const formatDate = (dateString: any) => {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Extract day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Return the formatted date string in dd/mm/yyyy format
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    // if (userData?.phoneVerified) {
    //   setTwo(false);
    //   setOne(false);
    // }

    // if (
    //   userData?.aadharVerified
    //   &&
    //   (userData?.panVerified ||
    //     userData?.drivingLicenseVerified)
    // ) {
    //   setThree(true);
    //   setTwo(true);
    // }
    if (
      userData?.aadharVerified &&
      !three &&
      (userData?.panVerified || userData?.drivingLicenseVerified)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    const vehicleId = sessionStorage.getItem("slug");
    if (vehicleId) {
      setCurrentVehicleId(vehicleId);
    }
  }, [userData, three]);

  const [phone, setPhoneNumber] = useState("");
  console.log({ currentVehicleId });

  const [aadharFrontPost, setAadharFrontPost] = useState<string | null>(null);
  const [aadharBackPost, setAadharBackPost] = useState<string | null>(null);

  const [dlPost, setDLPost] = useState<string | null>(null);
  const [dlPostBack, setDLPostBack] = useState<string | null>(null);
  // console.log({ dlPostBack })

  const [panCardPost, setPanCardPost] = useState<string | null>(null);

  const [userDetails, setUserDetails] = useState<User | null>(null);
  // console.log({ userDetails })

  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    dob: "",
    address: "",
    city: "",
    state: "",
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       if (userData?._id) {
  //         const response = await axios.get(
  //           `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/current-user/${response?.data?.result?.user?._id}`
  //         );
  //         setUser(response?.data?.result);
  //       }
  //     } catch (err: any) {
  //       throw err;
  //       // setErrorMessage(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...(prevState as SelectedUser),
      [name]: value,
    }));
  };

  // const handleStepThree = () => {
  //   setAadharGenerate(false);
  //   setThree(false);
  //   setTwo(true);

  // };

  console.log("selectedUser", formatDate(userData?.dob));

  const booking_payload = {
    userId: bookingData?.userData?._id,
    vehicleId: bookingData?.vehicleId,
    option: bookingData.option,
    location: bookingData.location,
    pickUpDateTime: bookingData.pickUpDateTime,
    dropOffDateTime: bookingData.dropOffDateTime,
    baseFare: Number(bookingData.baseFare),
    doorstepDelivery: bookingData?.doorstepDelivery as string,
    gstRate: Number(bookingData?.gstRate),
    gstAmount: Number(bookingData?.gstAmount),
    insuranceGST: bookingData?.insuranceGST,
    refundableDeposit: Number(bookingData?.refundableDeposit),
    toCity: toCity,
    kmsLimit: packageFreeKms,
    fuel: bookingData?.fuel,
    extraKmsCharge: Number(bookingData?.extraKmsCharge),
    tollsParking: "",
    promocode: {
      code: selectedPromoCode?.code,
      discountType: selectedPromoCode?.selectDiscount,
      discountAmount: selectedPromoCode?.maximumDiscount,
    },

    paymentMode:
      isFullpayment == "true"
        ? "fullPayment"
        : isFullpayment == "false"
        ? "partialPayment"
        : "partialPayment",

    partialPayments: [
      {
        amount: isFullpayment == "true" ? Number(totalAmount) : particalAmount,
        mode: "online",
      },
    ],
    totalAmount: Number(totalAmount),
    bookingDuration: bookingData.bookingDuration,
    bufferTime: 0,
    kilometers: 0,
    createdByUser: bookingData?.userData?._id,
  };

  console.log("bookingData_____83", { booking_payload });

  const handleStepThree = React.useCallback(async () => {
    console.log("bookingData ____188 new ", { booking_payload });

    try {
      setLoader(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking`,
        booking_payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("bookingData response", { res });
      if (res.data.success) {
        const bookingId = res.data.response.bookingId;
        setBookingId(bookingId);
        setAadharGenerate(false);
        setThree(false);
        setTwo(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("data not posted", error);
    }
  }, [booking_payload]);

  const handleSignUp = async () => {
    try {
      setLoader(true);
      if (!selectedUser || !phone) {
        setTwo(true);
        setThree(false);
        console.log("Skipping signup due to missing fields:", {
          selectedUser,
          phone,
        });
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
      // console.log("Signup successful:", { response });
      if (response?.data?.success) {
        updateUserData(response?.data?.result?.user);
        // setOne(false);
        // setTwo(true);
        // setThree(false);
        setTwo(false);
        setOne(false);
        toast.success(response?.data?.message);
        setLoader(false);
      }
    } catch (error: any) {
      // console.error("Error signing up:", error);
      if (error.response) {
        // console.log("Error response:", error.response);
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        setLoader(false);
      } else {
        console.error("Network error occurred:", error.message);
        toast.error("Network error occurred. Please try again.");
        setLoader(false);
      }
    }
  };

  const handlePhoneChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };

  const handleSendOtp = async () => {
    try {
      setLoader(true);
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
      // console.log({ result });

      if (response.ok) {
        setAadharGenerate(true);
        setErrorMessage(result?.message);
        setLoader(false);
      } else {
        setLoader(false);
        toast.error("Please enter your phone number to proceed.");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const [otp, setOtp] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [aadharOtp, setAadharOtp] = useState("");
  const [aadharData, setAadharData] = useState("");
  const [selectedVerifiedAadhar, setSelectedVerifiedAadhar] = useState<any>("");
  console.log({ selectedVerifiedAadhar });

  const handleGenerateAadharOTP = async () => {
    if (!aadhar) {
      toast.error(
        "Aadhaar number is required. Please provide your Aadhaar number to proceed."
      );
      return;
    }

    if (!aadharFrontPost && !aadharBackPost) {
      toast.error(
        "Please upload your Aadhar front and back images to proceed."
      );
      return;
    }
    setLoading("generate");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/getOkycOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aadhaarNumber: aadhar }),
        }
      );
      const data = await response.json();
      console.log({ data });
      if (data.otpResponse.statusCode === 422) {
        return toast.error(data.otpResponse.data.status);
      }
      if (data?.otpResponse?.statusCode === 200) {
        setAadharGenerate(true);
        setAadharData(data);
        setTimeout(() => {
          toast.success(
            "An OTP has been sent to your registered mobile number for Aadhar card verification."
          );
        }, 2000);
      } else {
        toast.error(data?.otpResponse?.error?.message);
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
    } finally {
      setLoading("");
    }
  };

  const handleVerifyAadharOTP = async () => {
    setLoading("verify");
    try {
      console.log({ aadharFrontPost }, { aadharBackPost });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchOkycData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //@ts-ignore
            currentUserId: userData?._id,
            otp: aadharOtp,
            //@ts-ignore
            requestId: aadharData?.otpResponse?.data?.requestId,
            aadhaarNumber: aadhar,
            aadharCardFrontImageUrl: aadharFrontPost,
            aadharCardBackImageUrl: aadharBackPost,
          }),
        }
      );
      const data = await response.json();
      console.log("Aadhar data", { data });
      if (data?.verificationResponse?.statusCode === 200) {
        const value = data?.user;
        setSessionData("user", value);
        setAadharGenerate(false);
        updateUserData(value);
        //@ts-ignore
        updateUserData(selectedVerifiedAadhar?.verificationResponse?.data.dob);
        setSelectedVerifiedAadhar(data);
        toast.success("The Aadhar card has been successfully verified.");
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
    } finally {
      setLoading("");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoader(true);
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
        const currentUser = result?.user;
        const token = result?.result?.token;
        updateUserData(currentUser);
        if (currentUser?.phoneVerified) {
          // window.location.reload();
        }
        setOne(false);
        setTwo(false);
        toast.success(result?.message);
        setLoader(false);
      } else {
        setLoader(false);
        toast.error(result.message || "OTP verification failed.");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const [panCard, setPanCard] = useState("");
  const [dl, setDL] = useState("");
  const [trap, setTrap] = useState(false);
  const handleVerifiedPan = async () => {
    try {
      // if (userData?.aadharVerified && userData?.drivingLicenseVerified) {
      //   try {
      //     if (!panCardPost) {
      //       toast.error("Please upload your pan image to proceed.");
      //       return;
      //     }
      //     const response = await axios.post(
      //       `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/upload-pan-card`,
      //       {
      //         id: userData?._id,
      //         url: panCardPost,
      //       },
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     console.log({ response })
      //     if (response?.data?.success) {
      //       toast.success(response?.data?.message)
      //       return
      //     }
      //   } catch (apiError) {
      //     console.error("Error uploading PAN card image:", apiError);
      //     toast.error("An error occurred while uploading PAN card image. Please try again.");
      //     return;
      //   }
      // }
      if (!panCard) {
        toast.error(
          "Pan number is required. Please provide your pan number to proceed."
        );
        return;
      }
      if (!panCardPost) {
        toast.error("Please upload your pan image to proceed.");
        return;
      }

      console.log(user?.dob, "user?.dob");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/fetchPanData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pan: panCard,
            //@ts-ignore
            name:
              selectedVerifiedAadhar?.verificationResponse?.data.full_name ||
              userData?.firstName + " " + userData?.lastName,
            //@ts-ignore
            dob:
              
              formatDate(userData?.dob),
            //@ts-ignore
            currentUserId: userData?._id,
            panImageUrl: panCardPost,
          }),
        }
      );
      const data = await response.json();
      console.log({ data });
      if (data?.success === false) {
        return toast.error(
          "The provided PAN number is invalid. Please check and try again."
        );
      }
      if (data?.success) {
        const update = data?.user;
        updateUserData(update);
        toast.success("The PAN card has been successfully verified.");
      }
      setTrap(true);
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);
  const [dlFrontImage, setDlFrontImage] = useState<any>(null);
  const [dlBackImage, setDlBackImage] = useState<any>(null);
  const [panFrontImage, setPanFrontImage] = useState<any>(null);
  const [showDocSelect, setShowDocSelect] = useState<any>("");

  const [loadingRound, setLoadingRound] = useState({
    aadharFront: false,
    aadharBack: false,
    panFront: false,
    dlFront: false,
    dlBack: false,
  });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Aadhar Images Uploading Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleFrontImageChange = async (event: any) => {
    setLoadingRound((prev) => ({
      ...prev,
      aadharFront: true,
    }));
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0],
      };
      setFrontImage(file);

      try {
        const res = await postAadharFront(imagePayload);
        const cleanUrl = res.replace(/\n/g, "");
        setAadharFrontPost(cleanUrl);
        setLoadingRound((prev) => ({
          ...prev,
          aadharFront: false,
        }));
      } catch (error) {
        setLoadingRound((prev) => ({
          ...prev,
          aadharFront: false,
        }));
        console.error("Error uploading Aadhar front image:", error);
      }
    }
  };

  const handleBackImageChange = async (event: any) => {
    setLoadingRound((prev) => ({
      ...prev,
      aadharBack: true,
    }));
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0],
      };
      setBackImage(file);
      try {
        const res = await postAadharBack(imagePayload);
        const cleanUrl = res.replace(/\n/g, "");
        setAadharBackPost(cleanUrl);
        setLoadingRound((prev) => ({
          ...prev,
          aadharBack: false,
        }));
      } catch (error) {
        setLoadingRound((prev) => ({
          ...prev,
          aadharBack: false,
        }));
        console.error("Error uploading Aadhar front image:", error);
      }
    }
  };

  const handleRemoveFrontAadhar = () => {
    setFrontImage(null);
  };

  const handleRemoveBackAadhar = () => {
    setBackImage(null);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Aadhar Images Uploading End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handlePanFrontImageChange = async (event: any) => {
    setLoadingRound((prev) => ({
      ...prev,
      panFront: true,
    }));
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0],
      };
      setPanFrontImage(file);
      try {
        const res = await postPanCard(imagePayload);
        const cleanUrl = res.replace(/\n/g, "");
        setPanCardPost(cleanUrl);
        setLoadingRound((prev) => ({
          ...prev,
          panFront: false,
        }));
      } catch (error) {
        setLoadingRound((prev) => ({
          ...prev,
          panFront: false,
        }));
        console.error("Error uploading Aadhar front image:", error);
      }
    }
  };

  const handleRemovePanFront = () => {
    setPanFrontImage(null);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PAN Images Uploading >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleDlFrontImageChange = async (event: any) => {
    setLoadingRound((prev) => ({
      ...prev,
      dlFront: true,
    }));
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0],
      };
      setDlFrontImage(file);
      try {
        const res = await DLUploading(imagePayload);
        const cleanUrl = res.replace(/\n/g, "");
        setDLPost(cleanUrl);
        setLoadingRound((prev) => ({
          ...prev,
          dlFront: false,
        }));
      } catch (error) {
        setLoadingRound((prev) => ({
          ...prev,
          dlFront: false,
        }));
        console.error("Error uploading Aadhar front image:", error);
      }
    }
  };
  const handleDlBackImageChange = async (event: any) => {
    setLoadingRound((prev) => ({
      ...prev,
      dlBack: true,
    }));
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      const imagePayload: any = {
        files: event.target.files[0],
      };
      setDlBackImage(file);
      try {
        const res = await DLUploadingBack(imagePayload);
        const cleanUrl = res.replace(/\n/g, "");
        setDLPostBack(cleanUrl);
        setLoadingRound((prev) => ({
          ...prev,
          dlBack: false,
        }));
      } catch (error) {
        setLoadingRound((prev) => ({
          ...prev,
          dlBack: false,
        }));
        console.error("Error uploading Aadhar front image:", error);
      }
    }
  };

  const handleRemoveDlFront = () => {
    setDlFrontImage(null);
  };

  const handleRemoveDlBack = () => {
    setDlBackImage(null);
  };

  const handleVerifyDrivingLicence = async () => {
    try {
      if (!dl) {
        toast.error(
          "Driving licence number is required. Please provide your Driving licence number to proceed."
        );
        return;
      }

      if (!dlPost) {
        toast.error("Please upload your Driving licence images to proceed.");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/driving-based-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: dl,
            //@ts-ignore
            dob:
              
              formatDate(userData?.dob),
            frontImage: dlPost,
            //@ts-ignore
            currentUserId: userData?._id,
          }),
        }
      );
      const data = await response.json();
      console.log({ data });
      if (data?.success === false) {
        toast.error(
          "The provided driving license is invalid. Please check and try again."
        );
      }
      if (data?.success) {
        const update = data?.user;
        updateUserData(update);
        toast.success("The driving license has been successfully verified.");
        setThree(true);
        setFour(false);
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DL Images Uploading >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleDocSelect = (e: any) => {
    console.log(e.target.value, "ee");
    setShowDocSelect(e.target.value);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Back data from child component to root file...

  const roundPrice = (amount: number) => {
    return Math.round(amount);
  };

  const handleBackBaseFareAmount = (amount: number) => {
    setTotalAmount(amount);
  };
  console.log("BACK BASE FARE AMOUNT", { totalAmount });

  /////////////////////////////////////////////////////////////////////////////////////////////////

  const paymentPayload = {
    amount: particalAmount ? particalAmount : totalAmount?.toFixed(2),
    productinfo: "Taxi Service - Trip from A to B",
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phone: userData?.phone,
    address1: userData?.address,
    address2: userData?.address,
    country: "India",
    zipcode: 201206,
    city: userData?.city,
    bookingId: bookingId,
    state: userData?.state,
    userId: userData?._id as string,
    vehicleId: currentVehicleId as string,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/payment`,
        paymentPayload
      );
      const data = response?.data;
      console.log({ data });

      const result: any = {
        key: data?.key,
        txnid: data?.txnid,
        amount: data?.amount,
        productinfo: data?.productinfo,
        firstName: data?.firstName,
        lastName: data?.lastName,
        address2: data?.address2,
        zipcode: data?.zipcode,
        email: data?.email,
        phone: data?.phone,
        address1: data?.address1,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        udf1: data?.udf1,
        udf2: data?.udf2,
        surl: `${data?.surl}?bookingId=${data?.bookingId}`,
        furl: `${data?.furl}?bookingId=${data?.bookingId}`,
        hash: data?.hashValue,
      };

      console.log({ result });

      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://secure.payu.in/_payment");

      Object.keys(result).forEach((key) => {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", result[key]);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  useEffect(() => {
    if (userData) {
      setFrontImage(userData.aadharCardBackImageUrl);
      setBackImage(userData.aadharCardFrontImageUrl);
      setDlFrontImage(userData.drivingLicenseFrontImageUrl);
      setDlBackImage(userData.drivingLicenseBackImageUrl);
      setPanFrontImage(userData.panImageUrl);

      setAadhar(userData.aadharNumber || "");
      setDL(userData.drivingLicenseNumber || "");
      setPanCard(userData.panNumber || "");

      if (userData.drivingLicenseVerified && userData.panVerified) {
        setShowDocSelect("DrivingLicense");
      } else if (userData.panVerified) {
        setShowDocSelect("PanCard");
      } else if (userData.drivingLicenseVerified) {
        setShowDocSelect("DrivingLicense");
      } else if (!userData.drivingLicenseVerified && !userData.panVerified) {
        setShowDocSelect("DrivingLicense");
      }
    }
  }, [userData]);

  console.log(userData, "userData");

  return (
    <>
      <div className="py-6 lg:flex items-start max-w-[1300px] gap-8 m-auto px-4">
        <ToastContainer />

        <div className="max-w-[765px] w-full mx-auto">
          {one == false && two && three ? (
            ""
          ) : (
            <div>
              {/*-------------------------------------------------------- section one start */}
              <div className="h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
                <h6 className="text-[12px] font-bold" style={{ color: "red" }}>
                  {otp ? "" : errorMessage}
                </h6>
                <h2 className="sm:text-[20px] text-lg font-semibold">
                  1. Start Your Order
                </h2>
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
                        <div
                          className="w-[200px] text-[#FF0000] underline font-semibold cursor-pointer"
                          onClick={handleSendOtp}
                        >
                          Resend OTP
                        </div>
                      ) : (
                        <button
                          className="w-[209px] font-semibold sm:h-[55px] h-[42px] flex justify-center items-center rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all sm:mt-0 mt-4"
                          onClick={handleSendOtp}
                        >
                          {loader ? (
                            <Image
                              src="/loaderRound.png"
                              className="loader-rotate"
                              width={30}
                              height={30}
                              alt="loader"
                            />
                          ) : (
                            "Generate OTP"
                          )}
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
                          className="w-[209px] h-[55px] flex justify-center items-center rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                        >
                          {loader ? (
                            <Image
                              src="/loaderRound.png"
                              className="loader-rotate"
                              width={30}
                              height={30}
                              alt="loader"
                            />
                          ) : (
                            "Submit"
                          )}
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
                <h2 className="sm:text-[20px] text-lg font-semibold">
                  2. About you
                </h2>
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
                    <div className="my-5 flex  gap-2 w-full">
                      <div className="relative">
                        <legend className="absolute top-2 !text-[#312d4ec1] left-5 bg-white p-2">
                          {userData?.dob
                            ? userData?.dob
                            : selectedUser?.dob
                            ? selectedUser?.dob
                            : "Date of Birth"}
                        </legend>
                        <InputField
                          name="dob"
                          placeholder="Date of Birth"
                          type="date"
                          otp={userData?.dob}
                          className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                          onChange={handleInputChange}
                        />
                      </div>

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
                      {userData?.phoneVerified ? (
                        <button
                          onClick={handleStepThree}
                          className="w-[360px] h-[55px] flex justify-center items-center rounded-md text-white font-semibold bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                        >
                          {loader ? (
                            <Image
                              src="/loaderRound.png"
                              className="loader-rotate"
                              width={30}
                              height={30}
                              alt="loader"
                            />
                          ) : (
                            "Continue"
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleSignUp}
                          className="w-[360px] h-[55px] flex justify-center items-center rounded-md text-white font-semibold bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                        >
                          {loader ? (
                            <Image
                              src="/loaderRound.png"
                              className="loader-rotate"
                              width={30}
                              height={30}
                              alt="loader"
                            />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*-------------------------------------------------------- section two end */}
              {/*-------------------------------------------------------- section three start */}
              <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
                <h2 className="sm:text-[20px] text-lg font-semibold">
                  3. KYC Verification
                </h2>
                {!three ? (
                  <div>
                    <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                      Upload Aadhar Card{" "}
                      {userData?.aadharVerified ? (
                        <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      ) : (
                        <Image
                          src="/notVerified.svg"
                          alt=""
                          width={30}
                          height={30}
                        />
                      )}
                    </h4>
                    <div className="mt-4 sm:flex grid gap-6 items-center">
                      <InputField
                        placeholder="Enter Aadhar card number*"
                        onChange={(e: any) => setAadhar(e.target.value)}
                        otp={userData?.aadharNumber}
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
                              {loadingRound.aadharFront && <ProgressBar />}
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
                              {loadingRound.aadharBack && <ProgressBar />}
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
                    {!userData?.aadharVerified && (
                      <button
                        onClick={handleGenerateAadharOTP}
                        disabled={loading === "generate"}
                        className="w-[209px] mt-5 sm:h-[55px] h-[43px] flex justify-center items-center rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                      >
                        {loading === "generate" ? (
                          <Image
                            src="/loaderRound.png"
                            className="loader-rotate"
                            width={30}
                            height={30}
                            alt="loader"
                          />
                        ) : (
                          "Generate OTP"
                        )}
                      </button>
                    )}

                    {aadharGenerate && (
                      <div className="mt-4 flex gap-4 items-center">
                        <InputField
                          type="number"
                          placeholder="Enter OTP"
                          onChange={(e: any) => setAadharOtp(e.target.value)}
                          className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                        />
                        <button
                          onClick={handleVerifyAadharOTP}
                          disabled={loading === "verify"}
                          className="w-[209px] h-[55px] flex justify-center items-center rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                        >
                          {loading === "verify" ? (
                            <Image
                              src="/loaderRound.png"
                              className="loader-rotate"
                              width={30}
                              height={30}
                              alt="loader"
                            />
                          ) : (
                            "Verify OTP"
                          )}
                        </button>
                      </div>
                    )}
                    <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                      {" "}
                      {userData?.drivingLicenseVerified && (
                        <span className="flex items-center gap-2">
                          Driving License
                          <Image
                            src="/greendone.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                        </span>
                      )}
                      {userData?.panVerified && (
                        <span className="flex items-center gap-2">
                          PAN Card
                          <Image
                            src="/greendone.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                        </span>
                      )}
                      {!userData?.drivingLicenseVerified &&
                      !userData?.panVerified ? (
                        <span className="flex items-center gap-2 text-[#000] sm:text-[15px] text-xs">
                          Driving License/ Pan Card
                          <Image
                            src="/notVerified.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </h4>

                    <div>
                      <select
                        onChange={(e) => handleDocSelect(e)}
                        name=""
                        id=""
                        className="border-0 bg-white font-light placeholder:text-[#312D4E] w-[100%] h-[55px] outline-0 mt-2 rounded-md cursor-pointer"
                      >
                        <option value="select">Select</option>
                        <option value="DrivingLicense">Driving License</option>
                        <option value="PanCard">PAN Card</option>
                      </select>
                    </div>

                    {showDocSelect === "DrivingLicense" ? (
                      <div>
                        <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                          Driving License{" "}
                          {userData?.drivingLicenseVerified ? (
                            <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                              <Image
                                src="/greendone.svg"
                                width={20}
                                height={20}
                                alt={"img"}
                              />{" "}
                              Verified Account
                            </span>
                          ) : (
                            <Image
                              src="/notVerified.svg"
                              alt=""
                              width={30}
                              height={30}
                            />
                          )}
                        </h4>
                        <div className="sm:flex items-center gap-4 ">
                          <InputField
                            placeholder="Driving License Number"
                            otp={userData?.drivingLicenseNumber}
                            className="border-0 bg-white sm:!w-[400px] font-light placeholder:text-[#312D4E] mt-5"
                            onChange={(e: any) => setDL(e.target.value)}
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
                                {loadingRound.dlFront && <ProgressBar />}
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
                          <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative mt-5">
                            {dlBackImage ? (
                              <div className="relative ">
                                <span
                                  onClick={handleRemoveDlBack}
                                  className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                                >
                                  {" "}
                                  Remove
                                </span>
                                {loadingRound.dlBack && <ProgressBar />}
                                <Image
                                  src={dlBackImage}
                                  alt="Front"
                                  width={20}
                                  height={55}
                                  className="w-[100px] !h-[55px] object-contain rounded-md cursor-pointer"
                                />
                              </div>
                            ) : (
                              <div className="cursor-pointer flex flex-col items-center justify-center">
                                <span className="text-sm cursor-pointer text-[14px]">
                                  Back image
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
                                  onChange={handleDlBackImageChange}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-[73%] ">
                          {!userData?.drivingLicenseVerified && (
                            <button
                              onClick={() => {
                                handleVerifyDrivingLicence();
                              }}
                              className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                            >
                              Continue
                            </button>
                          )}

                          {/* {userData?.drivingLicenseVerified &&
                          userData?.panVerified && (
                            <div
                              className="mt-4 cursor-pointer"
                              onClick={() => {
                                setThree(true);
                                setFour(false);
                              }}
                            >
                              <Image
                                src="/arrow.svg"
                                alt=""
                                width={30}
                                height={30}
                              />
                            </div>
                          )} */}
                        </div>
                      </div>
                    ) : showDocSelect === "PanCard" ? (
                      <>
                        <div>
                          <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                            PAN Card{" "}
                            {userData?.panVerified ? (
                              <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                                <Image
                                  src="/greendone.svg"
                                  width={20}
                                  height={20}
                                  alt={"img"}
                                />{" "}
                                Verified Account
                              </span>
                            ) : (
                              <Image
                                src="/notVerified.svg"
                                alt=""
                                width={30}
                                height={30}
                              />
                            )}
                          </h4>

                          <div className="sm:flex items-center gap-4 ">
                            <InputField
                              placeholder="PAN Number"
                              otp={userData?.panNumber}
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
                                  {loadingRound.panFront && <ProgressBar />}
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
                            {!userData?.panVerified && (
                              <button
                                onClick={handleVerifiedPan}
                                className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                              >
                                Continue
                              </button>
                            )}

                            {/* {userData?.drivingLicenseVerified &&
                              userData?.panVerified && (
                                <div
                                  className="mt-4 cursor-pointer"
                                  onClick={() => {
                                    setThree(true);
                                    setFour(false);
                                  }}
                                >
                                  <Image
                                    src="/arrow.svg"
                                    alt=""
                                    width={30}
                                    height={30}
                                  />
                                </div>
                              )} */}
                          </div>
                        </div>
                        {trap && (
                          <div>
                            <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                              Driving License{" "}
                              {userData?.drivingLicenseVerified ? (
                                <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                                  <Image
                                    src="/greendone.svg"
                                    width={20}
                                    height={20}
                                    alt={"img"}
                                  />{" "}
                                  Verified Account
                                </span>
                              ) : (
                                <Image
                                  src="/notVerified.svg"
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                              )}
                            </h4>
                            <div className="sm:flex items-center gap-4 ">
                              <InputField
                                placeholder="Driving License Number"
                                className="border-0 bg-white sm:!w-[400px] font-light placeholder:text-[#312D4E] mt-5"
                                onChange={(e: any) => setDL(e.target.value)}
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
                              <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative mt-5">
                                {dlBackImage ? (
                                  <div className="relative ">
                                    <span
                                      onClick={handleRemoveDlBack}
                                      className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                                    >
                                      {" "}
                                      Remove
                                    </span>
                                    <Image
                                      src={dlBackImage}
                                      alt="Front"
                                      width={20}
                                      height={55}
                                      className="w-[20px] !h-[55px] object-contain rounded-md cursor-pointer"
                                    />
                                  </div>
                                ) : (
                                  <div className="cursor-pointer flex flex-col items-center justify-center">
                                    <span className="text-sm cursor-pointer text-[14px]">
                                      Back image
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
                                      onChange={handleDlBackImageChange}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between w-[73%] ">
                              <button
                                onClick={() => {
                                  handleVerifyDrivingLicence();
                                }}
                                className="w-[209px] mt-5 sm:h-[55px] h-[43px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                              >
                                Continue
                              </button>
                              {/* {userData?.drivingLicenseVerified &&
                                userData?.panVerified && (
                                  <div
                                    className="mt-4 cursor-pointer"
                                    onClick={() => {
                                      setThree(true);
                                      setFour(false);
                                    }}
                                  >
                                    <Image
                                      src="/arrow.svg"
                                      alt=""
                                      width={30}
                                      height={30}
                                    />
                                  </div>
                                )} */}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*-------------------------------------------------------- section three end */}
            </div>
          )}

          {one == false && two && three ? (
            <div>
              {" "}
              <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] p-8 sm:mt-6 rounded-md shadow-xl">
                <h2 className="text-[20px] font-bold">About You</h2>
                <div className="mt-3 sm:flex justify-between">
                  <div>
                    <span className="text-[#FF0000] font-semibold">
                      Personal Information
                    </span>
                    <div className="flex items-center gap-5 mt-4 text-sm">
                      <Image
                        src="/user.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">
                        {userData?.firstName} {userData?.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 mt-4 text-sm">
                      <Image
                        src="/email.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">{userData?.email}</span>
                    </div>
                    <div className="flex items-center gap-5 mt-4 text-sm">
                      <Image
                        src="/phone.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">{userData?.phone}</span>
                    </div>
                  </div>
                  <div className="max-w-[300px] sm:mt-0 mt-4">
                    <span className="text-[#FF0000] font-semibold ">
                      Address
                    </span>
                    <div className="flex items-center gap-5 mt-4  text-sm">
                      <Image
                        src="/location.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">
                        {userData?.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 mt-4 text-sm">
                      <Image
                        src="/location.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">{userData?.city}</span>
                    </div>
                    <div className="flex items-center gap-5 mt-4 text-sm">
                      <Image
                        src="/location.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#878787]">{userData?.state}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-6 text-sm">
                    <span className="text-[#FF0000] font-semibold text-[16px]">
                      Documents
                    </span>
                    <div className="sm:flex justify-between items-center gap-5 mt-4 ">
                      <span className="text-[#878787] w-[200px]">
                        PAN Number
                      </span>
                      :{" "}
                      <span className="flex items-center gap-2 sm:my-0 my-2">
                        {" "}
                        <span className="text-[#878787]">
                          {userData?.panNumber}
                        </span>{" "}
                        <Image
                          src={userData?.panImageUrl || "/pancard.svg"}
                          alt="user"
                          width={60}
                          height={60}
                        />{" "}
                        {/* <Image src="/pancard.svg" alt="user" width={60} height={60} /> */}
                      </span>
                      {userData?.panVerified ? (
                        <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      ) : (
                        <Image
                          src="/notVerified.svg"
                          alt=""
                          width={30}
                          height={30}
                        />
                      )}
                    </div>
                    <div className="sm:flex justify-between items-center gap-5 mt-4">
                      <span className="text-[#878787] w-[200px]">
                        Driving License Number
                      </span>
                      :{" "}
                      <span className="flex items-center gap-2 sm:my-0 my-2">
                        {" "}
                        <span className="text-[#878787]">
                          {userData?.drivingLicenseNumber}
                        </span>{" "}
                        <Image
                          src={
                            userData?.drivingLicenseFrontImageUrl ||
                            "/dlcard.svg"
                          }
                          alt="user"
                          width={60}
                          height={60}
                        />{" "}
                        <Image
                          src={
                            userData?.drivingLicenseBackImageUrl ||
                            "/dlcard.svg"
                          }
                          alt="user"
                          width={60}
                          height={60}
                        />
                      </span>
                      {userData?.drivingLicenseVerified ? (
                        <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      ) : (
                        <Image
                          src="/notVerified.svg"
                          alt=""
                          width={30}
                          height={30}
                        />
                      )}
                    </div>
                    <div className="sm:flex justify-between items-center gap-5 mt-4">
                      <span className="text-[#878787] w-[200px]">
                        Aadhar Number
                      </span>
                      :{" "}
                      <span className="flex items-center gap-2 sm:my-0 my-2">
                        {" "}
                        <span className="text-[#878787]">
                          {userData?.aadharNumber}
                        </span>{" "}
                        <Image
                          src={
                            userData?.drivingLicenseBackImageUrl ||
                            "/dlcard.svg"
                          }
                          alt="user"
                          width={60}
                          height={60}
                        />{" "}
                        <Image
                          src={
                            userData?.aadharCardBackImageUrl ||
                            "/aadharCard.svg"
                          }
                          alt="user"
                          width={60}
                          height={60}
                        />
                      </span>
                      {userData?.aadharVerified ? (
                        <span className="flex items-center gap-2 text-[#01A601] sm:text-[15px] text-xs">
                          <Image
                            src="/greendone.svg"
                            width={20}
                            height={20}
                            alt={"img"}
                          />{" "}
                          Verified Account
                        </span>
                      ) : (
                        <Image
                          src="/notVerified.svg"
                          alt=""
                          width={30}
                          height={30}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="max-w-[765px] w-full h-auto bg-[#FAFAFA] sm:p-8 p-4 mt-6 rounded-md">
            <h2 className="text-[20px] font-bold">4. Payment</h2>
            <button
              className={`w-[230px] font-semibold mt-4 h-[42px] rounded-md text-white transition-all ${
                !isButtonDisabled
                  ? "bg-[#FF0000] hover:bg-black hover:text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              //  className={`w-[230px] font-semibold mt-4 h-[42px] rounded-md text-white transition-all ${(!three && (userData?.aadharVerified && userData?.panVerified || userData?.aadharVerified && userData?.drivingLicenseVerified ) )
              //                 ? "bg-[#FF0000] hover:bg-black hover:text-white"
              //                 : "bg-gray-400 cursor-not-allowed"
              //               }`}

              onClick={handleSubmit}
              disabled={isButtonDisabled}
              // disabled={(!three && (userData?.aadharVerified && userData?.panVerified || userData?.aadharVerified && userData?.drivingLicenseVerified ) ) ? false : true}
            >
              Continue
            </button>
          </div>
        </div>
        <div className="max-w-[450px] w-full mx-auto">
          <BookingSummery
            roundPrice={roundPrice}
            onTotalAmountChange={handleBackBaseFareAmount}
            particalAmount={particalAmount}
            packageFreeKmSecond={setPackageFreeKms}
            setSelectedPromoCodeSecond={setSelectedPromoCode}
          />
        </div>
      </div>
      <div className="flex items-center gap-6 justify-center my-10">
        <Image
          src="/checkoutFooter/masterCard.svg"
          width={45}
          height={45}
          alt="mastercard"
          priority
        />
        <Image
          src="/checkoutFooter/gpay.svg"
          width={45}
          height={45}
          alt="gpay"
          priority
        />
        <Image
          src="/checkoutFooter/visa.svg"
          width={45}
          height={45}
          alt="visa"
          priority
        />
        <Image
          src="/checkoutFooter/upi.svg"
          width={45}
          height={45}
          alt="upi"
          priority
        />
      </div>
    </>
  );
};
export default Checkout;
