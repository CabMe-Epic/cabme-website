"use client"
import Image from "next/image";
import { useState } from "react";

const FAQ = () => {
  const [showAns, setShowAns] = useState<any>("")
  const toggleFaq = (question:any) =>{
    
    showAns==="" ? setShowAns(question) : showAns===question ? setShowAns("") : setShowAns(question)
  }
  return (
    <div className="max-w-[1250px] m-auto px-4">
      <div className="sm:flex sm:mt-0 mt-6">
        <div className="grid gap-4 max-w-[410px] m-auto">
          <h2 className="sm:text-4xl text-2xl sm:text-left text-center font-bold">
            Any <span className="sm:text-black text-primary"> questions</span>{" "}
            <br />
            <span className="text-primary sm:block hidden">
              {" "}
              WE GOT YOU
            </span>{" "}
          </h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea{" "}
          </p>
        </div>
        <Image
          src={"/png/car-red.png"}
          alt="car"
          width={628}
          height={340}
         
        />
      </div>
      <div>
        {faqCollection?.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="text-xl font-semibold mt-6">{item?.heading}</h2>
              {item?.faqArray?.map((value: any, ind) => {
                return (
                  <div key={ind}>
                    <h3 className="bg-red-100 my-4 p-4 font-[450] cursor-pointer flex justify-between" onClick={()=>toggleFaq(value?.que)}><span className="sm:text-[16px] text-[14px]">{value?.que}</span> <span>{showAns==="" ? "+" : "-"}</span></h3>
                    {showAns===value?.que &&
                        <div className="pl-2">
                        <p className="text-sm">{value?.ans}</p>
  
                        {value?.list?.map((val: any, indd: any) => {
                          return <div key={indd} className="text-sm my-[4px]">{val?.listAns}</div>;
                        })}
  
                        {value?.que === "WHAT IS YOUR CANCELLATION POLICY?" && (
                          <>
                            <p className="text-sm">
                              The Hirer can cancel the booking by logging into
                              his/her Cabme account through the Cabme India
                              website/mobile application. The Hirer may send in
                              the details of the booking he/she is willing to
                              cancel by email on enquiry.cabme@gmail.com or call
                              us on +1800 121 6162.
                            </p>
                            <h3 className="font-semibold my-2">
                              For daily rentals i.e. rental period of more than 24
                              hours:{" "}
                            </h3>
                            <p className="text-sm">
                              If the booking is cancelled more than or equal to 24
                              hours prior to the scheduled pick up time, a
                              transaction processing fees of Rs. 500/- will be
                              levied; If the booking is cancelled less than 24
                              hours prior to the scheduled pickup time,
                              cancellation charges levied will be the first days
                              rental less discount proportioned across the entire
                              rental duration.
                            </p>
                            <h3 className="font-semibold my-2">
                              For hourly rentals ie. rental period of less than 24
                              hours:{" "}
                            </h3>
                            <p className="text-sm">
                              If the booking is cancelled more than or equal to 24
                              hours prior to the scheduled pick up time, a
                              transaction processing fees of Rs.500/- will be
                              levied. If the booking is cancelled less than 24
                              hours prior to the scheduled pick up time, the
                              entire rental amount will be forfeited.
                            </p>
                            <h3 className="font-semibold my-2">For Subscription bookings, </h3>
                            <p className="text-sm">
                              if the booking is cancelled before 24 hours of trip
                              start time, transaction fees of INR 500 will be
                              deducted. If the booking is cancelled within 24
                              hours of trip start time, cancellation charges
                              levied will be the first days rental less discount
                              proportioned across the entire rental duration.
                            </p>
                            <p className="text-sm my-2">
                              If the Hirer, wishes to cancel the Subscription post
                              the trip start time, the entire Security Deposit
                              will be forfeited. In addition to this, pro-rated
                              rental for the period of utilization will be
                              charged.
                            </p>
                            <p className="text-sm">
                              GST@ 28% will be applicable on all of the above
                              mentioned cancellation charges.
                            </p>
                            <p className="text-sm">
                              In case the hirer fails to pick up the car as per
                              the scheduled rental start time without informing
                              the Cabme team about the same, the incident will be
                              treated as a No-Show resulting in the forfeiture of
                              the complete security deposit along with one day
                              hire charges.
                            </p>
                            <p className="text-sm">
                              The cancellation charges will be adjusted from the
                              rental charges and the security deposit paid by the
                              hirer. The remaining of the total amount paid shall
                              be refunded post necessary adjustments within
                              7-10-working days after cancellation of the booking.
                            </p>
                          </>
                        )}
                      </div>
                    }
                  
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FAQ;
const faqCollection = [
  {
    heading: "Booking",
    faqArray: [
      {
        que: "HOW DO I BOOK A CAR?",
        ans: "You can access our website and provide the requested information along with your credit card details. You can also register yourself on our Website/Mobile App. It is mandatory to update your documents (valid driving license, PAN, address proof, and credit card details/payment details) to make a reservation or at the time of registration.",
      },
      {
        que: "WHAT ALL INFORMATION IS REQUIRED FROM ME TO BOOK A CAR?",
        ans: "You will need to enter:",
        list: [
          {
            listAns: "•	your name",
          },
          {
            listAns: "•	mobile number",
          },
          {
            listAns: "•  valid email address",
          },
          {
            listAns:
              "•	a valid driving license, in case you are driving. I If vehicle is to be driven by some other person, then his/her driving license is required.",
          },
          {
            listAns: "•	PAN",
          },
          {
            listAns: "•	Address proof – Aadhar, utility bill, passport etc.",
          },
          {
            listAns:
              "•	Your credit card details in case you are using your credit card for making the payment. If someone else is making the payment, enter the details of the credit card holder.",
          },
        ],
      },
      {
        que: "CAN SOMEONE ELSE MAKE A RESERVATION FOR ME?",
        ans: "Yes, but you need to be present with the required documents to pick up the car at the mentioned pickup location.",
      },
      {
        que: "CAN SOMEONE ELSE DRIVE FOR ME DURING MY RESERVATION?",
        ans: "Only the person whose KYC documents along with driving license are submitted while making the reservation can drive the vehicle.",
      },
      {
        que: "IS THERE A MINIMUM BOOKING CHARGE?",
        ans: "The Minimum Booking charge is for a period of 24 hour.",
      },
      {
        que: "CAN I PREPONE MY TRIP?",
        ans: "If you want to take the car early, please reschedule your booking. The car is subject to availability.",
      },
      {
        que: "HOW MANY HOURS IN ADVANCE DO I NEED TO MAKE A RESERVATION?",
        ans: "You can book the car minimum 4 hours in advance, depending on the availability of the car.",
      },
      {
        que: "CAN I MODIFY MY BOOKING?",
        ans: "Any booking modification requests have to be request for a minimum of 4 hours prior to the rental start time. Requests pertaining to car type and rental start & end times will be serviced subject to availability. Request for switching between Kilometre and Unlimited Kilometre packages will not be entertained once the rental has commenced.",
      },
      {
        que: "CAN I EXTEND MY BOOKING?",
        ans: "",
        list: [
          {
            listAns:
              "Extension requests have to be made along with the extension details, a minimum of 4 hours prior to the return time by email on our support. You can also call us on our helpline number- +1800 121 6162. The extension is possible subject to availability of the vehicle. In case of non-availability of the car, a charge of INR 300 over and above the hourly rate (as per your car type) will be charged as extension/modification charges.",
          },
          {
            listAns:
              "In case of Subscription, the extension for the subsequent month (if applicable) has to be informed in written to email ID at least 7 days in advance before the expiry of Subscription. In case Hirer fails to do so, we will consider the extension as a new booking/subscription",
          },
          {
            listAns:
              "A charge of INR 300 over and above the hourly rate (as per your car type) for every hour of delay will be charged as delay charges.",
          },
        ],
      },
      {
        que: "DO I GET ANY BENEFIT OR CONCESSION IF I RETURN THE CAR EARLIER THAN MY SPECIFIED RETURN TIME?",
        ans: "We regret to say that but we do not offer any discounts for early return of the Car Rental.",
      },
      {
        que: "WHAT IS YOUR CANCELLATION POLICY?",
        ans: "",
      },
      {
        que: "WHAT IF I DO NOT RECEIVE MY SELF DRIVE CAR ON MY SCHEDULE REPORTING TIME?",
        ans: "Please call our helpline number 1800 121 6162 and we will assist you.",
      },
      {
        que: "WHERE IN INDIA CAN I TRAVEL?",
        ans: "Our cars have an ALL India Permit, so you can drive anywhere in India. (Please avoid bad terrains and terrorism-affected areas)",
      },
      {
        que: "CAN I DROP THE CAR TO ANY OTHER LOCATION THAN THE PICKUP LOCATION?",
        ans: "",
        list: [
          {
            listAns:
              "1. You must bring the vehicle back to the same place you picked it up from. In case you drop off the car to any other location within the same city of pickup, and you had not mentioned the location beforehand while booking the car, then you will be charged INR 1500, plus the complete hourly rate and the late fees until the vehicle is returned to the correct location.",
          },
          {
            listAns:
              "2. In case the vehicle is dropped outside city limits of the pickup location, the actual cost for transporting the car to the correct location will be charged along with INR 1500, plus the complete hourly rate and the late fees until the vehicle is returned to the correct location.",
          },
        ],
      },
      {
        que: "DO YOU HAVE A 24 * 7 RESERVATION AT ALL YOUR LOCATIONS?",
        ans: "You may book the vehicle at any time of the day either through the website or our contact center. You can pick up/drop off the vehicle at any time from one of our own/virtual locations. However, we do not provide destination pickup/drop off between 23:00 hours to 06:30 hours.",
      },
      {
        que: "CAN I TAKE A PET ALONG WITH ME?",
        ans: "Some of our guests might be allergic to pets and hence pets will not be allowed in the car. A charge of INR 750 will be levied as penalty if you bring the pets in the car.",
      },
      {
        que: "HOW DO I END MY RESERVATION?",
        ans: "You will need to return the car with a full tank. CABME executive will help you complete the post usage checklist and complete the payment process.",
      },
    ],
  },
  {
    heading: "DOCUMENTATION",
    faqArray: [
      {
        que: "IS THERE AN AGREEMENT/DOCUMENT THAT I NEED TO SIGN?",
        ans: "Yes, you will need to sign a short agreement / car checklist when you come to pick up the car.",
      },
      {
        que: "WHAT IS THE ELIGIBILITY TO HIRE A SELF-DRIVE CAR?",
        ans: "The Hirer intending to enter into this Agreement and rent the vehicle on self-drive basis should have completed 21 years of age, shall having a driving experience of a minimum 1-year LMV, and shall submit a valid & Original driving license, PAN Card & Aadhar Card.",
      },
      {
        que: "WHAT TYPE OF DRIVER’S LICENSE IS REQUIRED?",
        ans: "We require an Indian driver’s license or an International Driver’s Permit (IDP). Our office will verify original license. The licenses must be for a light motor vehicle (car). The customers do NOT need a specific cab license that is associated with a yellow board plate.",
      },
      {
        que: "WHAT DOCUMENTS DO I NEED TO PRODUCE WHILE PICKING UP A SELF-DRIVE CAR?",
        ans: "You need to produce the KYC Documents comprising photo identity, an address proof (such as original Passport/Aadhar card) and a valid Driving License. A Copy of each needs to be submitted while picking up the car.",
      },
      {
        que: "WILL I BE ALLOWED TO USE A CAR IN CASE I FAIL TO PRODUCE THE ORIGINAL DOCUMENTS AT THE TIME OF PICKUP??",
        ans: "No. You will not be allowed to rent the vehicle in case you fail to produce the original documents at the time of scheduled vehicle pickup. Besides, we reserve the right to forfeit 100% of your rental amount in such a scenario.",
      },
    ],
  },
  {
    heading: "OPERATIONS",
    faqArray: [
      {
        que: "WHEN DOES MY BOOKING START?",
        ans: "The booking start time will be the same as selected by you at the time of making the booking.",
      },
      {
        que: "IN CASE OF 120 KILOMETRE PACKAGE, WHERE DOES THE KILOMETRE COUNT BEGIN FROM AND END AT?",
        ans: "In case of 120 km package, the kilometre count shall begin from your point of car pickup and ends at your point of car drop off. That is, the actual km driven by you will be considered for the usage calculation.",
      },
      {
        que: "WHAT TYPE OF CARS DOES Cabme OFFER?",
        ans: "We offer hatch backs / Sedan / SUVs / MUVs / Luxury Cars (Refer website for further details)",
      },
      {
        que: "WHAT DO I NEED TO CHECK BEFORE I TAKE THE CAR ON SELF DRIVE?",
        ans: "We would advise you to physically inspect the car and sign the checklist.",
      },
      {
        que: "DOES THE VEHICLE HAVE MANUAL OR AUTOMATIC TRANSMISSION?",
        ans: "You may check the vehicle’s specifications for these details at the time of booking.",
      },
      {
        que: "WHAT ARE THE AMENITIES YOU PROVIDE WITH YOUR CAR?",
        ans: "All cars may be equipped with manufacturer’s standard car accessories.",
      },
      {
        que: "WHAT IS THE MINIMUM TIME ONE CAN RENT THE CAR FOR?",
        ans: "You can hire it for a minimum of 24 hour.",
      },
      {
        que: "DO YOU HAVE A KILOMETRE LIMIT?",
        ans: "Kilometre allowance is dependent on the package chosen at the time of making the booking. Under 120 km package, maximum kilometre allowance is 120 km any usage beyond which will be chargeable on a per kilometre use basis. If you choose the ’Unlimited KMs’ package, there will be no limit on the kilometres you can drive during the tenure of the rental.",
      },
      {
        que: "FOR A 120 KILOMETRE PACKAGE, HOW WILL I PAY FOR ANY ADDITIONAL KILOMETRES DRIVEN?",
        ans: "The additional kilometre usage charges will be deducted from your security deposit.",
      },
      {
        que: "WHAT IS THE SPEED LIMIT FOR DRIVING AN CABME CAR?",
        ans: "CABME allows its customers to drive the car up to a maximum speed of 105 km/hr. However, it is 80 km/hr. in few cities where some cars might be equipped with speed governors as per government directives. Cabme advises you to follow local speed limits. Government fine for driving the vehicle at a speed above the local speed limit is payable by the customers.",
      },
      {
        que: "WHO PAYS FOR THE FUEL?",
        ans: "The Vehicle will be provided to the Hirer with fuel in tank. The Hirer shall verify and confirm the same at the time of taking possession of Vehicle before commencement of the Hire Period. The Hirer shall return the Vehicle with same quantity of fuel in tank. However, in case the quantity of fuel at the time of returning the vehicle to CABME is less than the fuel level at the time of rental start date and time, a 10% refueling charge will be levied over and above the differential refueling cost along with service charge shall be deducted from the Security Deposit (SD)and/or any other credit balance or funds of the Hirer with CABME or any person. In the event SD is exhausted, hirer shall pay the differential dues to CABME through an additional payment link which CABME will share with the Hirer. The decision of CABME in this regard shall be final in determining the number of litres required to fill the fuel tank.",
      },
      {
        que: "WHO PAYS FOR PARKING/TOLL/STATE TAX?",
        ans: "The User of the Car Rental pays for the parking/toll and taxes.",
      },
      {
        que: "CAN I GET A CAR AT ANY LOCATION I DESIRE?",
        ans: "Yes, You may opt for doorstep pickup/drop off at the time of making the booking at an additional charge of Rs 300/- each for pickup and drop off. However, doorstep pickup/drop off service will not be available between 23:00 hours to 6:30 hours.",
      },
      {
        que: "IS SMOKING ALLOWED IN CAR?",
        ans: "Smoking is strictly not allowed in Cabme car",
      },
      {
        que: "DO I NEED TO CLEAN THE CAR?",
        ans: "Unclean cars will attract cleaning charge of INR 750 for a minor cleaning & a charge of INR 1250 for a major cleaning as penalty.",
      },
      {
        que: "WHAT ABOUT ANY BELONGINGS LEFT IN THE CAR AT THE TIME OF HANDOVER?",
        ans: "Cabme does not take the responsibility for any of your belongings. However, we suggest you to contact our call center and we will try our best to help you.",
      },
      {
        que: "WHAT ARE THE IMPORTANT DOCUMENTS I HAVE TO CARRY WHEN I HAVE TO DRIVE ACROSS STATE BORDER?",
        ans: "You will need to carry your driving license, Car registration documents, Self-Drive License, All India Permit, Car fitness certificate, Insurance Copy, and PUC (Pollution under Control Certificate).",
      },
      {
        que: "DOES Cabme PROVIDE ROAD SIDE ASSISTANCE?",
        ans: "Yes, Cabme does provide road side assistance in case of an accident or if the vehicle breaks down. You can call us on our helpline number 1800 121 6162, and we would arrange for road side assistance",
      },
    ],
  },
  {
    heading: "INCIDENTS",
    faqArray: [
      {
        que: "WHAT HAPPENS IN CASE OF AN ACCIDENT?",
        ans: "",
        list: [
          {
            listAns:
              "1. Cabme requests you to immediately notify us (within 4 hours) by calling on our helpline number +1800 121 6162or by sending us an email on enquiry.cabme@gmail.com. We will coordinate accordingly with our road-side assistance provider.",
          },
          {
            listAns:
              "2.Please file an FIR at the nearest police station. Do not leave the scene of the accident until proper support has arrived. You may be required to sign several formality documents associated with the accident.",
          },
        ],
      },
      {
        que: "WHAT HAPPENS IN CASE OF A BREAK DOWN?",
        ans: "Cabme requests you to immediately notify us (within 4 hours) by calling on our helpline number +1800 121 6162or by sending us an email on enquiry.cabme@gmail.com. Our 24X7 experienced technical team will assist you in case of break down and provide a replacement, if need.",
      },
      {
        que: "WHAT IS THE REPLACEMENT CAR POLICY?",
        ans: "",
        list: [
          {
            listArray:
              "Replacement car offer is available only for Subscription service. The replacement will be available only in the city of hire till the time the original car is at the garage/workshop. The replacement car will be offered in the same category of car that is hired, only in case of breakdown due to mechanical / electrical failure and/or scheduled service.",
          },
          {
            listArray:
              "No replacement car will be offered for major/minor accidents or cases arising due to hirer’s negligence.",
          },
          {
            listArray:
              "The replacement will be offered basis availability of the cars. CABME reserves the right to deny replacement in case of non-availability of car in the same category.",
          },
          {
            listArray: "listArray",
          },
          {
            listArray:
              "Intentional damages/abuse to car will result into forfeiting of entire security deposit and rental advance, along with foreclosing of the subscription and repossessing of the car with immediate effect.",
          },
        ],
      },
      {
        que: "WHAT HAPPENS IN CASE OF A DAMAGE?",
        ans: "Damage cost up to INR 30,000/- is to be paid by Hirer, including from the security deposit. In case damage is more than INR 30,000, an insurance claim will be filed; the amount of depreciation and parts which are not covered under insurance will be borne by the Hirer. In case the customer is found violating the terms & conditions of CABME, then the maximum cap of INR 10000 will not be applicable The assessment of damage made by CABME will be final.",
      },
      {
        que: "WHAT HAPPENS IN CASE IF THE CAR IS STOLEN?",
        ans: "",
        list: [
          {
            listArray:
              "1.An FIR needs to be registered immediately (within 4 hours) & the same needs to be informed to us by email at enquiry.cabme@gmail.com.",
          },
          {
            listArray:
              "2.In case of theft /total loss of the Vehicle during the Hire Period, the Hirer shall be liable to bear the damages as specified in the Agreement. The Security Deposit paid by the Hirer shall be adjusted against such loss and/or damage. Any theft in the Vehicle with respect to Vehicle parts and/or accessories shall be charged as per the Schedule of charges. The maximum liability cost of Rs 1,00,000 will also be paid by the renter.",
          },
        ],
      },
      {
        que: "WHAT HAPPENS IN CASE THE CAR DAMAGE IS DUE TO NEGLIGENCE?",
        ans: "The Hirer shall be liable to pay charges as stipulated in the Schedule of Charges mentioned as part of the Agreement.",
      },
    ],
  },
  {
    heading: "LEGAL",
    faqArray: [
      {
        que: "WHAT IS THE INSURANCE COVER?",
        ans: "",
        list: [
          {
            listArray:
              "Damage costs up to INR 30,000/- is to be paid by Hirer. In case the damage is more than INR 30,000, an insurance claim will be filed. The amount of depreciation and parts which are not covered under insurance will be borne by the Hirer. Also the rent till the vehicle is in the warehouse/garage will also be paid by the hirer.",
          },
          {
            listArray:
              "In case the customer is found to violate the Cabme terms & conditions then the maximum cap of INR 10000 will not be applicable. The assessment of damage made by CABME will be final.",
          },
        ],
      },
    ],
  },
  {
    heading: "PAYMENTS",
    faqArray: [
      {
        que: "WHAT MODE OF PAYMENTS ARE ACCEPTED?",
        ans: "CABME accepts payments by credit cards (visa/master card), and net banking. All rental payments are made in advance through our website or mobile app. However, the Security Deposit should be paid before taking delivery of the car. We do not accept cash.",
      },
      {
        que: "ARE THERE ANY TAXES ON THE RENTAL AMOUNT?",
        ans: "Yes, GST will be applicable as per the state laws.",
      },
      {
        que: "ARE THERE ANY TAXES ON THE INCIDENTAL CHARGES ?",
        ans: "",
        list: [
          {
            listArray:
              "Any incidental charges to main services will be included in the value of taxable supply for the purpose of charge of GST. Toll, Parking, Challans etc. are incidental charges to the main activity of rent a cab and therefore it is chargeable to GST.",
          },
          {
            listArray:
              "Extract from The Central Goods and Services Tax Act, Section 15 for reference. Value of taxable supply 15.",
          },
          {
            listArray:
              "(1) The value of a supply of goods or services or both shall be the transaction value, which is the price actually paid or payable for the said supply of goods or services or both where the supplier and the recipient of the supply are not related and the price is the sole consideration for the supply.",
          },
          {
            listArray:
              "(2) The value of supply shall include___ (c) incidental expenses, including commission and packing, charged by the supplier to the recipient of a supply and any amount charged for anything done by the supplier in respect of the supply of goods or services or both at the time of: or before delivery of goods or supply of services",
          },
        ],
      },
      {
        que: "IS SECURITY DEPOSIT DIFFERENT FOR DIFFERENT CAR MODEL?",
        ans: "Security deposit is INR 6000 for Monthly Subscriptions, for daily rentals it is INR 3000. It does not change with car type.",
      },
      {
        que: "HOW WILL YOU REFUND MY SECURITY DEPOSIT?",
        ans: "We will refund your Security Deposit to the source of payment, which may be your credit card or bank, whichever you used at the time of booking.",
      },
      {
        que: "WHEN WILL I GET MY REFUND BACK?",
        ans: "We process your refund request on the same working day when you return the car. It usually takes 24-48hrs for your bank to credit the same into your account.",
      },
      {
        que: "WILL I GET A PHYSICAL BILL?",
        ans: "The copy of the invoice will be mailed to you on your registered e-mail ID.",
      },
    ],
  },
];
