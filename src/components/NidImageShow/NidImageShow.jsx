import React from "react";
import tutorimg from "../../assets/images/images.jpeg";
import { Modal } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import useFetchValue from "../../Hooks/useFetchValue";
import axios from "axios";
import Swal from "sweetalert2";
import useAuthChanged from "../../Hooks/useAuthChanged";
const NidImageShow = ({ setShow, isShow,setReFetch,reFetch, ImageData, handleViewFeedback }) => {
  const { getValue: verifyStatus } = useFetchValue("verifyStatus");
  const {user} = useAuthChanged()
  const handleApprovedCard = (userId) => {
    console.log("approved");
    const approvedValue = verifyStatus.find(
      (status) => status?.listItemName.toLowerCase() == "verified"
    );
    const payload = {
      verifystatus: approvedValue?.listItemId,
      approvedby: user?.userid

    };  
    if (userId) {
      axios
        .put(`http://localhost:8080/api/documents/update/${userId}`, payload)
        .then((res) => {
          console.log(res);
          if(res?.data?.data?.affectedRows>0){
            setShow(false)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Document Has been Accepted",
              showConfirmButton: false,
              timer: 1500
            });
          setReFetch(!reFetch)

          }
        });
    }

    console.log(userId);
  };
  return (
    <Modal open={isShow}>
      <div className=" flex items-center  h-screen justify-center">
        <div className="border relative mx-auto p-12 shadow-lg bg-indigo-100">
          <button
            onClick={() => setShow(false)}
            className="absolute text-red-600 text-2xl -top-3 -right-3"
          >
            <AiFillCloseCircle size={30}></AiFillCloseCircle>
          </button>
          <div className="flex items-center gap-4">
            <div className="">
              <h4 className="text-black mb-3">Front Side:</h4>
              <img
                src={`http://localhost:8080/${ImageData?.documentpathF}`}
                className="h-[300px] w-[400px] rounded-sm  border  shadow-lg"
              />
            </div>
            <div className="">
              <h4 className="text-black mb-3">Back Side:</h4>
              <img
                src={`http://localhost:8080/${ImageData?.documentpathB}`}
                className="h-[300px] w-[400px] rounded-sm  border  shadow-lg"
              />
            </div>
          </div>
          <div className="flex justify-center gap-16 mt-5">
            <button
              onClick={() => handleApprovedCard(ImageData?.userid)}
              className="px-3 py-2 hover:bg-green-700 text-white font-semibold active:bg-green-600 bg-green-800 w-28  text-sm"
            >
              approved
            </button>
            <button
              onClick={handleViewFeedback}
              className="px-3 py-2 hover:bg-red-600 text-white font-semibold active:bg-red-700 bg-red-500 w-28  text-sm"
            >
              reject
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NidImageShow;