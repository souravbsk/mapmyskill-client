import React, { useEffect, useState } from "react";
import TuitionJobDetailsBlock from "./TuitionJobDetailsBlock/TuitionJobDetailsBlock";
import TuitionJobMap from "./TuitionJobDetailsBlock/TuitionJobMap";
import SuggestSidebar from "./SuggestSidebar/SuggestSidebar";
import TutorJobBySegment from "./SuggestSidebar/TutorJobBySegment/TutorJobBySegment";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCards from "../ReviewCards/ReviewCards";
const TuitionJobDetails = () => {
  const tuitionID = useParams();

  const [tuitionDetails, setTuitionDetails] = useState({});
  const [isMapShow, setIsMapShow] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (tuitionID?.id) {
      console.log(tuitionID.id);
      axios
        .get(`http://localhost:8080/api/studentlevel/findbyid/${tuitionID?.id}`)
        .then((res) => {
          if (res?.data?.success) {
            setTuitionDetails(res?.data?.data);
          }
          console.log("Fdfsfsdf", res);
        });
    }
  }, [tuitionID, refetch]);
  console.log(tuitionDetails, "sdfsdf");
  return (
    <div className="containerCl py-12">
      <div className="flex h-fit gap-6">
        <div className="flex-grow">
          <TuitionJobDetailsBlock
            refetch={refetch}
            setRefetch={setRefetch}
            tuitionDetails={tuitionDetails}
          ></TuitionJobDetailsBlock>
          <div className="flex border-2 border-[#4B5563] mt-4 items-center gap-4">
            <button
              onClick={() => setIsMapShow(true)}
              className={`${
                isMapShow ? "bg-[#4B5563] text-white" : "text-[#4B5563]"
              } border-4 text-black  border-[#4B5563]  w-full p-4`}
            >
              Map
            </button>
            <button
              onClick={() => setIsMapShow(false)}
              className={`${
                !isMapShow ? "bg-[#4B5563] text-white" : "text-[#4B5563]"
              }  border-2 text-black  border-[#4B5563] w-full p-4`}
            >
              Reviews
            </button>
          </div>
          <div className="p-5 border-2 mt-5">
            {isMapShow ? (
              <TuitionJobMap></TuitionJobMap>
            ) : (
              <ReviewCards reviews={tuitionDetails?.reviews}></ReviewCards>
            )}
          </div>
        </div>
        <div>
          <SuggestSidebar paramid={tuitionID?.id}></SuggestSidebar>
          {/* <TutorJobBySegment></TutorJobBySegment> */}
        </div>
      </div>
    </div>
  );
};

export default TuitionJobDetails;
