import React from "react";
import subs from "../../../assets/images/subscription-img.png";
import "./SubscriptionCard.css";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import moment from "moment/moment";
import axios from "axios";
import Swal from "sweetalert2";
import useGetValue from "../../../Hooks/useGetValue";
import { Navigate, useNavigate } from "react-router-dom";
import usePlanDataValue from "../../../Hooks/usePlanDataValue";

function SubscriptionCard({ items }) {
  const { user } = useAuthChanged();

  const { itemValue: monthlyValue } = usePlanDataValue("monthly");
  const { itemValue: quarterlyValue } = usePlanDataValue("quarterly");
  const { itemValue: yearlyValue } = usePlanDataValue("yearly");
  const { itemValue: halfYearlyValue } = usePlanDataValue("half-yearly");
  const { itemValue: perclickValue } = usePlanDataValue("perclick");
  const navigate = useNavigate();

  //calculate to find subscription exp date

  const calculateExpDate = (startDate, planPeriod) => {
    const startDateObj = new Date(startDate);
    let expDate;
    switch (planPeriod) {
      case monthlyValue:
        expDate = new Date(startDateObj);
        expDate.setMonth(expDate.getMonth() + 1);
        break;
      case quarterlyValue:
        expDate = new Date(startDateObj);
        expDate.setMonth(expDate.getMonth() + 3);
        break;
      case halfYearlyValue:
        expDate = new Date(startDateObj);
        expDate.setMonth(expDate.getMonth() + 6);
        break;
      case yearlyValue:
        expDate = new Date(startDateObj);
        expDate.setMonth(expDate.getMonth() + 12);
        break;
      default:
        throw new Error("Invalid plan period");
    }
    const expDateResult = moment(expDate).format("YYYY-MM-DD");
    return expDateResult;
  };

  const handleBuySubscription = (subsValue) => {
    const newData = new Date();
    const startDate = moment(newData).format("YYYY-MM-DD");
    console.log(subsValue);
    const buyPlan = {
      userid: user?.userid,
      planid: subsValue?.planid,
      startdate: perclickValue != subsValue?.planperiodvalue && startDate,
      expdate:
        perclickValue != subsValue?.planperiodvalue &&
        calculateExpDate(startDate, subsValue?.planperiodvalue),
      totalclicks: subsValue?.planterm,
      usedclicks: 0,
      status: "y",
    };
    console.log(buyPlan);

    axios
      .post(`http://localhost:8080/api/subscriptionusers`, buyPlan)
      .then((res) => {
        console.log(res);
        if (res?.data?.affectedRows > 0) {
          navigate("/myaccount/thankyou", { state: buyPlan });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Package was Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white border-2 border-purple-700 shadow-lg p-6 rounded-lg overflow-hidden">
      <div className="">
        <h1 className="text-center text-4xl font-extrabold mb-4">
          {items?.planname}
        </h1>
        <div className="absolute text-white  text-center w-full left-1/2 top-12 bg-[#EC4899]  px-2 py-1 rounded-full -translate-x-12 -translate-y-1/2 transform rotate-45">
          <span className="text-sm font-bold">{items?.planperiod}</span>
        </div>
        <div className="flex-shrink">
          <div className="flex items-center justify-center">
            <img src={subs} alt="Subscription" className="rounded-sm" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
          <div className="md:flex-1 relative">
            <h1 className="text-5xl mb-3 flex items-end font-sans font-bold">
              ₹{items?.amount}
            </h1>
            <p className="mt-2 text-lg">
              Unlock <span className="font-bold">{items?.planterm}</span> of
              premium features. Resolve issues instantly with our top-tier
              tutors.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-2xl">
            Why upgrade to {items?.planname} Membership?
          </p>
          <div
            className="subscriptionDesc mt-4"
            dangerouslySetInnerHTML={{
              __html: items?.description,
            }}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleBuySubscription(items)}
          className="bg-pink-500 w-full px-8 py-2 active:bg-pink-600 hover:shadow-lg text-white font-bold rounded-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;
