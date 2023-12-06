import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import img from "../../assets/images/profile.png";
import "@smastrom/react-rating/style.css";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import moment from "moment/moment";
import axios from "axios";
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FeedBackModal = ({ jobs, isOpen, setOpen, user,
  refetch,
  setRefetch
}) => {

  console.log(jobs,"jobs");
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const handleSubmitRating = (e) => {
    e.preventDefault();
    const from = e.target;
    const ratingsvalue = rating;
    const reviewtext = from.reviewtext?.value;


    const newReviewSubmit = {
      userid: user?.userid,
      ratingsvalue,
      reviewtext,
      revieweduserid: jobs?.userid,
      status: "y",
    };
    console.log(newReviewSubmit);

    axios
      .put("http://localhost:8080/api/userreviews", newReviewSubmit)
      .then((res) => {
        console.log(res);
        if (res?.data?.affectedRows > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Feedback Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
          setRating(0);
          from.reset();
          setRefetch(!refetch)
          setOpen(false);
        }
      });
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center gap-6 mb-4">
            <img className="h-32 w-32 rounded-full" src={img} alt="" />
            <div>
              <p>Write a review for: {jobs?.username || jobs?.name} </p>
            </div>
          </div>
          <form onSubmit={handleSubmitRating} action="">
            <div className="mb-6">
              <label
                className="font-semibold block mb-3 text-lg"
                htmlFor="rating"
              >
                Your Rating:
              </label>
              <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
              />
            </div>
            <div>
              <label
                className="font-semibold block mb-3 text-lg"
                htmlFor="rating"
              >
                Your Review:
              </label>
              <textarea
                name="reviewtext"
                className="w-full p-3 border-2 border-[#ACC8E5] h-48"
                id=""
              ></textarea>
            </div>
            <ButtonSubmit
              alignValue="right mt-5"
              btnText="Submit"
            ></ButtonSubmit>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default FeedBackModal;
