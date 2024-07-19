"use client";
import React from "react";

const ShippingPolicy = () => {
  const [toggle, setToggle] = React.useState("");
  const toggleContent = (heading: string) => {
    toggle !== heading ? setToggle(heading) : setToggle("");
  };
  return (
    <div className="max-w-[1250px] m-auto px-4 sm:py-12 py-8">
      <h1 className="font-bold text-3xl pb-[4px]">SHIPPING POLICY</h1>
      <span className="w-12 h-[4px] bg-primary-color block"></span>
      <div className="mt-8">
        <ol className="sm:ml-4">
          {shippingArray?.map((item, index) => {
            return (
              <li key={index}>
                <h3
                  className="font-[500] tracking-wide cursor-pointer bg-[#f9dfdf] px-4 py-2 rounded-md mb-6 flex justify-between"
                  onClick={() => toggleContent(item?.heading)}
                >
                  <span>
                    {index + 1}. {item?.heading}
                  </span>{" "}
                  <span>{toggle === item?.heading ? "-" : "+"}</span>
                </h3>
                {toggle === "DEFINITIONS AND INTERPRETATION" && (
                  <>
                    {toggle === item?.heading && (
                      <>
                        <div className="mb-6 pl-2 text-sm">
                          <p className="mb-[5px]">
                            Self-Drive mean providing the Vehicle to Me, for the
                            Purpose, during the Hire Period or Additional Term,
                            as the case may be, and more particularly stated in
                            sub-clause
                          </p>
                          <p className="mb-[5px]">
                            1.1.(g) above and clause 4 below “Schedule of
                            Charges” means various other charges including
                            damage charges, in addition to Hire Charges which
                            becomes due and payable by Me upon occurrence of any
                            of events specified in the said section of Schedule
                            of Charges and displayed on Website at
                            https://www.Cabme.com/faqs
                          </p>
                          <div className="grid gap-[5px]">
                            <p>1.2 Interpretation</p>
                            <p>
                              Unless the context otherwise requires in the
                              document:
                            </p>
                            <p>
                              o words importing persons or parties shall include
                              firms and corporations and any organizations
                              having legal capacity;
                            </p>
                            <p>
                              o words importing the singular include the plural
                              and vice versa where the context so requires;
                            </p>
                            <p>
                              o reference to any law shall include such law as
                              from time to time enacted amended, supplemented or
                              re-enacted;
                            </p>
                            <p>
                              o reference to any gender includes a reference to
                              all other genders;
                            </p>
                            <p>
                              o reference to the words “include” or “including”
                              shall be construed without limitation;
                            </p>
                            <p>
                              o reference to the Agreement or any other
                              agreement, deed or other instrument or document
                              shall be construed as a reference to the Agreement
                              or to such agreement, deed or other instrument or
                              document as the same may from time to time be
                              amended, varied supplemented or novated;
                            </p>
                            <p>
                              o the headings and titles in the Agreement are
                              indicative and shall not be deemed part thereof or
                              be taken into consideration in the interpretation
                              or construction of the Agreement.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {toggle === "PROVISION OF A VEHICLE ON A HIRE" && (
                  <>
                    {toggle === item?.heading && (
                      <>
                        <div className="text-sm pl-2 grid gap-4">
                          <p>
                            (1) Upon receipt of the booking request as specified
                            in Reservation Details from Myself by You through
                            Website or Mobile Application or through Coordinates
                            and upon providing of Booking Confirmation o by You
                            to Me, You have agreed to provide the Vehicle on
                            Hire basis to Me for the Purpose for a day(s)/ for a
                            month(s) mentioned in the Reservation Details
                          </p>
                          <p>
                            (2) At the time of handing over of the Vehicle to
                            Me, either I have signed a physical document known
                            as checklist or signed digitally through Vehicle
                            Delivery App acknowledging the receipt of the
                            Vehicle alongwith Vehicle details such as make,
                            model, Registration No of the Vehicle etc. I confirm
                            that the Hire Period shall commence immediately upon
                            handing over the Vehicle to the Me by Your
                            representatives.
                          </p>
                          <p>(3) I hereby confirm that:</p>
                          <p>
                            (4) I have attained 21 years of age as on
                            Commencement Date;
                          </p>
                          <p>
                            (5) I have driving experience of a minimum of 1 year
                            and that I am possessing valid driving license,
                            voter ID/Passport and/or PAN and Aadhaar Card which
                            I have furnished to You.
                          </p>
                          <p>
                            (6) I have taken Vehicle on Hire from You at My own
                            risk and I shall be solely liable for any accident,
                            failure or loss or damage of any kind whatsoever
                            that may be caused to or occasioned by Me in
                            connection with or incidental to the provision of
                            the Vehicle on a Hire basis. You shall not be liable
                            for any loss, damage, costs, charges or expenses
                            whatsoever that may be caused to or occasioned by Me
                            or any other person seated in the Vehicle unless
                            specifically mentioned in this document
                          </p>
                          <p>
                            (7) Upon end of the Hire Period or Additional Term,
                            as the case may be, I shall inspect the Vehicle to
                            check whether I have left any of My luggage and/or
                            items at the time of handing over the Vehicle back
                            to You. At no point in time, You shall be
                            responsible for any luggage and/or items left by
                            Myself and/or the co passengers in the Vehicle
                          </p>
                          <p>
                            (8) I hereby undertakes to abide by existing
                            legislation and Applicable Law pertaining to the use
                            of Vehicle including but not limited to situation
                            when a border is crossed. If, due to non-compliance
                            with the foregoing, the authorities temporarily or
                            permanently impound the Vehicle, all the costs,
                            charges and expenses including fines, charges
                            incurred / to be incurred to ensure that the Vehicle
                            is released at the earliest, shall be borne by
                            Myself.
                          </p>
                          <p>
                            (9) The Vehicle will be filled with fuel upto the
                            liters as displayed in the fuel gauge indicator on
                            the dashboard or instrument panel. I shall verify
                            the fuel gauge indicator at the time of taking
                            possession of Vehicle before Commencement Date. I
                            shall have to return the Vehicle with number of
                            liters of fuel as was available and indicated in
                            fuel gauge indicator at the time of Commencement
                            Date. If the Vehicle is returned by Me with lesser
                            fuel than required to make the number of liters as
                            was available in the fuel gauge indicator at the
                            time of Commencement Date, then, I shall pay to You
                            the cost of the liters of fuel required to fill the
                            fuel tank as required to bring it to the level
                            prevalent at the time of Commencement Date and
                            indicated in fuel gauge indicator. Your decision in
                            this regard shall be final in determining the number
                            of liters required to fill the fuel tank. Besides
                            above, I shall be required to pay charges as
                            specified in Schedule of Charges for refueling to be
                            done by You. You shall deduct the fuel cost along
                            with service charge and other charges from the
                            Security Deposit or I shall undertake to pay the
                            same through weblink provided by You to Me, as the
                            case may be.
                          </p>
                          <p>(10) I shall take possession of the Vehicle from the pickup point specified in the Reservation Details and hereby consent to adhere to and comply with the instructions as issued by CABME (“Instructions/Guidelines”) from time to time which includes</p>
                          <div className="pl-2">
                          <p>(i) Taking My photograph along with Vehicle</p>
                          <p>(ii) taking photograph of the Vehicle number plate</p>
                          <p>(iii) for payment of interstate charges when the state border is crossed. I hereby explicitly allow Your representative to take picture as required under this section</p>
                          </div>
                          <p>(11) I am permitted to drive the Vehicle up to the Permissible Kilometer. Any usage of the Additional Kilometers shall attract the extra kilometer charges as specified in the Booking Confirmation ..</p>
                          <p>(12) The Vehicle shall have the luggage carrier provided I have opted the same and specified in Reservation Details. If for any reason the luggage carried is not provided by You to Me, despite opted by Me at the time of booking of the Vehicle, then You shall refund the charges paid by Me towards the luggage carrier</p>
                          <p>(13) I acknowledge that You reserve unilateral right to reject the booking request at any subsequent stage without assigning any reason provided You agree to refund the Security Deposit and advance Subscription Fees withing 7 to 10 working days of cancellation by you.</p>
                          <p>(14) If third-party lays claim to or detains the Vehicle or otherwise take any action in respect of the Vehicle, I shall take immediate action to ensure that the Vehicle is released from such detention and / or such claim is fully satisfied by Me in that regard. If I lose legal or physical control of the Vehicle, I shall inform You within four hours and if necessary, take appropriate measures to ensure recovering legal and physical control of the Vehicle. You may take any and all actions in the interests of protecting Your rights including taking action in the My name. The costs incurred as a result of any action as stated herein are to be borne by Me and payment for this cost shall be appropriated from the Security Deposit held by You and if the Security Deposit amount fall short of payments due, then the I shall be liable to pay the same upon receipt of notice of demand in that behalf</p>
                          <p>(15) I shall be liable to pay charges / penalties specified in the Schedule of Charges if I fail to adhere to terms of Use of Vehicle as specified herein below or any other non-compliances as observed by You</p>
                          <p>(16) Permissible Kilometers once opted at the time of booking of the Vehicle on Hire basis and specified in Reservation Details and thereafter in Booking Confirmation then the same cannot be altered under any circumstances. If I wish to alter the Permissible Kilometers originally opted then I shall have to cancel the original booking and shall have to cause new booking only</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default ShippingPolicy;
const shippingArray = [
  {
    heading: "DEFINITIONS AND INTERPRETATION",
  },
  {
    heading: "PROVISION OF A VEHICLE ON A HIRE",
  },
];
