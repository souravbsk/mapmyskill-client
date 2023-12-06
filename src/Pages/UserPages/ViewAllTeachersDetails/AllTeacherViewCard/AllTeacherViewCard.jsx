import React from "react";
import image from "../../../../assets/images/profile.png";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import axios from "axios";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import { Link, useNavigate } from "react-router-dom";
import usePlanDataValue from "../../../../Hooks/usePlanDataValue";
import useFetchValue from "../../../../Hooks/useFetchValue";
import {
  FaEye,
  FaHeart,
  FaLock,
  FaMapMarkerAlt,
  FaPenAlt,
  FaUnlock,
} from "react-icons/fa";
import useGetValue from "../../../../Hooks/useGetValue";
import Swal from "sweetalert2";

const AllTeacherViewCard = ({ userid, tutorsData }) => {
  const { user } = useAuthChanged();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [allData, setAllData] = useState([]);
  const [isShowContact, setShowContact] = useState(false);
  const [contactsUnlocked, setContactsUnlocked] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState([]);
  const { itemValue: locationid } = useGetValue("InterestedIn");
  const { itemValue: language } = useGetValue("language");

  const { itemValue: plantype } = usePlanDataValue("teacherplan");

  const navigate = useNavigate();

  useEffect(() => {
    if (tutorsData?.address1) {
      const address = tutorsData?.address1;
      setAddress(address);
      const [a, newCity, b] = address.split(",");
      setCity(newCity);
    }

    userid
      ? axios
          .get(
            `http://localhost:8080/api/users/find-teachers-by-userid/${userid}?locationId=${locationid}&languageId=${language}`
          )
          .then((response) => {
            response.data ? setAllData(response.data) : null;
          })
          .catch((error) => {
            console.error(error);
          })
      : null;

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
  }, [userid, user?.userid, refetch]);

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
            confirmButtonText: "Buy Subscriptions",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/myaccount/upgrade");
            }
          });
          return;
        }
        if (res1.data) {
          res1?.data ? setSubscriptionData(res1?.data) : null;

          const contactViewedPayload = {
            userid: user?.userid,
            viewedusers: tutorsData.userid,
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
                    console.error("error updating plan", error);
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
    <div className="mb-5">
      <div className="flex items-center gap-5 border-2 px-5">
        <div>
          <div>
            <img
              height="300px"
              width="250px"
              src={`http://localhost:8080/${tutorsData.profileimagepath}`}
              alt="teacher-image"
            ></img>
          </div>
          <div className="text-center">{`#${tutorsData.userid}`}</div>
        </div>

        <div>
          <div className="border-b-2 pt-4">
            <Link to={`/myaccount/teachers/${tutorsData.userid}`}>
              <h2 className="font-bold text-2xl">{`${tutorsData.name} `}</h2>
            </Link>
            {/* <p className='text-cyan-800 text-md'>Qualification</p> */}
            <p className="text-cyan-800 text-md">
              <span>{`${tutorsData.gender}, `}</span>
              <span>{`${tutorsData.dob} years`}</span>
            </p>
          </div>
          <div className="border-b-2 py-2">
            {/* <div>
                            <span className='font-semibold text-lg'>Qualification:</span>
                        </div> */}
            <div>
              <span className="font-semibold">City:</span>
              <span>{city}</span>
            </div>
            <div>
              <span className="font-semibold">Area: </span>
              <span>{tutorsData.address1}</span>
            </div>

            <div className="">
              <p className="font-semibold">Teaches:</p>
              <div className="flex flex-col gap-2">
                {tutorsData?.segments.map((items, i) => (
                  <p
                    key={i}
                  > <span className="font-semibold">{items?.segmentname}:</span> {items?.subjects} </p>
                ))}
              </div>
            </div>
          </div>

          {contactsUnlocked?.includes(tutorsData?.userid) && (
            <div className="py-2">
              <p>
                <span className="font-semibold">Email:</span>
                <span> {tutorsData.email}</span>
              </p>
              <p>
                <span className="font-semibold">Mobile:</span>
                <span> {tutorsData.mobile}</span>
              </p>
              <p>
                <span className="font-semibold">WhatsApp:</span>
                <span> {tutorsData.whatsapp}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-white flex items-center justify-between p-4 border-r-2 border-l-2 border-b-2">
        <button className="bg-blue-500 p-2"> Send Message</button>

        <button
          onClick={handleUnlock}
          className="bg-gray-500 p-2 flex items-center gap-2"
        >
          {contactsUnlocked?.includes(tutorsData?.userid) ? (
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
  );
};

export default AllTeacherViewCard;
