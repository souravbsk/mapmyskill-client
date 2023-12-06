import React from 'react';
import Tutoring from './Tutoring/Tutoring';
import Teaches from './Teaches/Teaches';
import ReviewCards from '../../ReviewCards/ReviewCards';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


const TeacherDetails = ({tutorsData,id}) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      if (id) {
        axios(`http://localhost:8080/api/userreviews/${id}`).then(
          (res) => {
            if (res?.data?.success) {
              setReviews(res?.data?.data);
            }
          }
        );
      }
    }, [id]);
    return (
        <div className='border-2 p-6 flex flex-col gap-4'>
            <Tutoring
                tutorsData={tutorsData}
            ></Tutoring>
            <Teaches
            tutorsData={tutorsData}
            ></Teaches>
            <h2 className='font-semibold text-xl'>Reviews:</h2>
            <ReviewCards reviews={reviews}></ReviewCards>
        </div>
    );
};

export default TeacherDetails;