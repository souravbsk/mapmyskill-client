import { Rating } from "@smastrom/react-rating";
import moment from "moment/moment";
import React from "react";
import { FaCalendar, FaMailBulk, FaPhoneAlt, FaPhoneSquare } from "react-icons/fa";

const ReviewedDetailsCard = ({ review }) => {
  return (
    <div className="border-2 shadow-md">
      <div className="px-5 border-b-2 flex gap-8 py-4">
        <figure className="w-24 h-24 rounded-full" >
          <img className="w-full h-full" src={`http://localhost:8080/${review?.image}`} alt="" />
        </figure>
        <div>
            <h3 className="text-2xl mb-4 font-semibold">{review?.name}</h3>
            <ul className="space-y-1">
                <li className="flex items-center gap-3"><FaMailBulk></FaMailBulk>Email: {review?.email}</li>
                <li className="flex items-center gap-3"><FaPhoneAlt></FaPhoneAlt>Mobile: ({review?.countrycode}){review?.mobile}</li>
                <li className="flex items-center gap-3"><FaCalendar></FaCalendar>Received On: {moment(review?.reviewdate).format("DD-MMM-YYYY")}</li>
            </ul>
        </div>
      </div>
      <div className="px-5 space-y-2 bg-gray-50 py-4">
        <div className="flex items-center gap-2">
            <p className="text-gray-600 font-medium">Rating:</p> <Rating style={{ maxWidth: 100 }} value={review?.ratingsvalue}></Rating>
        </div>
        <p>
            <span className="text-gray-600 font-medium">Review: </span>{review?.reviewtext}
        </p>
      </div>
    </div>
  );
};

export default ReviewedDetailsCard;
