import Image from "next/image";
import React from "react";

const Failure = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-center">
      {/* Checkmark Icon */}
      <div className="flex justify-center mb-8">
       <Image src={"/false.svg"} alt="" width={100} height={100}/>
      </div>

      {/* Payment Success Text */}
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Success</h1>

      {/* Success Message */}
      <p className="text-lg font-semibold text-black mb-2">
      Your payment has been Failure processed. Thank you for your purchase!

      </p>
      <p className="text-gray-700">
        For any queries contact us at our toll free number 
        <a href="tel:18001216162" className="text-blue-600"> 1800 121 6162</a>
      </p>


      {/* Button */}
      {/* <a
        href="https://admin.cabme.in/auth/customer-login"
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md"
      >
        Continue Login
      </a> */}
    </div>
  );
};

export default Failure;
