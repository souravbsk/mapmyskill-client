import { Modal } from "@mui/material";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useFetchValue from "../../Hooks/useFetchValue";
import axios from "axios";
import Swal from "sweetalert2";
import useAuthChanged from "../../Hooks/useAuthChanged";

const NidFeedback = ({
  isFeedbackShow,
  setReFetch,
  reFetch,
  setShow,
  ImageData,
  setFeedbackShow,
}) => {
  const { getValue: verifyStatus } = useFetchValue("verifyStatus");
  const { user } = useAuthChanged();

  console.log(verifyStatus);
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("object");
    const feedback = e.target.feadback.value;
    const rejectedValue = verifyStatus.find(
      (status) => status?.listItemName.toLowerCase() == "rejected"
    );

    const payload = {
      verifystatus: rejectedValue?.listItemId,
      feedback,
      approvedby: user?.userid,
    };

    if (ImageData?.userid) {
      axios
        .put(
          `http://localhost:8080/api/documents/update/${ImageData?.userid}`,
          payload
        )
        .then((res) => {
          if (res?.data?.success) {
            setShow(false);
            setFeedbackShow(false);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Document Has been Rejected",
              showConfirmButton: false,
              timer: 1500,
            });
            setReFetch(!reFetch);
          }
        });
    }
  };
  return (
    <Modal open={isFeedbackShow}>
      <div>
        <div className="bg-gray-300 max-w-full w-6/12 mx-auto p-5 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="relative">
            <button
              onClick={() => setFeedbackShow(false)}
              className="absolute text-red-600 text-2xl -top-3 -right-3"
            >
              <AiFillCloseCircle size={30}></AiFillCloseCircle>
            </button>
            <form onSubmit={handleSubmitFeedback}>
              <h1 className="text-xl font-semibold  mb-2">Feedback</h1>
              <textarea
                className="p-3  h-56 w-full border-2"
                name="feadback"
                id="feadback"
              ></textarea>

              <button className="bg-red-500 text-white font-medium  py-2 px-4 active:bg-red-600">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NidFeedback;
