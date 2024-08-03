"use client";
import React from "react";
import { set } from "react-datepicker/dist/date_utils";

const Success = () => {

  React.useEffect(() => {
    // need to reaod the page when user vist the page only one time
    // to avoid the user to go back to the page
    // and see the success message again
    window.history.pushState(null, "", window.location.href);
  }
  ,[]);
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>
        Your payment has been successfully processed. Thank you for your
        purchase!
      </p>
    </div>
  );
};

export default Success;
