import React from "react";
import moment from "moment";
import { Rating } from "@smastrom/react-rating";
const ReviewCards = ({ reviews }) => {
  console.log(reviews, "hellow");
  return (
    <div className="grid mt-4 grid-cols-2 gap-5">
      {reviews?.map((review) => (
        <div className="border-2" key={review.feedbackid}>
          <div className="flex border-b-2 p-4 items-center gap-2 justify-between">
            <h3>{review?.reviewed_username || review?.name}</h3>
            <p>{moment(review?.reviewdate).format("Do MMM YYYY")}</p>
          </div>
          <div className="p-4">
            <Rating
              style={{ maxWidth: 100 }}
              value={review?.ratingsvalue}
              readOnly
            />
            <p className="mt-2">{review?.reviewtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCards;
