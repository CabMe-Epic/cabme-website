"use client";
import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  const [toggle, setToggle] = React.useState("");
  const toggleContent = (heading: string) => {
    toggle !== heading ? setToggle(heading) : setToggle("");
  };
  return (
    <div className="max-w-[1250px] m-auto px-4 sm:py-12 py-8">
      <h1 className="font-bold text-3xl pb-[4px]">User Agreement</h1>
      <span className="w-12 h-[4px] bg-primary-color block"></span>
      <h2 className="font-semibold my-4">Daily Rentals</h2>
      <div>
        <ol style={{ listStyle: "auto" }}>
          {termsArray?.map((item, index) => {
            return (
              <div key={index}>
                <li
                  className="font-[500] tracking-wide cursor-pointer bg-[#f9dfdf] px-4 py-2 rounded-md mb-6 flex justify-between"
                  onClick={() => toggleContent(item?.heading)}
                >
                  <span>
                    {index + 1}. {item?.heading}
                  </span>
                  <span>{toggle === item?.heading ? "-" : "+"}</span>
                </li>
                {toggle === "DEFINITIONS AND INTERPRETATION" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pl-2 pb-4">
                        <p className="my-4">
                          (r) Self-Drive mean providing the Vehicle to Me, for
                          the Purpose, during the Hire Period or Additional
                          Term, as the case may be, and more particularly stated
                          in sub-clause 1.1.(g) above and clause 4 below
                        </p>
                        <p className="mb-4">
                          (s) “Schedule of Charges” means various other charges
                          including damage charges, in addition to Hire Charges
                          which becomes due and payable by Me upon occurrence of
                          any of events specified in the said section of
                          Schedule of Charges and displayed on Website at{" "}
                          <Link href={"https://www.Cabme.com/faqs"}>
                            {" "}
                            https://www.Cabme.com/faqs
                          </Link>
                        </p>
                        <div>
                          <h3 className="font-semibold mb-2">
                            1.2 Interpretation
                          </h3>
                          <p className="mb-2">
                            Unless the context otherwise requires in the
                            document:
                          </p>
                          <ul className="grid gap-2">
                            <li>
                              (a) words importing persons or parties shall
                              include firms and corporations and any
                              organizations having legal capacity;
                            </li>
                            <li>
                              (b) words importing the singular include the
                              plural and vice versa where the context so
                              requires;
                            </li>
                            <li>
                              (c) reference to any law shall include such law as
                              from time to time enacted amended, supplemented or
                              re-enacted;
                            </li>
                            <li>
                              (d) reference to any gender includes a reference
                              to all other genders;
                            </li>
                            <li>
                              (e) reference to the words “include” or
                              “including” shall be construed without limitation;
                            </li>
                            <li>
                              (f) reference to the Agreement or any other
                              agreement, deed or other instrument or document
                              shall be construed as a reference to the Agreement
                              or to such agreement, deed or other instrument or
                              document as the same may from time to time be
                              amended, varied supplemented or novated;
                            </li>
                            <li>
                              (g) the headings and titles in the Agreement are
                              indicative and shall not be deemed part thereof or
                              be taken into consideration in the interpretation
                              or construction of the Agreement.
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {toggle === "PROVISION OF A VEHICLE ON A HIRE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm grid gap-2 pl-2 pb-4">
                        <p>
                          2.1 Upon receipt of the booking request as specified
                          in Reservation Details from Myself by You through
                          Website or Mobile Application or through Coordinates
                          and upon providing of Booking Confirmation o by You to
                          Me, You have agreed to provide the Vehicle on Hire
                          basis to Me for the Purpose for a day(s)/ for a
                          month(s) mentioned in the Reservation Details
                        </p>
                        <p>
                          2.2 At the time of handing over of the Vehicle to Me,
                          either I have signed a physical document known as
                          checklist or signed digitally through Vehicle Delivery
                          App acknowledging the receipt of the Vehicle alongwith
                          Vehicle details such as make, model, Registration No
                          of the Vehicle etc. I confirm that the Hire Period
                          shall commence immediately upon handing over the
                          Vehicle to the Me by Your representatives.
                        </p>
                        <p>2.3 I hereby confirm that:</p>
                        <p>
                          2.3.1 I have attained 21 years of age as on
                          Commencement Date;
                        </p>
                        <p>
                          2.3.2 I have driving experience of a minimum of 1 year
                          and that I am possessing valid driving license, voter
                          ID/Passport and/or PAN and Aadhaar Card which I have
                          furnished to You.
                        </p>
                        <p>
                          2.3.3 I have taken Vehicle on Hire from You at My own
                          risk and I shall be solely liable for any accident,
                          failure or loss or damage of any kind whatsoever that
                          may be caused to or occasioned by Me in connection
                          with or incidental to the provision of the Vehicle on
                          a Hire basis. You shall not be liable for any loss,
                          damage, costs, charges or expenses whatsoever that may
                          be caused to or occasioned by Me or any other person
                          seated in the Vehicle unless specifically mentioned in
                          this document
                        </p>
                        <p>
                          2.4 Upon end of the Hire Period or Additional Term, as
                          the case may be, I shall inspect the Vehicle to check
                          whether I have left any of My luggage and/or items at
                          the time of handing over the Vehicle back to You. At
                          no point in time, You shall be responsible for any
                          luggage and/or items left by Myself and/or the co
                          passengers in the Vehicle
                        </p>
                        <p>
                          2.5 I hereby undertakes to abide by existing
                          legislation and Applicable Law pertaining to the use
                          of Vehicle including but not limited to situation when
                          a border is crossed. If, due to non-compliance with
                          the foregoing, the authorities temporarily or
                          permanently impound the Vehicle, all the costs,
                          charges and expenses including fines, charges incurred
                          / to be incurred to ensure that the Vehicle is
                          released at the earliest, shall be borne by Myself.
                        </p>
                        <p>
                          2.6 The Vehicle will be filled with fuel upto the
                          liters as displayed in the fuel gauge indicator on the
                          dashboard or instrument panel. I shall verify the fuel
                          gauge indicator at the time of taking possession of
                          Vehicle before Commencement Date. I shall have to
                          return the Vehicle with number of liters of fuel as
                          was available and indicated in fuel gauge indicator at
                          the time of Commencement Date. If the Vehicle is
                          returned by Me with lesser fuel than required to make
                          the number of liters as was available in the fuel
                          gauge indicator at the time of Commencement Date,
                          then, I shall pay to You the cost of the liters of
                          fuel required to fill the fuel tank as required to
                          bring it to the level prevalent at the time of
                          Commencement Date and indicated in fuel gauge
                          indicator. Your decision in this regard shall be final
                          in determining the number of liters required to fill
                          the fuel tank. Besides above, I shall be required to
                          pay charges as specified in Schedule of Charges for
                          refueling to be done by You. You shall deduct the fuel
                          cost along with service charge and other charges from
                          the Security Deposit or I shall undertake to pay the
                          same through weblink provided by You to Me, as the
                          case may be.
                        </p>
                        <p>
                          2.7 I shall take possession of the Vehicle from the
                          pickup point specified in the Reservation Details and
                          hereby consent to adhere to and comply with the
                          instructions as issued by CABME
                          (“Instructions/Guidelines”) from time to time which
                          includes (i) Taking My photograph along with Vehicle
                          (ii) taking photograph of the Vehicle number plate
                          (iii) for payment of interstate charges when the state
                          border is crossed. I hereby explicitly allow Your
                          representative to take picture as required under this
                          section
                        </p>
                        <p>
                          2.8 I am permitted to drive the Vehicle up to the
                          Permissible Kilometer. Any usage of the Additional
                          Kilometers shall attract the extra kilometer charges
                          as specified in the Booking Confirmation ..
                        </p>
                        <p>
                          2.9 The Vehicle shall have the luggage carrier
                          provided I have opted the same and specified in
                          Reservation Details. If for any reason the luggage
                          carried is not provided by You to Me, despite opted by
                          Me at the time of booking of the Vehicle, then You
                          shall refund the charges paid by Me towards the
                          luggage carrier
                        </p>
                        <p>
                          2.10 I acknowledge that You reserve unilateral right
                          to reject the booking request at any subsequent stage
                          without assigning any reason provided You agree to
                          refund the Security Deposit and advance Subscription
                          Fees withing 7 to 10 working days of cancellation by
                          you.
                        </p>
                        <p>
                          2.11 If third-party lays claim to or detains the
                          Vehicle or otherwise take any action in respect of the
                          Vehicle, I shall take immediate action to ensure that
                          the Vehicle is released from such detention and / or
                          such claim is fully satisfied by Me in that regard. If
                          I lose legal or physical control of the Vehicle, I
                          shall inform You within four hours and if necessary,
                          take appropriate measures to ensure recovering legal
                          and physical control of the Vehicle. You may take any
                          and all actions in the interests of protecting Your
                          rights including taking action in the My name. The
                          costs incurred as a result of any action as stated
                          herein are to be borne by Me and payment for this cost
                          shall be appropriated from the Security Deposit held
                          by You and if the Security Deposit amount fall short
                          of payments due, then the I shall be liable to pay the
                          same upon receipt of notice of demand in that behalf
                        </p>
                        <p>
                          2.12 I shall be liable to pay charges / penalties
                          specified in the Schedule of Charges if I fail to
                          adhere to terms of Use of Vehicle as specified herein
                          below or any other non-compliances as observed by You
                        </p>
                        <p>
                          2.13 Permissible Kilometers once opted at the time of
                          booking of the Vehicle on Hire basis and specified in
                          Reservation Details and thereafter in Booking
                          Confirmation then the same cannot be altered under any
                          circumstances. If I wish to alter the Permissible
                          Kilometers originally opted then I shall have to
                          cancel the original booking and shall have to cause
                          new booking only
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "PERIOD AND CANCELLATION PROVISIONS:" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4">
                        <p className="mb-2">
                          3.1 The Hire Period shall commence on the Commencement
                          Date and end on the last of the Hire Period.
                        </p>
                        <strong className="font-semibold">
                          3.2 Cancellation Policy
                        </strong>
                        <p className="mt-2">
                          In case I choose to cancel My Subscription request
                          after the Vehicle is handed over, then Subscription
                          Fee paid by Me is liable to be forfeited at Your
                          discretion
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "EXTENSION TERMS OF HIRE PERIOD" && (
                  <>
                    {toggle === item?.heading && (
                      <>
                        <div className="text-sm pb-4 pl-2 grid gap-2">
                          <p>
                            4.1 If I desire to extend the Hire Period, as
                            specified in Reservation Details, for further period
                            (“Additional Term” ), I shall be required to inform
                            You via designated Coordinates minimum 4 hours prior
                            to the scheduled return time. You shall ascertain
                            possibility of extension for Additional Term and
                            communicate to Me within one hour of request. If You
                            confirm the availability of the Vehicle for
                            Additional Term, then I shall pay the contracted
                            Hire Charges for the Additional Term through weblink
                            to be provided by You on My mobile no or email id
                            registered with You
                          </p>
                          <p>
                            4.2 If, however You have advised Me of
                            non-availability of the Vehicle sought for the
                            Additional Term, then I shall have to return the
                            Vehicle on original scheduled return time. If I fail
                            to return the Vehicle on scheduled return time, I
                            shall pay contracted Hire Charges in addition to Rs
                            300/- per hour without any demure or protest through
                            weblink to be provided by You on My mobile no or
                            email id registered with You
                          </p>
                          <p>
                            4.3 In case I fail to return the Vehicle on the
                            scheduled return time without informing You of such
                            a delay, such delay shall deem to be considered as
                            Additional Term and I shall pay the contracted Hire
                            Charges for the Additional Term in addition to Rs
                            300/- per hour without any demure or protest through
                            weblink to be provided by You on My mobile no or
                            email id registered with You
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
                {toggle === "USE OF THE VEHICLE" && (
                  <>
                    {toggle === item?.heading && (
                      <>
                        <div className="text-sm pb-4 pl-2 grid gap-2">
                          <p>I confirm and acknowledge that:</p>
                          <p>
                            (a) I have read and understood the terms and
                            conditions of this document of the usage of the
                            Vehicle and shall adhere to the same during the Hire
                            Period or for Additional Term, as the case may be.
                          </p>
                          <p>
                            (b) the Vehicle is provided by You to Me not for any
                            other reason other than the Purpose.
                          </p>
                          <p>
                            (c) the Vehicle shall be used by Me strictly in
                            accordance with the procedure prescribed by the
                            manufacturer of the Vehicle and in accordance with
                            the Applicable Law.
                          </p>
                          <p>
                            (d) I shall not make or allow to make any addition
                            or alteration to the Vehicle or carry out any
                            repairs or replacement to the Vehicle or any parts
                            and accessories thereof during the Hire Period or
                            Additional Term, as the case may be.
                          </p>
                          <p>
                            (e) I have valid driving license to drive the
                            Vehicle during the Hire Period or Additional Term,
                            as the case may be.
                          </p>
                          <p>
                            (f) I shall drive the Vehicle Myself or allowed to
                            be plied by the person who has a valid driving
                            license. In case I allow any other person to drive
                            the Vehicle then I shall notify to you in advance
                            and also shall supply copy of their driving license
                          </p>
                          <p>
                            (g) I shall ensure that the distinguishing marks on
                            or exhibited in the Vehicle are not removed.
                          </p>
                          <p>
                            (h) I shall not tamper with or damage the odometer
                            or any other accessories fitted in the Vehicle and
                            in case the same is done then I shall replace the
                            same at My cost and consequences and I shall also
                            pay the charges stipulated in Schedule of Charges
                          </p>
                          <p>
                            (i) I shall not allow the Vehicle to be used for any
                            illegal or unlawful purpose
                          </p>
                          <p>
                            (j) I shall ensure that the Vehicle is not driven
                            outside India geographical limits without Your prior
                            written permission.
                          </p>
                          <p>
                            (k) I shall not use the Vehicle to carry number of
                            persons (excluding the driver) exceeding the
                            permissible number as specified in the Act.
                          </p>
                          <p>
                            (l) I shall not ferry passengers or any goods for
                            consideration or reward whether expressed or
                            implied.
                          </p>
                          <p>
                            (m) I shall not use the Vehicle for undertaking road
                            trip specifically for any reward / award or for
                            creating any record or recognition (personal
                            /self-motivated or sponsored) of any nature
                            whatsoever.
                          </p>
                          <p>
                            (n) I shall not ferry any type of animals in the
                            Vehicle In case any damage is caused to the Vehicle
                            on account of ferrying such pet animal(s), I shall
                            be liable to pay charges as specified in Schedule of
                            Charges.
                          </p>
                          <p>
                            (o) I shall not carry Myself or allow others to
                            carry any contraband, hazardous or inflammable
                            material, firearms or other band or prohibited
                            articles under Applicable Law or any other Indian
                            laws.
                          </p>
                          <p>
                            (p) I shall not use the Vehicle or allow the Vehicle
                            to be used for any illegal or unlawful activity or
                            purpose.
                          </p>
                          <p>
                            (q) I shall not use the Vehicle or allow the Vehicle
                            to be used in motor sport event such as racing,
                            rallying or for learning driving of Vehicles or
                            taking driving lessons, speed testing or any other
                            similar activities which may cause damage to the
                            Vehicle.
                          </p>
                          <p>
                            (r) I shall not use the Vehicle to propel or tow any
                            other vehicle or trailer
                          </p>
                          <p>
                            (s) I shall not drive beyond the permissible speed
                            limit as per the Act.
                          </p>
                          <p>
                            (t) I shall not drive or allow others to drive the
                            Vehicle when under the influence of alcohol or drugs
                            or suffering from any disease or disability, which
                            may impair driving ability or which is likely to
                            cause a source of danger to the public and/or to the
                            Vehicle.
                          </p>
                          <p>
                            (u) I shall not do or omit to do or be done or
                            permit or suffer any act, which might or could
                            prejudicially vitiate or affect the insurance of the
                            Vehicle.
                          </p>
                          <p>
                            (v) I shall not carry out any additions/alterations
                            to the Vehicle which shall affect the marketability
                            of the Vehicle, without the prior written permission
                            from OAIS
                          </p>
                          <p>
                            (w) I will follow the owner's manual instructions,
                            if provided in the Vehicle’s glove compartment,
                            while using the Vehicle. If a problem arises, that
                            prevents or limits the use of the Vehicle or that
                            may compromise people's safety, I will immediately
                            notify at Coordinates and follow instructions as
                            provided. I may have to pay for towing, repairs, and
                            other expenses in some circumstances.
                          </p>
                          <p>
                            (x) I will notify You immediately on Coordinates, If
                            I perform a jump start to the Vehicle. I shall be
                            fully responsible for any damage that may result
                            from the improper use of jumper cables or other
                            tools. It is strictly forbidden to use the Vehicle
                            to provide a jump start to any other vehicle.
                          </p>
                          <p>
                            (y) I am not permitted to take the Vehicle outside
                            India. I shall be solely responsible for payment of
                            any and all toll or other road / parking charges
                            /interstate permit charges, as applicable, during
                            Hire Period towards usage of the Vehicle. However,
                            in view of the mandatory requirements of affixing
                            ‘FASTag’ on the Vehicle (which is pre-loaded with
                            the amount) for smooth payment of toll charges at
                            various toll gates, I hereby agree to reimburse the
                            toll / parking charges debited or deducted from
                            FASTag during Hire Period alongwith applicable GST.
                            Your decision in this regard shall be final and
                            conclusive
                          </p>
                          <p>
                            (z) In case of breakdown of the Vehicle, I shall not
                            leave or abandon the Vehicle until RSA (as defined
                            below) is provided to Me or other alternate
                            arrangements are made by You to take custody of the
                            breakdown Vehicle.
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
                {toggle === "PAYMENT TERMS" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          6.1 In consideration of provision of the Vehicle by
                          You to Me on Subscription basis, I have paid / shall
                          pay to You the Subscription Fee, in advance on monthly
                          basis during Hire Period or Additional Term, as the
                          case may be. The amount of Subscription Fee paid and
                          payable by Me is specified in the Reservation Details.
                          For payment of Subscription Fee balance term in Hire
                          Period or for the Additional Term, as the case may be,
                          You shall provide weblink on My mobile no or email id
                          registered with You through which I shall pay the
                          same. Besides the Subscription Fee, I am required to
                          pay charges for Additional Kilometers, as specified in
                          Booking Confirmation, if I have plied the Vehicle over
                          and above the Permissible Kilometer
                        </p>
                        <p>
                          6.2 Besides Subscription Fee, I am also liable to pay
                          FASTag charges and other charges as specified in
                          Schedule of Charges depending on the trigger of events
                          as specified therein. Levy of such other charges by
                          You shall be final and binding upon Me and I shall not
                          contest the same anytime during Hire Period or
                          Additional Term, as the case may or anytime thereafter
                          and I shall be liable to pay such charges without
                          protest, and demure.
                        </p>
                        <p>
                          6.3 The Subscription Fee is inclusive of Goods &
                          Services Tax (GST) and/ or such other indirect taxes
                          and cess, if any, (hereinafter referred to as ‘Taxes’)
                          and such Taxes shall be levied as per Applicable Law,
                          read together with the rules, regulations, and
                          amendments, including any notification and/ or
                          amendments, pursuant thereto, from time to time.
                        </p>
                        <p>
                          6.4 I shall deduct at source all such taxes as are to
                          be deducted under the provisions of Income Tax Act or
                          any other statute/rule/bye law in force provided I am
                          entitled to do so.
                        </p>
                        <p>
                          6.5 I understand and agree that Subscription Fee as
                          specified in Reservation Details will not change as a
                          result of any promotional offers or discounts, and
                          that I shall not request for any variation and/or
                          reduction or seek any benefits in terms of
                          Subscription Fee during the Hire Period or Additional
                          Term post agreeing to the terms and conditions under
                          this document save and except situations as specified
                          in sub clause 6.1.6 below
                        </p>
                        <p>
                          6.6 In case where I decide, after Commencement Date
                          and during Hire Period, to surrender back the Vehicle
                          prior to the last day of Hire Period as opted by Me
                          and specified in Reservation Details and in Booking
                          Confirmation, I shall be liable to pay liquidate
                          damage which shall be equivalent to amount as
                          specified and explained in Schedule of Charges by way
                          of example
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "SECURITY DEPOSIT" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          7.1 I have paid Security Deposit for an amount as
                          indicated in Reservation Details. In case of any
                          damage to the Vehicle, You shall have unconditional
                          authority from Myself to deduct the cost of repairing
                          any such damage from either Security Deposit or as and
                          by way of preauthorized amount subject to terms of
                          this Agreement
                        </p>
                        <p>
                          7.2 In an event of expiration of Hire Period or
                          Additional Term, as the case may be and prior to the
                          refund of the Security Deposit to Me, You shall have
                          right to adjust from the Security Deposit any amount
                          ascertained by You to be payable by Me. I hereby
                          specifically authorize You to make such adjustments.
                        </p>
                        <p>
                          7.3 On expiration of the Hire Period or Additional
                          Term, as the case may be, You shall refund the
                          Security Deposit paid for the Vehicle to Me provided
                          there is balance left, if any, with You after
                          adjustments of the amounts due to You within 7 to 10
                          working days.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "OWNERSHIP OF THE VEHICLE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          8.1 Save and except as otherwise provided in the
                          Agreement, no right, title or interest in the Vehicle
                          as the owner shall pass on to Me by virtue of these
                          presents or otherwise howsoever. I shall at no time
                          during subsistence of the Agreement be entitled to
                          claim the ownership of the Vehicle or challenge Your
                          ownership, right, title and interest in the Vehicle. I
                          acknowledge Your independent and undisputed right,
                          title or interest in the Vehicle to mortgage,
                          hypothecate or sell the Vehicle
                        </p>
                        <p>
                          8.2 I acknowledge that the Vehicle is registered in
                          Your name as required under the MVT Law
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "EVENTS OF DEFAULT" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          9.1{" "}
                          <strong className="font-semibold">
                            {" "}
                            Events of Defaults by Hirer:
                          </strong>{" "}
                          Notwithstanding the Hire Period or Additional Term, as
                          the case may be, upon occurrence of any of the events
                          specified hereunder, You shall have the right to
                          terminate the Hire of Vehicle under this document, by
                          way of a written notice to Me (Termination Notice):
                        </p>
                        <p>
                          (a) If I breach any of the terms and conditions of
                          this document and in particular conditions specified
                          in Clause No 5 above..
                        </p>
                        <p>
                          (b) I have, without Your consent, attempted to
                          transfer or otherwise dispose of the Vehicle by way of
                          sell, transfer, charge or otherwise in any manner part
                          with the possession of the Vehicle or any part thereof
                          or allow or purport to do or allow or create any lien,
                          charge, attachment or other claim of whatsoever nature
                          on the Vehicle or any part thereof; or
                        </p>
                        <p>
                          (c) I have become bankrupt or become insolvent or have
                          made an assignment for the benefit of creditors, or
                          have consented to the appointment of a trustee or
                          receiver for a substantial part of My property or
                          insolvency proceedings has been instituted by or
                          against Me, voluntary or otherwise; or
                        </p>
                        <p>
                          (d) I am in breach of any representation or warranty
                          as mentioned in Clause 23 or they are found to be or
                          become incorrect.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle ===
                  "CONSEQUENCES UPON END OF HIRE PERIOD / ADDITIONAL TERM OR TERMINATION OF THE AGREEMENT" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          10.1 Upon end of Hire Period / Additional Term or
                          Termination of the Agreement in terms of clause 9.1
                          above, I am required to surrender of the Vehicle to
                          You in good order and condition, normal wear and tear
                          being accepted.
                        </p>
                        <p>
                          10.2 Along with the Vehicle including tyres, tools and
                          accessories fitted, I shall have to surrender to You:
                        </p>
                        <p>
                          (a) Manufacturer’s manual, warranties and other
                          documents furnished by the manufacturer in respect of
                          the Vehicle.
                        </p>
                        <p>
                          (b) Copies of registration certificate and the
                          insurance policy.
                        </p>
                        <p>
                          (c) keys (original) of the Vehicle and accessories of
                          the Vehicle.
                        </p>
                        <p>
                          10.3 If I fail to comply with any of the requirements
                          as specified in clause 10.2 above, I shall be required
                          to pay charges as specified in Schedule of Charges
                        </p>
                        <p>
                          10.4 In the event I have surrendered the Vehicle with
                          an unreasonable or unacceptable level of wear and tear
                          as determined by You, (reasonable wear and tear
                          excepted), I shall be liable to bear damage charges as
                          specified under section Schedule of Charges.
                        </p>
                        <p>
                          10.5 I shall return the Vehicle in clean, good order
                          and condition in which the Vehicle was provided by You
                          prior to Commencement Date. In the event I return the
                          Vehicle with an unreasonable or unacceptable level of
                          wear and tear, then in that case I shall, at Your sole
                          discretion, be liable to bear all costs and charges
                          for refurbishing/repairing the Vehicle depending on
                          the condition of the Vehicle at the time of its
                          return. Furthermore, any and all decision made by You
                          in this regard shall be final and binding on Me.
                          Moreover, if the Vehicle is returned in unclean or
                          unhygienic condition and if You are caused to incur
                          any cost in that regard including but not limited to
                          refurbishing of the upholstery of the Vehicle, I shall
                          be liable to pay the charges as stipulated for the
                          purpose in the Schedule of Charges and any other
                          charges incidental and ancillary thereto
                        </p>
                        <p>
                          10.6 If the Vehicle is not returned by Me either on
                          the last day of Hire Period or Additional Term or
                          Termination of Hire of the Vehicle under this
                          document, as the case may be, You shall have
                          unconditional right to assume that the Vehicle has
                          been lost or stolen and You shall be entitled to
                          proceed to take appropriate legal action and that You
                          shall be entitled to repossess the Vehicle whenever it
                          is found and whomsoever may be in possession thereof
                          at My costs and expenses and without reference or
                          notice to Me. I hereby irrevocably authorize You
                          acting through its representatives to take physical
                          possession of the Vehicle.
                        </p>
                        <p>
                          10.7 Upon completion of the Hire Period or Additional
                          Term, as the case may be, I shall return the Vehicle
                          to the agreed return location and on the date and time
                          specified in the Reservation Details. If I desire to
                          return the Vehicle at a different location within the
                          same city then I shall be liable to pay the charges as
                          stipulated in Schedule of Charges. Under no
                          circumstances I shall attempt to return the Vehicle in
                          a city which is different than the city in which the
                          Vehicle was delivered to Me. If I do so, the I shall
                          be liable to pay charges as stipulated in the Schedule
                          of Charges
                        </p>
                        <p>
                          10.8 I shall hold You and Your officers, employees,
                          agents and affiliates (Indemnified Person) harmless
                          against any claim in connection with the Vehicle
                          and/or its re-possession and shall irrevocably and
                          unconditionally indemnify Indemnified Person against
                          any cost, loss or liability suffered by You arising
                          out of or in connection with any claim made by a third
                          party against You in relation to the Vehicle and/or
                          its re-possession.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "COMPLIANCE BY HIRER:" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          11.1 I am required to fulfil the below mentioned
                          conditions at the time of handing over the Vehicle by
                          You to Me:
                        </p>
                        <p>
                          (a) I shall show the original driving license and My
                          KYC documents that was shared with You at the time of
                          uploading the same on Website or Mobile App. I shall
                          produce the same to Your representative, for their
                          verification, at the time of delivery, prior to taking
                          possession of the Vehicle;
                        </p>
                        <p>
                          (b) I shall provide support Your representative for
                          capturing the image of any one out of following
                          documents as an additional identity proof:
                        </p>
                        <p>
                          <ul className="grid gap-2">
                            <li>(i) Election/Voter&apos;s Card;</li>
                            <li>(ii) Valid Passport; or</li>
                            <li>(iii) Utility /Telephone Bills</li>
                          </ul>
                        </p>
                        <p>
                          (c) I shall co-operate with Your representatives for
                          taking a photograph of Myself and the Vehicle, for
                          safety and record-keeping purposes.
                        </p>
                        <p>
                          11.2 In relation to My use of the Vehicle during the
                          Hire Period or Additional Term, I shall always comply
                          with the manufacturer&apos;s manual as provided to Me
                          and hereby understand that any failure to comply with
                          the same may lead to cancellation of the warranty
                          availed by You from the manufacturer.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "INSPECTION OF VEHICLE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          13.1 You shall ensure to maintain a comprehensive
                          insurance coverage for the Vehicle, including third
                          party insurance, during the Hire Period and/or
                          Additional Term, if any.
                        </p>
                        <p>
                          13.2 I shall not do or omit to do or be done or permit
                          or suffer any act, which might or could prejudicially
                          vitiate or affect the insurance of the Vehicle. Upon
                          the happening of any such event that causes any
                          damage, accident or loss to the Vehicle and/or its
                          accessories, including but not limited to an accident,
                          theft, damage caused by a fire explosion,
                          self-ignition or lightening, burglary, riot,
                          earthquake, flood, hurricane, storm, tempest, cyclone,
                          frost, malicious act and/or terrorist activity, I
                          shall immediately notify to You, at the designated
                          Coordinates, of such damage or loss relating to the
                          Vehicle and shall confirm this in writing, within 4
                          hours of the occurrence of such event causing loss
                          and/or damage to the Vehicle.
                        </p>
                        <p>
                          13.3 I undertake to facilitate the settlement of all
                          cases of damage by providing the relevant information
                          and taking all the steps required for this purpose.
                          Without prejudice to the aforesaid, You shall, at all
                          times, retain the unequivocal right to initiate an
                          investigation in the event of any loss occurrence.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle ===
                  "COVENANTS WITH REGARD TO INSURANCE OF THE VEHICLE:" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          13.1 You shall ensure to maintain a comprehensive
                          insurance coverage for the Vehicle, including third
                          party insurance, during the Hire Period and/or
                          Additional Term, if any.
                        </p>
                        <p>
                          13.2 I shall not do or omit to do or be done or permit
                          or suffer any act, which might or could prejudicially
                          vitiate or affect the insurance of the Vehicle. Upon
                          the happening of any such event that causes any
                          damage, accident or loss to the Vehicle and/or its
                          accessories, including but not limited to an accident,
                          theft, damage caused by a fire explosion,
                          self-ignition or lightening, burglary, riot,
                          earthquake, flood, hurricane, storm, tempest, cyclone,
                          frost, malicious act and/or terrorist activity, I
                          shall immediately notify to You, at the designated
                          Coordinates, of such damage or loss relating to the
                          Vehicle and shall confirm this in writing, within 4
                          hours of the occurrence of such event causing loss
                          and/or damage to the Vehicle.
                        </p>
                        <p>
                          13.3 I undertake to facilitate the settlement of all
                          cases of damage by providing the relevant information
                          and taking all the steps required for this purpose.
                          Without prejudice to the aforesaid, You shall, at all
                          times, retain the unequivocal right to initiate an
                          investigation in the event of any loss occurrence.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle ===
                  "COVENANTS WITH REGARD TO MAINTENANCE OF THE VEHICLE:" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          14.1 You shall ensure to repair and maintain the
                          Vehicle at your cost. You will also be responsible for
                          timely servicing of the Vehicle as prescribed by the
                          manufacturer of Vehicle in its manual.
                        </p>
                        <p>
                          14.2 I shall be responsible for the cleanliness of the
                          Vehicle and I am expected to assist / help You to
                          maintain the driving safety and performance of the
                          Vehicle during the Hire Period or Additional Term, as
                          the case may be, especially when the Vehicle indicates
                          that service or maintenance is required. In the event
                          of any issues or damages to the Vehicle, I shall be
                          required to report the same to You at designated
                          Coordinates. In the event any issues or damages need
                          urgent repair or fixing (in place other than
                          location), I shall get the same fixed at Vehicle’s
                          manufacturer authorized workshops only. If I pay for
                          repair of the Vehicle, I shall be required to keep the
                          original invoice which is subject to You verification,
                          which conspicuously captures the date and time showing
                          that it was incurred during the Hire Period. I shall
                          ensure that such receipts of payment made by Me shall
                          have to be compulsorily in Your name so as to enable
                          you to process my reimbursement claims. I shall give a
                          physical original hard copy of the receipt to Your
                          representative within 5 business days from the date of
                          expenses being incurred. You will reimburse to Me the
                          expenses incurred by Me by way of crediting My bank
                          account or debit card, post the verification of claim
                          and corresponding invoices provided by Me and receipt
                          are in Your name. No reimbursement or credit will be
                          given without an invoice, or if the invoice is
                          submitted later than 5 business days from the invoice
                          date.
                        </p>
                        <p>
                          14.3 I shall be provided with pick and drop facility
                          for causing periodical servicing of the Vehicle
                          subject to the condition that the Vehicle is within
                          the local municipal limit where Vehicle was originally
                          delivered
                        </p>
                        <p>
                          14.4 I shall be solely responsible for the damages to
                          the Vehicle (mechanical or accidental damages) which,
                          in the Your opinion or Your agent’s opinion, has been
                          caused willfully and/or is the result of rash and
                          negligent driving or any other negligent/malicious act
                          and I shall at My own cost and expenses cause the
                          repairs of the Vehicle at the manufacturer’s
                          authorized workshop.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle ===
                  "ROADSIDE ASSISTANCE (RSA) AND BREAK DOWN ASSISTANCE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          15.1 In case of any RSA involving the Vehicle or in
                          case of breakdown, accidents, payments relating to
                          RSA, servicing, complaints and escalation matrix in
                          case of complaints, I shall report to given
                          Coordinates only
                        </p>
                        <p>
                          15.2 You shall not be liable to make any refund to Me
                          for pending Hire Period if the Vehicle meets with an
                          accident (intentionally or unintentionally).
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "TRAFFIC VIOLATIONS" && (
                  <>
                    {toggle === item?.heading && (
                      <>
                        <div className="text-sm pb-4 pl-2 grid gap-2">
                          <p>
                            16.1 I shall be responsible for any traffic
                            violations incurred due to inappropriate use of the
                            Vehicle by Me. This includes, but is not limited to,
                            unauthorised parking, excess speeding, jumping red
                            light signal, photo enforcement, and toll violations
                            (“Traffic Violations”). I shall be solely liable for
                            all costs, charges, expenses, penalties and fines
                            imposed due to any Traffic Violations during Hire
                            Period or Additional Term, as the case may be levied
                            by the respective regulatory authority. I shall
                            report such Traffic Violations to Your
                            representative, as soon as possible, within the
                            prescribed timeline for the violation (for example,
                            if the case is being taken to court). If I fail to
                            pay charges as specified in Schedule of Charges and
                            fines, penalties and other charges as levied by
                            regulatory authorities then You will pay those
                            amounts and I shall reimburse the same to You within
                            7 days from the date of receipt of such information
                            from You or alternatively You may pay the same
                            through weblink provided by You to Me on My mobile
                            number and email id
                          </p>
                          <p>
                            16.2 I shall notify You of any Traffic Violation
                            notices found on the Vehicle at the time of Vehicle
                            pick up which is not caused by Me
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
                {toggle === "INDEMNITY" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          17.1 I shall alone be responsible for any Traffic
                          Violations or violation of any provisions of the MVT
                          Law with regard to use of the Vehicle during Hire
                          Period or Additional Term, as the case may be and I
                          shall indemnify and keep indemnified the Indemnified
                          Person from and against any loss, claim, action or
                          proceeding that may be suffered or incurred by
                          Indemnified Person as a result of any such offence or
                          violation by Me or any person using the Vehicle on My
                          behalf.
                        </p>
                        <p>
                          17.2 All indemnities contained under the document
                          shall survive the termination of the Hire of Vehicle
                          under this document or in so far as they pertain to
                          events / occurrences that transpired during the Hire
                          Period or Additional Term, as the case may be.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "ACCIDENT AND THEFT OF THE VEHICLE:" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <h3 className="font-semibold">18.1 ACCIDENT</h3>
                        <p>
                          18.1.1 In case of the Vehicle is involved in any
                          accident-causing bodily injury or loss of limb or life
                          of any third person or damage to third party’s
                          property (“Accident”) then in such event I or any
                          person authorized by Me driving the Vehicle shall be
                          solely liable and responsible for such Accident. If
                          due to the Accident, the Vehicle is detained/ seized /
                          impounded by any authority or any person, I shall be
                          solely responsible/ liable for the same and shall be
                          responsible for releasing the Vehicle from such
                          authority or person and bear any and all expenses in
                          getting the Vehicle released.
                        </p>
                        <p>
                          18.1.2 In case of accident resulting into any bodily
                          injury or death any person involving the Vehicle, I
                          hereby indemnify Indemnified Person from all loss,
                          damage, cost, charges, expenses that may be suffered
                          by You as a result of such an action on My part .
                        </p>
                        <p>
                          18.1.3 In case of partial damage to the Vehicle where
                          cost of damage ascertained by You is less than Rs
                          10,000 then I shall be liable to pay to You the
                          charges as specified in Schedule of Charges and where
                          partial damage cost ascertained exceeds Rs 10,000 or
                          the Vehicle is rendered to total loss, as the case may
                          be then I hereby confirm and acknowledge that the
                          Subscription Fee paid by shall stand forfeited and
                          that I shall, in addition, be liable to pay to You the
                          difference between the book value of the Vehicle at
                          prevalent in Your books of accounts at the time of
                          occurrence of accident and insurance settled value
                        </p>
                        <p>
                          18.1.4 In case where due to accident if there are any
                          damages to the Vehicle which requires repairs or
                          restoration of the Vehicle to its original condition
                          prior to such accident and where the insurance claim
                          is rejected by insurance company due to any reasons on
                          My part then I shall be liable to pay the entire
                          repair and restoration charges as ascertained by You
                        </p>
                        <p>
                          18.1.5 Notwithstanding the above, I shall be liable to
                          indemnify Indemnified Person for any loss, damages,
                          costs incurred by You due to any insurance claim being
                          disallowed by the insurance company due to the
                          following reasons
                        </p>
                        <p>
                          <ul className="grid gap-2">
                            <li>
                              (a) Myself or any other person driving the Vehicle
                              at the time of accident is not carrying valid
                              license.
                            </li>
                            <li>
                              (b) Any other person driving the Vehicle at the
                              time of accident is a minor;
                            </li>
                            <li>
                              (c) Myself or any other person driving the Vehicle
                              is under influence of alcohol or drugs or any
                              other toxic substance at the time of accident;
                            </li>
                            <li>
                              (d) Damages / theft or loss to the Vehicle or any
                              third person has been caused willfully and/or is
                              the result of rash and negligent driving or any
                              other negligent/malicious act by Myself or any
                              other person driving the Vehicle; or
                            </li>
                            <li>
                              (e) Claim is inadmissible in accordance with the
                              terms and conditions of Insurance policy.
                            </li>
                          </ul>
                        </p>
                        <p>
                          18.1.6 I shall, immediately, notify at the designated
                          Coordinates of the occurrence of accident of the
                          Vehicle with details thereof and lodge a
                          complaint/first information report with the nearest
                          police station. In case of an accident involving
                          damage to the Vehicle or third party property damage
                          or involving bodily injury to third person, I shall
                          furnish to You following details and shall, if
                          required, appear before the court or any other
                          authority to give evidence thereof:
                        </p>
                        <ul className="grid gap-2">
                          <li>(a) Date, time, and place of accident;</li>
                          <li>
                            (b) The license plate numbers of any other vehicles
                            involved, their make and year, their identification
                            number (serial number), and the insurance
                            certificate's number (with name, address and phone
                            number of the insurance agent);
                          </li>
                          <li>
                            (c) The names, addresses, and driver's license
                            numbers of the persons involved in the incident;
                          </li>
                          <li>
                            (d) The name, address, and driver's license number
                            of the owner of the vehicle (if he or she is not the
                            driver);
                          </li>
                          <li>
                            (e) The name, addresses, and phone number of
                            witnesses, passengers, and any other involved
                            persons;
                          </li>
                          <li>
                            (f) Circumstances of the accident describing
                            immediate surrounding environment and the Vehicle
                            position prior to the accident; and
                          </li>
                          <li>
                            (g) A police report is required regardless of
                            liability or fault. I shall specify in My detailed
                            written complaint to the police the actual facts
                            only. I shall ensure that such complaint shall not
                            contain any discrepancy, inconsistencies or
                            distortions from actual facts as the same would be
                            detrimental to a valid insurance or other claim by
                            You. Any loss occasioned to You due to a discrepant,
                            inconsistent or distorted complaint by Me shall be
                            borne by Me.
                          </li>
                        </ul>
                        <p>
                          18.1.7 In case of any accidents/damages, any costs,
                          expenses or losses pursuant to out of court settlement
                          initiated or accomplished by Me with the third parties
                          shall be solely borne by Me.
                        </p>
                        <p>
                          18.1.8 I will notify to You, through designated
                          Coordinates, about any notice relating to a claim or a
                          lawsuit against You regarding any incident involving
                          the Vehicle. I agree to cooperate fully with You in
                          the investigation and defense of any such claim or
                          lawsuit.
                        </p>
                        <h3 className="font-semibold">18.2 THEFT:</h3>
                        <p>
                          18.2.1 In case of theft of the Vehicle due to any
                          reason whatsoever including due to My gross
                          negligence, I shall, immediately, notify You at the
                          designated Coordinates of the occurrence of theft of
                          the Vehicle with details thereof and lodge a
                          complaint/first information report with the nearest
                          police station.
                        </p>
                        <p>
                          18.2.2 In such case, I shall be liable to pay to You
                          the difference between the book value of the Vehicle
                          at prevalent in Your books of accounts at the time of
                          occurrence of accident and insurance settled value .
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "REPLACEMENT VEHICLE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          I shall be provided with the replacement vehicle
                          within the city limits only (subject to availability
                          of similar segment in the city) and in all such cases
                          where a Vehicle has developed mechanical error and
                          restrains Me from its use. In case, where the Vehicle
                          develops such error outside the city limit,
                          replacement vehicle shall not be provided. Your
                          decision related to replacement vehicle shall be
                          final.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "AMENDMENT" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          No modification or amendment to the Agreement and no
                          waiver of any of the terms or conditions hereto shall
                          be valid or binding unless made in writing and duly
                          executed by both Parties.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "RESERVATION OF RIGHTS" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          No forbearance, indulgence or relaxation or inaction
                          by either Party at any time to require performance of
                          any of the provisions of the document shall in any way
                          affect, diminish or prejudice the right of OAIS to
                          require performance of that provision. Any waiver or
                          acquiescence by OAIS of any breach of any of the
                          provisions of the Agreement shall not be construed as
                          a waiver or acquiescence of any right under or arising
                          out of the Agreement or of a subsequent breach, or
                          acquiescence to or recognition of rights other than as
                          expressly stipulated in the Agreement.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "NOTICE" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          22.1 Unless otherwise provided herein, all notices or
                          other communications under or in connection with the
                          Agreement shall be given in writing and may be sent to
                          You at its Registered Office address by personal
                          delivery or post or courier or at email at
                          selfdrive@Cabmeindia.com and to Me at My address or
                          email id specified by Me in an Reservation Details.
                          Any such notice or other communication will be deemed
                          to be effective if sent by personal delivery, when
                          received; if sent by registered post, on receipt of
                          the acknowledgement and if sent by courier, on receipt
                          of the same, if sent to You at its email, on receipt
                          of return receipt by Myself and if sent to Me on My
                          email ID, on receipt of return receipt by You; if sent
                          on by You on My Mobile then upon indicating blue tick
                          on mobile phone through which You have sent
                        </p>
                        <p>
                          22.2 Either Party may, from time to time, intimate to
                          the other party any change in its address for receipt
                          of notices provided for in the Agreement.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "REPRESENTATIONS AND WARRNATIES" && (
                  <>
                    {toggle === item?.heading && (
                      <div className="text-sm pb-4 pl-2 grid gap-2">
                        <p>
                          Each Party hereby acknowledges, undertakes and
                          warrants that:
                        </p>
                        <p>
                          23.1 It has always complied and shall always comply
                          with applicable Laws, rules and regulations in India
                          governing anti-bribery and anti-corruption including
                          but not limited to Prevention of Corruption Act, 1988
                          (as amended from time to time) and policy of other
                          party, if any, governing prevention of bribery and
                          corruption.
                        </p>
                        <p>
                          23.2 It has neither made nor shall make and/or has
                          neither received nor shall seek to receive, directly
                          or indirectly, or through its respective partners,
                          principals, officers, directors, shareholders, agents,
                          subcontractors, vendors, associates, employees or
                          authorized representatives, any payment or favour in
                          cash, kind or otherwise which is prohibited by the
                          applicable Laws.
                        </p>
                        <p>
                          23.3 It has neither provided nor shall provide
                          compensation, payments or gifts or other things of
                          value, or make or facilitate any bribe, rebate,
                          payoff, influence payment, kickback or anything of
                          value, directly or indirectly, or through its
                          respective partners, principals, officers, directors,
                          shareholders, agents, subcontractors, vendors,
                          associates, employees or authorized representatives,
                          to any person/entity including without limitation to
                          any government official, public authority, political
                          party/official, candidate for political office or
                          international organization.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {toggle === "SHARING OF INFORMATION:" &&
                    <>
                        {toggle === item?.heading &&
                            <div className="text-sm pb-4 pl-2 grid gap-2">
                                <p>I fully understand and acknowledge that You are under obligation to cooperate with government and law enforcement officials and private parties to enforce and comply with the Applicable Law. Thus, You may access, use, preserve, transfer and disclose any information (including
                                    personal information) provided by Me to any government or law enforcement officials or private parties as You may reasonably determine is necessary and appropriate:</p>
                                    <p>
                                        <ul className="grid gap-2">
                                            <li>(a) To satisfy any Applicable Law or other regulation, subpoenas, governmental requests or legal process</li>
                                            <li>(b) To protect Your safety, rights, property or security or that of public for any reason.</li>
                                            <li>(c) To detect, prevent or otherwise address fraud. Such disclosures may be carried out without notice to Me</li>
                                        </ul>
                                    </p>
                             </div>
                        }
                    </>
                }
                {toggle === "FORCE MAJEURE:" &&
                    <>
                        {toggle === item?.heading &&
                            <div className="text-sm pb-4 pl-2 grid gap-2">
                                <p>Neither Party shall be liable for any breach of this Agreement caused by Force Majeure events which is not within reasonable control of a Party (whose performance is affected by such event) including without limitation, insurrection, restraint imposed by the Government, act of legislative or other authority, war, hostilities, acts of the public enemy, civil, commotion, sabotage, explosions, epidemics, quarantine restrictions, strike, lockout or acts of God, that affects the ability of a Party to perform its obligations as envisaged herein. Provided however the non-payment of amounts due from a Party under this Agreement (for any reason) shall not be considered as an event of Force Majeure.</p>
                            </div>
                        }
                    </>
                }
                {toggle === "AUTHORITY TO EXECUTE THE DOCUMENT" &&
                    <>
                        {toggle===item?.heading &&
                            <p className="mb-4">The Parties hereby confirm that they have full power and authority to enter into this document and honor their respective obligations under this document</p>
                        }
                    </>
                }
                {toggle === "TIME OF ESSENCE" &&
                    <>
                        {toggle===item?.heading &&
                            <p className="mb-4">In relation to any time, date or period fixed under this document, time shall be of the essence.</p>
                        }
                    </>
                }
                {toggle==="ARBITRATION" &&
                    <>
                        {toggle===item?.heading &&
                            <div className="text-sm pb-4 pl-2 grid gap-2">
                                <p>28.1 If any dispute arises amongst Parties hereto during the subsistence of this document or thereafter, in connection with the validity, interpretation, implementation or alleged breach of any provision of the Agreement or regarding a question, including the questions as to whether the termination of this document has been legitimate, the Parties shall endeavor to settle such dispute amicably.</p>
                                <p>28.2 In the case of any dispute or any difference between the Parties arising out of or in relation to this document including dispute or difference as to the validity of this document or interpretation or any of the provision of this document, the same shall be resolved by mutual discussion. If the Parties fail to settle the dispute or difference mutually within 15 days after the dispute shall have arisen then the same shall be referred to Arbitration or the sole arbitrator to be appointed by You and such arbitration shall be governed by the Arbitration and Conciliation Act, 1996 or any statutory modification or re-enactment thereof for the time being in force. The provisions of this clause shall survive the termination of this document. Each Party shall bear its own costs; all common costs shall be shared equally by both the Parties. The venue of the arbitration shall be New Delhi. The language of arbitration shall be English.</p>
                                <p>28.3 Subject to Clause 28.2 above, wherever judicial intervention is possible, the parties herein agree that the Courts at New Delhi shall have jurisdiction to the exclusion of all other Courts</p>
                            </div>
                        }
                    </>
                }
                {toggle === "GOVERNING LAW" &&
                    <>
                        {toggle === item?.heading &&
                            <div className="text-sm pb-4 pl-2 grid gap-2">
                                <p>29.1 This document shall be governed by and construed and interpreted in accordance with the laws of India.</p>
                                <p>29.2 If any term or provision of this document should be declared invalid by a court of competent jurisdiction, the remaining terms and provisions of this document shall remain unimpaired and in full force and effect</p>
                            </div>
                        }
                    </>
                }
                {toggle==="Annexure-A SCHEDULE OF CHARGES" &&
                    <>
                        {toggle===item?.heading &&
                            <div className="text-sm pb-4 pl-2 grid gap-2">
                                <h3 className="font-semibold">Annexure-A</h3>
                                <p>SCHEDULE OF CHARGES:</p>
                            </div>
                        }
                    </>
                }
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default TermsAndConditions;
const termsArray = [
  {
    heading: "DEFINITIONS AND INTERPRETATION",
  },
  {
    heading: "PROVISION OF A VEHICLE ON A HIRE",
  },
  {
    heading: "PERIOD AND CANCELLATION PROVISIONS:",
  },
  {
    heading: "EXTENSION TERMS OF HIRE PERIOD",
  },
  {
    heading: "USE OF THE VEHICLE",
  },
  {
    heading: "PAYMENT TERMS",
  },
  {
    heading: "SECURITY DEPOSIT",
  },
  {
    heading: "OWNERSHIP OF THE VEHICLE",
  },
  {
    heading: "EVENTS OF DEFAULT",
  },
  {
    heading:
      "CONSEQUENCES UPON END OF HIRE PERIOD / ADDITIONAL TERM OR TERMINATION OF THE AGREEMENT",
  },
  {
    heading: "COMPLIANCE BY HIRER:",
  },
  {
    heading: "INSPECTION OF VEHICLE",
  },
  {
    heading: "COVENANTS WITH REGARD TO INSURANCE OF THE VEHICLE:",
  },
  {
    heading: "COVENANTS WITH REGARD TO MAINTENANCE OF THE VEHICLE:",
  },
  {
    heading: "ROADSIDE ASSISTANCE (RSA) AND BREAK DOWN ASSISTANCE",
  },
  {
    heading: "TRAFFIC VIOLATIONS",
  },
  {
    heading: "INDEMNITY",
  },
  {
    heading: "ACCIDENT AND THEFT OF THE VEHICLE:",
  },
  {
    heading: "REPLACEMENT VEHICLE",
  },
  {
    heading: "AMENDMENT",
  },
  {
    heading: "RESERVATION OF RIGHTS",
  },
  {
    heading: "NOTICE",
  },
  {
    heading: "REPRESENTATIONS AND WARRNATIES",
  },
  {
    heading: "SHARING OF INFORMATION:",
  },
  {
    heading: "FORCE MAJEURE:",
  },
  {
    heading: "AUTHORITY TO EXECUTE THE DOCUMENT",
  },
  {
    heading: "TIME OF ESSENCE",
  },
  {
    heading: "ARBITRATION",
  },
  {
    heading: "GOVERNING LAW",
  },
  {
    heading: "Annexure-A SCHEDULE OF CHARGES",
  },
];
