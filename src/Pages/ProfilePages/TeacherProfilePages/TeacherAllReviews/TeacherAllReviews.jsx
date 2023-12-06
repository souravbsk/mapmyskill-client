import React, { useEffect, useState } from "react";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
import ReviewedDetailsCard from "../../../../components/ReviewedDetailsCard/ReviewedDetailsCard";

const TeacherAllReviews = () => {
  const { user } = useAuthChanged();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (user) {
      axios(`http://localhost:8080/api/userreviews/${user?.userid}`).then(
        (res) => {
          if (res?.data?.success) {
            setReviews(res?.data?.data);
          }
        }
      );
    }
  }, [user]);

  return (
    <div className="containerCl">
      <div className="pt-12">
        <h1 className="font-semibold text-xl">Reviews Received</h1>
        <p className="my-2">{reviews?.length} Record Found</p>
      </div>
      <div className="my-5 grid grid-cols-2 gap-8 ">
        {reviews.length > 0 &&
          reviews?.map((review) => (
            <ReviewedDetailsCard
              key={review?.feedbackid}
              review={review}
            ></ReviewedDetailsCard>
          ))}
      </div>
    </div>
  );
};

export default TeacherAllReviews;
