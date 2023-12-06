import React from "react";
import { useState } from "react";
import {
  FaEye,
  FaHeart,
  FaLock,
  FaMapMarkerAlt,
  FaPenAlt,
  FaUnlock,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FeedBackModal from "../../FeedBackModal/FeedBackModal";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import { Rating } from "@smastrom/react-rating";
import { useEffect } from "react";
import axios from "axios";
import usePlanDataValue from "../../../Hooks/usePlanDataValue";
import Swal from "sweetalert2";
const TuitionJobDetailsBlock = ({ tuitionDetails, refetch, setRefetch }) => {
  const [isShowContact, setShowContact] = useState(false);
  const { user } = useAuthChanged();
  const [contactsUnlocked, setContactsUnlocked] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { itemValue: plantype } = usePlanDataValue("student-plan");
  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
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
  }, [user, refetch]);

  const handleUnlock = () => {
    axios
      .get(
        `http://localhost:8080/api/subscriptionusers/${user?.userid}?plantype=${plantype}`
      )
      .then((res1) => {
        console.log("unlock res1", res1.data);
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
        
        if (res1.data) {
          res1?.data ? setSubscriptionData(res1?.data) : null;
          const contactViewedPayload = {
            userid: user?.userid,
            viewedusers: tuitionDetails.userid,
          };

          axios
            .post(
              `http://localhost:8080/api/contactsviewed`,
              contactViewedPayload
            )
            .then((res2) => {
              console.log(res2);

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
              console.error("eroror inserting view data", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching unlock details", error);
      });
  };

  return (
    <>
      <div className="mb-5">
        <Link to="/myaccount/tuition-jobs">
          <button>
            <FaArrowLeft size={25} />
          </button>
        </Link>
      </div>
      <div className="border-2 p-4">
        <div className="flex  mb-3 items-center gap-3">
          <h3 className="font-medium text-xl">Searching for Tutor</h3>
          <p>
            <FaHeart> </FaHeart>
          </p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt></FaMapMarkerAlt> {tuitionDetails?.addressone}
          </p>
          <p className="flex items-center gap-2">
            <FaEye></FaEye> Viewed by 3 Persons
          </p>
        </div>
        <div className="flex mt-2 items-center gap-2">
          <Rating
            style={{ maxWidth: 100 }}
            readOnly
            value={tuitionDetails?.average_rating}
          />
          <p>{tuitionDetails?.total_reviews} reviews |</p>
          <button
            onClick={() => handleFeedBackModalOpen(tuitionDetails)}
            className="flex text-red-500 items-center gap-2"
          >
            <FaPenAlt></FaPenAlt> <span>Write a Review</span>
          </button>
        </div>
        <div className="border-t space-y-2 py-4">
          <p>{tuitionDetails?.requirementdesc}</p>
          <div className="flex items-center gap-4">
            <h2>Segment:</h2>
            <p>{tuitionDetails?.segmentName}</p>
          </div>
          <div className="flex items-center gap-4">
            <h2>Subject:</h2>
            <p>
              {tuitionDetails?.subjects?.map((item, i) => (
                <span key={i}>{item?.name}, </span>
              ))}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h2>Location Preference:</h2>
            <p>{tuitionDetails?.locationName}</p>
          </div>
        </div>
        <hr />

        <div className="flex py-4 items-center justify-between gap-4">
          <p className="font-medium text-xl">{tuitionDetails?.username}</p>
          {contactsUnlocked?.includes(tuitionDetails?.userid) && (
            <div>
              <p>Email: {tuitionDetails?.useremail}</p>
              <p>
                Mobile: {tuitionDetails?.isdcode}
                {tuitionDetails?.usermobile}
              </p>
            </div>
          )}
        </div>

        <div className="px-5 flex items-center justify-between bg-black rounded py-3 border  ">
          <small className="text-white">#{tuitionDetails?.userid}</small>
          <button
            onClick={handleUnlock}
            className="lg:px-3 py-2 px-2 flex items-center lg:gap-2  bg-gray-600 text-white lg:py-2 rounded-md"
          >
            {contactsUnlocked?.includes(tuitionDetails?.userid) ? (
              <>
                <FaUnlock></FaUnlock>
                <span>Contact unlocked</span>
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
        refetch={refetch}
        setRefetch={setRefetch}
        user={user}
        jobs={tuitionDetails}
        isOpen={isOpen}
        setOpen={setOpen}
      ></FeedBackModal>
    </>
  );
};

export default TuitionJobDetailsBlock;
