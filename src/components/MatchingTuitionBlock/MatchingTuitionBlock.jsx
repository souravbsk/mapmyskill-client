import React, { useEffect } from "react";
import { GiSelfLove } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaLock,
  FaMapMarkerAlt,
  FaPenAlt,
  FaUnlock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import img from "../../assets/images/profile.png";
import { useState } from "react";
import FeedBackModal from "../FeedBackModal/FeedBackModal";
import { Rating } from "@smastrom/react-rating";
import axios from "axios";
import useAuthChanged from "../../Hooks/useAuthChanged";
import useGetValue from "../../Hooks/useGetValue";
import usePlanDataValue from "../../Hooks/usePlanDataValue";
import Swal from "sweetalert2";

const MatchingTuitionBlock = ({ jobs, user }) => {
  const [isShowContact, setShowContact] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [refetch,setRefetch] = useState(false)
  const [contactsUnlocked, setContactsUnlocked] = useState([]);
  const { itemValue: locationid } = useGetValue("InterestedIn");
  const { itemValue: language } = useGetValue("language");
  const { itemValue: plantype } = usePlanDataValue("student-plan");
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/contactsviewed/${user?.userid}`)
        .then((response) => {
          console.log("uncloked response", response);
          const unlock = response.data.map((item) => {
            return item.viewedusers;
          });
          setContactsUnlocked(unlock);
        })
        .catch((error) => {
          console.error("error getting unlock data", error);
        });
    }
  }, [user,refetch]);

  const handleFeedBackModalOpen = () => {
    setOpen(true);
  };

  const handleUnlock = () => {
    axios
      .get(
        `http://localhost:8080/api/subscriptionusers/${user?.userid}?plantype=${plantype}`
      )
      .then((res1) => {
        if (res1.data.length == 0) {
          Swal.fire({
            title: "Zero Connects",
            text: "You don't have any Connects to unlock this contact details. Please top up your account with connects and try again.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Buy Subscriptions"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/myaccount/upgrade")
            }
          });
          return
        }

        if (res1.data?.length > 0) {
          res1?.data ? setSubscriptionData(res1?.data) : null;
          const contactViewedPayload = {
            userid: user?.userid,
            viewedusers: jobs.userid,
          };

          axios
            .post(
              `http://localhost:8080/api/contactsviewed`,
              contactViewedPayload
            )
            .then((res2) => {
              console.log("contactsviewed response", res2);
              console.log("plan id", res1?.data[0]?.subscriptionusers_id);
              if (res2.statusText == "OK") {
                axios
                  .put(
                    `http://localhost:8080/api/subscriptionusers/update/${res1?.data[0]?.subscriptionusers_id}`
                  )
                  .then((res3) => {
                    console.log("plan update res", res3);
                    setRefetch(!refetch);
                  })
                  .catch((error) => {
                    console.error("eroor updaing plan", error);
                  });
              }
            })
            .catch((error) => {
              console.error("error inserting in contactviewed", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching unlock details", error);
      });
  };

  return (
    <div className=" flex flex-col bg-white">
      <Link to={`/myaccount/tuitionpost/${jobs?.id}`}>
        <div className="flex gap-10 lg:flex-row md:flex-col flex-col  p-4">
          {/*image*/}
          <div className="flex flex-col gap-5  px-8 py-4">
            <div className="mx-auto">
              <img
                src={`http://localhost:8080/${jobs?.profileimagepath}`}
                className="h-[px] w-[250px]"
              />
            </div>
            <h1 className="text-xl font-semibold text-center">
              {jobs?.username}
            </h1>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => handleFeedBackModalOpen(jobs)}
                className="flex text-red-500 items-center gap-2"
              >
                {/* <FaPenAlt></FaPenAlt> <span>Write a Review</span> */}
              </button>
              <Rating
                style={{ maxWidth: 100 }}
                readOnly
                value={jobs?.average_rating}
              />
              <p>{jobs?.total_reviews} reviews</p>
            </div>
          </div>

          {/*content*/}

          <div
            className="border lg:w-4/5 bg-[#ACC8E5] shadow-lg"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
          >
            <div className=" border-b p-4 ">
              <div className="flex   gap-3">
                <div>
                  <h3 className="font-bold text-lg text-white">
                    Seeking Tutor
                  </h3>
                </div>

                <button>
                  <GiSelfLove></GiSelfLove>
                </button>
              </div>

              <div className="mt-4 text-gray-500 space-y-2">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt></FaMapMarkerAlt>{" "}
                  <span className="text-[#141414]">{jobs?.addressone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaEye></FaEye>{" "}
                  <span className="text-[#141414]">Viewed by 1 Person</span>
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="font-bold text-lg text-white">
                {jobs?.requirementdesc}
              </p>
            </div>

            <div className="p-4">
              <div className="flex mt-3 flex-wrap">
                <div className="w-1/2 mb-2 lg:w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">Segment:</p>
                </div>
                <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">{jobs?.segmentName}</p>
                </div>
                <div className="w-1/2 mb-2 lg-w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">Subject:</p>
                </div>
                <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">
                    {jobs?.subjects?.map((item, i) => (
                      <span key={i}>{item?.name}, </span>
                    ))}
                  </p>
                </div>
                <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">
                    Location Preference:
                  </p>
                </div>
                <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">{jobs?.locationName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div>
        {contactsUnlocked?.includes(jobs?.userid) && (
          <div className="space-y-2 p-4 border-t border-b mt-5 bg-blue-200 ">
            <p className="flex  items-center gap-2">
              <MdEmail size={20}></MdEmail>
              <span className="text-xl text-blue-900">
                Email: {jobs?.useremail}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BsPhone size={20}></BsPhone>
              <span className="text-xl text-blue-900">
                Mobile: {jobs?.isdcode} {jobs?.usermobile}
              </span>
            </p>
          </div>
        )}

        <div className="px-5 flex items-center justify-between bg-black rounded py-3 border  ">
          <small className="text-white">#615263</small>
          <button
            onClick={handleUnlock}
            className="lg:px-3 py-2 px-2 flex items-center lg:gap-2  bg-gray-600 text-white lg:py-2 rounded-md"
          >
            {contactsUnlocked?.includes(jobs?.userid) ? (
              <>
                <FaUnlock></FaUnlock>
                <span>Unlocked contact</span>
              </>
            ) : (
              <>
                <FaLock></FaLock>
                <span>Unlock Contact</span>
              </>
            )}
          </button>
        </div>
      </div>

      <FeedBackModal
        user={user}
        jobs={jobs}
        isOpen={isOpen}
        setOpen={setOpen}
      ></FeedBackModal>
    </div>
  );
};

export default MatchingTuitionBlock;
