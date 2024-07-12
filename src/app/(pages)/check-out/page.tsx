"use client";
import BookingSummery from "@/app/components/booking-summery";
import InputField from "@/app/components/input-field/input-field";
import Image from "next/image";
import { useState } from "react";

const Checkout = () => {
  const [aadharGenerate, setAadharGenerate] = useState(false);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(true);
  const [three, setThree] = useState(true);
  const [four, setFour] = useState(true);

  const handleGenerateAadharOtp = () => {
    setAadharGenerate(true);
  };

  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);
  const [dlFrontImage, setDlFrontImage] = useState<any>(null);
  const [panFrontImage, setPanFrontImage] = useState<any>(null);
  const [showDocSelect, setShowDocSelect] = useState<any>("DrivingLicense");

  const handleFrontImageChange = (e: any) => {
    const file = e.target.files[0];
    setFrontImage(URL.createObjectURL(file));
  };

  const handleBackImageChange = (e: any) => {
    const file = e.target.files[0];
    setBackImage(URL.createObjectURL(file));
  };

  const handleDlFrontImageChange = (e: any) => {
    const file = e.target.files[0];
    setDlFrontImage(URL.createObjectURL(file));
  };

  const handlePanFrontImageChange = (e: any) => {
    const file = e.target.files[0];
    setPanFrontImage(URL.createObjectURL(file));
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

  console.log("check", one, two, three);

  return (
    <div className="py-6 flex max-w-[1400px] gap-20 m-auto">
      <div>
        {(one == false) && two && three ? (""
        ) : (
          <div>
            {/*-------------------------------------------------------- section one start */}
            <div className="w-[765px] h-auto bg-[#FAFAFA] p-8 mt-6 rounded-md">
              <h2 className="text-[20px] font-bold">1. Start Your Order</h2>
              {one ? (
                <div>
                  <div className="mt-4 flex gap-6 items-center">
                    <InputField
                      placeholder="Please enter your phone number*"
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                    />
                    {aadharGenerate ? (
                      <div className="w-[200px] text-[#FF0000] underline font-semibold cursor-pointer">
                        Resend OTP
                      </div>
                    ) : (
                      <button
                        className="w-[209px] font-semibold h-[55px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all"
                        onClick={handleGenerateAadharOtp}
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
                      />
                      <button
                        onClick={() =>{ setOne(false)
                          setTwo(false)
                        }}
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
            <div className="w-[765px] h-auto bg-[#FAFAFA] p-8 mt-6 rounded-md">
              <h2 className="text-[20px] font-bold">2. About you</h2>
              {!two ? (
                <div>
                  <div className="mt-4 flex gap-10 items-center">
                    <div className="flex gap-2 w-full">
                      <InputField
                        placeholder="First name*"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                      <InputField
                        placeholder="Last name*"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <InputField
                      placeholder="Enter your email address*"
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                    />
                  </div>
                  <div className="my-5">
                    <InputField
                      placeholder="Enter your address*"
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                    />
                  </div>
                  <div className="mt-4 flex gap-10 items-center">
                    <div className="flex gap-2 w-full">
                      <InputField
                        placeholder="State*"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                      <InputField
                        placeholder="City*"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex gap-10 items-center">
                    <button
                      onClick={() => {setTwo(true)
                        setThree(false)
                      }}
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
            <div className="w-[765px] h-auto bg-[#FAFAFA] p-8 mt-6 rounded-md">
              <h2 className="text-[20px] font-bold">3. KYC Verification</h2>
              {!three ? (
                <div>
                  <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                    Upload Aadhar Card{" "}
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
                  <div className="mt-4 flex gap-6 items-center">
                    <InputField
                      placeholder="Enter Aadhar card number*"
                      className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                    />
                    <div className="flex justify-center space-x-4">
                      <div className="w-[130px] cursor-pointer  h-[55px] rounded-md bg-white flex flex-col items-center justify-center relative">
                        {frontImage ? (
                          <div className="relative">
                            <span
                              onClick={handleRemoveFrontAadhar}
                              className="absolute  w-[100%] flex justify-center items-center h-[100%] rounded-md hover:bg-[#0000009d] opacity-0 text-white hover:opacity-100 "
                            >
                              {" "}
                              Remove
                            </span>
                            <Image
                              src={frontImage}
                              alt="Front"
                              width={100}
                              height={55}
                              className="w-full h-full object-cover rounded-md cursor-pointer"
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
                              className="w-full h-full object-cover rounded-md cursor-pointer"
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
                  <button className="w-[209px] mt-5 h-[55px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all">
                    Generate OTP
                  </button>
                  {aadharGenerate ? (
                    <div className="mt-4 flex gap-4 items-center">
                      <InputField
                        type="number"
                        placeholder="Enter OTP"
                        className="border-0 bg-white font-light placeholder:text-[#312D4E]"
                      />
                      <button className="w-[209px] h-[55px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all">
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <h4 className="text-[16px] mt-5 font-semibold flex items-center gap-2">
                    Driving License/PAN Card{" "}
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
                      <div className="flex items-center gap-4 ">
                        <InputField
                          placeholder="Driving License Number"
                          className="border-0 bg-white !w-[400px] font-light placeholder:text-[#312D4E] mt-5"
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
                                className="w-full h-full object-cover rounded-md cursor-pointer"
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
                      <button
                        onClick={() => {setThree(true)
                          setFour(false)
                        }}
                        className="w-[209px] mt-5 h-[55px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                      >
                        Continue
                      </button>
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

                      <div className="flex items-center gap-4 ">
                        <InputField
                          placeholder="PAN Number"
                          className="border-0 bg-white !w-[400px] font-light placeholder:text-[#312D4E] mt-5"
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
                                className="w-full h-full object-cover rounded-md cursor-pointer"
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
                      <button
                        onClick={() => {setThree(true)
                          setFour(false)
                        }}
                        className="w-[209px] mt-5 h-[55px] rounded-md text-white bg-[#FF0000] font-semibold hover:bg-black hover:text-white transition-all"
                      >
                        Continue
                      </button>
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
  ((one == false) && two && three) ? <div>   <div className="w-[765px] h-auto bg-[#FAFAFA] p-8 mt-6 rounded-md shadow-xl">
  <h2 className="text-[20px] font-bold">About You</h2>

  <div className="mt-3 flex justify-between">
    <div>
      <span className="text-[#FF0000] font-semibold">
        Personal Information
      </span>
      <div className="flex items-center gap-5 mt-4 text-sm">
        <Image src="/user.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">Suraj Dubey</span>
      </div>
      <div className="flex items-center gap-5 mt-4 text-sm">
        <Image src="/email.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">Dubeysuraj864@gmail.com</span>
      </div>
      <div className="flex items-center gap-5 mt-4 text-sm">
        <Image src="/phone.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">9958355617</span>
      </div>
    </div>
    <div className="max-w-[300px] ">
      <span className="text-[#FF0000] font-semibold ">Address</span>
      <div className="flex items-center gap-5 mt-4  text-sm">
        <Image src="/location.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">
          Street No. 5Q, Tagore Garden
        </span>
      </div>
      <div className="flex items-center gap-5 mt-4 text-sm">
        <Image src="/location.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">New Delhi</span>
      </div>
      <div className="flex items-center gap-5 mt-4 text-sm">
        <Image src="/location.svg" alt="user" width={20} height={20} />
        <span className="text-[#878787]">India</span>
      </div>
    </div>
  </div>
  <div>
    <div className="mt-6 text-sm">
      <span className="text-[#FF0000] font-semibold">Documents</span>
      <div className="flex justify-between items-center gap-5 mt-4 ">
        <span className="text-[#878787] w-[200px]">PAN Number</span>:{" "}
        <span className="flex items-center gap-2">
          {" "}
          <span className="text-[#878787]">UXRG56789KO</span>{" "}
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
      <div className="flex justify-between items-center gap-5 mt-4">
        <span className="text-[#878787] w-[200px]">
          Driving License Number
        </span>
        :{" "}
        <span className="flex items-center gap-2">
          {" "}
          <span className="text-[#878787]">678905443789</span>{" "}
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
      <div className="flex justify-between items-center gap-5 mt-4">
        <span className="text-[#878787] w-[200px]">Aadhar Number</span>:{" "}
        <span className="flex items-center gap-2">
          {" "}
          <span className="text-[#878787]">3214 6788 8976</span>{" "}
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
     

        <div className="w-[765px] h-auto bg-[#FAFAFA] p-8 mt-6 rounded-md">
          <h2 className="text-[20px] font-bold">4. Payment</h2>
          <button className="w-[209px] font-semibold mt-4 h-[55px] rounded-md text-white bg-[#FF0000] hover:bg-black hover:text-white transition-all">
            Continue
          </button>
        </div>
      </div>
      <div className="w-[450px]">
        <BookingSummery />
      </div>
    </div>
  );
};
export default Checkout;
