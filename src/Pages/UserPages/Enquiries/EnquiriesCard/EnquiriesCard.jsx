import React, { useEffect, useState } from "react";
import img from "../../../../assets/images/profile.png";
import { GiSelfLove } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import axios from "axios";
import {
  FaEye,
  FaHeart,
  FaLock,
  FaMapMarkerAlt,
  FaPenAlt,
  FaUnlock,
} from "react-icons/fa";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import usePlanDataValue from "../../../../Hooks/usePlanDataValue";
import SubscriptionNotFoundModal from "../../../../components/SubscriptionNotFoundModal/SubscriptionNotFoundModal";
import Swal from "sweetalert2";

const EnquiriesCard = ({ enquiryDatas }) => {
  const { user } = useAuthChanged();
  const currentDate = new Date().getDate()
  const [profileData, setProfileData] = useState({})
  const [address, setAddress] = useState("")
  const [showContact, setShowContact] = useState(true)
  const { itemValue: plantype } = usePlanDataValue("student-plan")
  const [subscriptionData, setSubscriptionData] = useState([])
  const [contactsUnlocked, setContactsUnlocked] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const days = currentDate - new Date(enquiryDatas.receivedate).getDate()
    

    enquiryDatas?.userid ? (
      axios.get(`http://localhost:8080/api/profile/${enquiryDatas?.userid}`)
        .then((response) => {
          console.log(response)
          response?.data ? setProfileData(response?.data) : null
          const [a, b, c] = response.data.address1.split(",")
          setAddress(a + ", " + b)
        })
        .catch((error) => {
          console.error("Error fetching user profile info", error)
        })
    ) : null

    axios.get(`http://localhost:8080/api/contactsviewed/${user?.userid}`)
      .then((response) => {
        console.log("uncloked response", response)
        // response?.data ? setContactsUnlocked(response?.data) : null
        const unlock = response.data.map((item) => {
          return item.viewedusers
        })
        setContactsUnlocked(unlock)
      })
      .catch((error) => {
        console.error("error getting unlock data", error)
      })

  }, [enquiryDatas, refetch])


  const handleUnlock = () => {
    // setShowContact(!showContact)

    axios.get(`http://localhost:8080/api/subscriptionusers/${user?.userid}?plantype=${plantype}`)
      .then((res1) => {
        console.log("unlock res1 data", res1.data);
        // res1?.data ? setSubscriptionData(res1?.data) : null

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

          const contactViewedPayload = {
            userid: user?.userid,
            viewedusers: enquiryDatas?.userid
          }

          axios.post(`http://localhost:8080/api/contactsviewed`, contactViewedPayload)
            .then(((res2) => {
              console.log("contactsviewed response", res2)
              // console.log("plan id", res1?.data[0]?.subscriptionusers_id)

              if (res2.statusText == "OK") {
                axios.put(`http://localhost:8080/api/subscriptionusers/update/${res1?.data[0]?.subscriptionusers_id}`)
                  .then((res3) => {
                    console.log("plan update res", res3)
                    setRefetch(!refetch)
                  })
                  .catch((error) => {
                    console.error("error updating plan", error)
                  })
              }

            }))
            .catch((error) => {
              console.error("error inserting in contactviewed", error)
            })
        }

      })
      .catch((error) => {
        console.error("Error fetching unlock details", error)
      })


  }





  console.log("current user", user?.userid);
  console.log("enquiryDatas", enquiryDatas);
  console.log("contactsUnlocked", contactsUnlocked);


  return (
    <div className="container py-8">
      <div className=" flex flex-col">
        <div className="flex gap-10 lg:flex-row md:flex-col flex-col p-4">
          {/*image*/}
          <div className="flex flex-col gap-5  px-8 py-4">
            <div className="mx-auto">
              <img src={`http://localhost:8080/${profileData?.profileimagepath}`} className="h-[200px] " />
            </div>
            <h1 className="text-2xl font-semibold text-center">{profileData?.poc}</h1>
          </div>

          {/*content*/}

          <div
            className="border lg:w-4/5 bg-[#ACC8E5] shadow-lg "
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
          >
            <div className=" border-b p-4 ">
              <div className="flex items-center gap-3">
                <Link>
                  <h3 className=" font-bold text-lg text-white">
                    {enquiryDatas?.messagetitle}
                  </h3>
                </Link>
                <button>
                  <GiSelfLove></GiSelfLove>
                </button>
              </div>

              <div className="flex justify-between">
                <div className="mt-4 text-gray-500 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt></FaMapMarkerAlt>{" "}
                    <span className="text-[#141414]">
                      {address}, 4 days ago
                    </span>
                  </p>
                  {/* <p className="flex items-center gap-2">
                    <FaEye></FaEye>{" "}
                    <span className="text-[#141414]">Viewed by 1 Person</span>
                  </p> */}
                </div>

                <div className="">
                  <button className="py-1 px-3 bg-slate-200 lg:text-xs text-[10px]">
                    Report Fake
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="font-bold text-lg text-white">
                {enquiryDatas?.description}
              </p>
              <div className="flex mt-3 flex-wrap">
                <div className="w-1/2 mb-2 lg:w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">Segment:</p>
                </div>
                <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">{enquiryDatas?.segmentname}</p>
                </div>
                <div className="w-1/2 mb-2 lg-w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">Subject:</p>
                </div>
                <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">{enquiryDatas?.subjectname}</p>
                </div>
                <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">
                    Location Preference:
                  </p>
                </div>
                <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">

                  {
                    enquiryDatas?.locationname.map((item, i) => (
                      <span key={i} className="text-sm text-white">{item?.name}, </span>
                    ))
                  }
                </div>

                {/* <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                  <p className="text-sm font-medium text-white">
                    Tuition Value:
                  </p>
                </div>
                <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">
                  <p className="text-sm text-white">INR 24000 (Approx.)</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div>

          {
            contactsUnlocked?.includes(enquiryDatas?.userid) ? (
              <div className="space-y-2 p-4   border-t border-b mt-5  bg-blue-200 ">
                <p className="flex  items-center gap-2">
                  <MdEmail size={20}></MdEmail>
                  <h1 className="text-xl">
                    {" "}
                    Email:{" "}
                    <span className="text-xl text-blue-900">
                      {profileData?.emailId}
                    </span>
                  </h1>
                </p>
                <p className="flex items-center gap-2">
                  <BsPhone size={20}></BsPhone>
                  <h1 className="text-xl">
                    {" "}
                    Mobile:{" "}
                    <span className="text-xl text-blue-900">{profileData?.primaryContact}</span>
                  </h1>
                </p>
              </div>
            ) : null

          }

          <div className="px-5 flex items-center  justify-between bg-black rounded py-5 mb-5 border">
            <small className="text-white">#615263</small>
            <button onClick={handleUnlock} className='bg-gray-500 p-2 flex items-center gap-2'>
              {
                contactsUnlocked?.includes(enquiryDatas?.userid) ?
                  <>
                    <FaUnlock></FaUnlock><span>Unlocked contact</span>
                  </>
                  :
                  <>
                    <FaLock></FaLock><span>Unlock Contact</span>
                  </>
              }

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesCard;
