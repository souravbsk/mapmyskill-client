import React from "react";
import image from "../../../assets/images/profile.png";
import { useState } from "react";
import { useEffect } from "react";
import { FaLock, FaPenAlt, FaUnlock } from "react-icons/fa";
import FeedBackModal from "../../FeedBackModal/FeedBackModal";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import { Rating } from "@smastrom/react-rating";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import usePlanDataValue from "../../../Hooks/usePlanDataValue";
import Swal from "sweetalert2";
const TeacherViewCard = ({ tutorsData, refetch, setRefetch }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [doj, setDoj] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [contactsUnlocked, setContactsUnlocked] = useState([]);
  const { itemValue: plantype } = usePlanDataValue("teacherplan");
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { user } = useAuthChanged();
  const navigate = useNavigate()

  useEffect(() => {
    if (tutorsData[0]?.address1) {
      const address = tutorsData[0]?.address1;
      setAddress(address);
      const [a, newCity, b] = address.split(",");
      setCity(newCity);
    }
    if (tutorsData[0]?.joiningDate) {
      const date = tutorsData[0]?.joiningDate;
      const currentDate = new Date(date);
      const formatedDate = currentDate.toLocaleDateString();
      setDoj(formatedDate);
    }
  }, [tutorsData]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contactsviewed/${user?.userid}`)
      .then((response) => {
        console.log("uncloked response", response);
        // response?.data ? setContactsUnlocked(response?.data) : null
        const unlock = response.data.map((item) => {
          return item.viewedusers;
        });
        setContactsUnlocked(unlock);
      })
      .catch((error) => {
        console.error("error getting unlock data", error);
      });
  }, [user, refetch]);

  const handleFeedBackModalOpen = () => {
    setOpen(true);
  };

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
            viewedusers: tutorsData[0].userid,
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
      <div>
        <div className="flex items-center gap-5 border-2 px-5">
          <div>
            <div>
              <img
                height="300px"
                width="250px"
                src={`http://localhost:8080/${tutorsData[0]?.profileimagepath}`}
                alt="teacher-image"
              ></img>
            </div>
            <div className="text-center">{`#${tutorsData[0]?.userid} `}</div>
            <div className="text-center">
              <p>{`Member since: ${doj}`}</p>
            </div>
          </div>

          <div>
            <div className="border-b-2 pt-4">
              <h2 className="font-bold text-2xl">{tutorsData[0]?.name}</h2>
              {/* <p className='text-cyan-800 text-md'>Qualification</p> */}
              <p className="text-cyan-800 text-md">
                <span>{`${tutorsData[0]?.gender}, `}</span>
                <span>{`${tutorsData[0]?.dob} years`}</span>
              </p>
              <div>
                <Rating
                  style={{ maxWidth: 100 }}
                  value={tutorsData[0]?.average_rating}
                  readOnly
                />
                <p>{tutorsData[0]?.reviews?.length} Reviews</p>
                <button
                  onClick={() => handleFeedBackModalOpen(tutorsData[0])}
                  className="flex text-red-500 items-center gap-2"
                >
                  <FaPenAlt></FaPenAlt> <span>Write a Review</span>
                </button>
              </div>
            </div>
            <div className="border-b-2 py-2">
              <div>
                <span className="font-semibold">City:</span>
                <span>{city}</span>
              </div>
              <div>
                <span className="font-semibold">Area: </span>
                <span>{address}</span>
              </div>
            </div>

            {contactsUnlocked?.includes(tutorsData[0]?.userid) && (
              <div className="py-2">
                <p>
                  <span className="font-semibold">Email:</span>
                  <span>{` ${tutorsData[0]?.email}`}</span>
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span>
                  <span>{` ${tutorsData[0]?.mobile}`}</span>
                </p>
                <p>
                  <span className="font-semibold">WhatsApp:</span>
                  <span>{` ${tutorsData[0]?.whatsapp}`}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-white flex items-center justify-between p-4 border-r-2 border-l-2 border-b-2">
          <Link to={`/myaccount/send-message/${tutorsData[0]?.userid}`}>
            <button className="bg-blue-500 p-2"> Send Message</button>
          </Link>
          <button
            onClick={handleUnlock}
            className="bg-gray-500 p-2 flex items-center gap-2"
          >
            {contactsUnlocked?.includes(tutorsData[0]?.userid) ? (
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
        user={user}
        jobs={tutorsData[0]}
        isOpen={isOpen}
        setOpen={setOpen}
        refetch={refetch}
        setRefetch={setRefetch}
      ></FeedBackModal>
    </>
  );
};

export default TeacherViewCard;
