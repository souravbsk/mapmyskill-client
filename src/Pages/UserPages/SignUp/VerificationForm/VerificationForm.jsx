import React, { useContext, useEffect, useState } from "react";
import EmailVerifyCard from "../../../../components/EmailVerifyCard/EmailVerifyCard";
import PhoneVerifyCard from "../../../../components/PhoneVerifyCard/PhoneVerifyCard";
import BackButton from "../../../../components/BackButton/BackButton";
import NextButton from "../../../../components/NextButton/NextButton";

const VerificationForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("")
  const [userId, setUserId] = useState("");
  const [isShowCard, setShowCard] = useState(0);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const userInfoStore = localStorage.getItem("user_Info");
    const userInfo = JSON.parse(userInfoStore);
    //console.log("userInfo", userInfo);

    if (userInfoStore) {
      setEmail(userInfo?.email);
      setPhone(userInfo?.numberPhone);
      setUserId(userInfo?.userID);
      setMobile(userInfo?.primaryMob)
    }
  }, [refetch]);


  //console.log("phone", phone);

  return (
    <div className="w-8/12 flex flex-col min-h-[60vh] justify-between mx-auto">
      <div></div>
      <h6 className="text-center text-lg text-gray-700 py-4">
        Your email & mobile will be verified which was entered in the previous
        step.
      </h6>
      <div className="my-12 relative md:w-6/12 mx-auto px-5 py-14 border-2">
        <EmailVerifyCard email={email} userId={userId}></EmailVerifyCard>
        <p className="text-center my-5">------------&----------</p>
        <PhoneVerifyCard
          phone={phone}
          mobile={mobile}
          userId={userId}
          setRefetch={setRefetch}
          refetch={refetch}
        ></PhoneVerifyCard>
      </div>
    </div>
  );
};

export default VerificationForm;
