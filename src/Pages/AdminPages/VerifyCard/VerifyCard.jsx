import React, { useState } from "react";
import UserNameTable from "../../../components/Table/UserNameTable";
import NidImageShow from "../../../components/NidImageShow/NidImageShow";
import NidFeedback from "../../../components/NidFeedback/NidFeedback";

const VerifyCard = () => {
  const [isShow, setShow] = useState(false);
  const [isFeedbackShow, setFeedbackShow] = useState(false);
  const [ImageData, setImageData] = useState({});
  const [reFetch,setReFetch] = useState(false)

  const handleViewCard = (value) => {
    setImageData({});
    if (value) {
      setImageData(value);
    }
    setShow(true);
  };
  const handleViewFeedback = () => {
    setFeedbackShow(true);
  };

  return (
    <div className=" mt-12 ">
      <div className=" mx-auto">
        <UserNameTable reFetch={reFetch} handleViewCard={handleViewCard}></UserNameTable>
      </div>
      <div>
        <NidImageShow
        setReFetch={setReFetch}
        reFetch={reFetch}
          ImageData={ImageData}
          setShow={setShow}
          isShow={isShow}
          handleViewFeedback={handleViewFeedback}
        ></NidImageShow>
      </div>
      <div>
        <NidFeedback
        setReFetch={setReFetch}
        reFetch={reFetch}
          setShow={setShow}
          ImageData={ImageData}
          setFeedbackShow={setFeedbackShow}
          isFeedbackShow={isFeedbackShow}
        ></NidFeedback>
      </div>
    </div>
  );
};

export default VerifyCard;
