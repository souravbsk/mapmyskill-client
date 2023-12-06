import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Teaches = ({ tutorsData }) => {
    const { id } = useParams();
    const [segmentData, setSegmentData] = useState([]);

  
  
    useEffect(() => {
      if (id) {
        axios
          .get(`http://localhost:8080/api/teachertraininglevel/${id}`)
          .then((res) => {
            if (res?.data?.success) {
              const segmentData = res?.data?.data;
              axios
                .get(`http://localhost:8080/api/teachersubject/${id}`)
                .then((subRes) => {
                 
                  const subjectData = subRes?.data;
                  const segmentBlock = segmentData.map((segment) => {
                    const boardid = segment?.boardData.map(
                      (board) => board?.listItemId
                    );
                    for (const subject in subjectData) {
                      const subjectID = subjectData[subject].map(
                        (sub) => sub?.subject_id
                      );
                      if (subject == segment?.segment) {
                        segment["subjectData"] = subjectData[subject];
                        segment["subjects"] = subjectID;
                        segment["boards"] = boardid;
                        return segment;
                      }
                    }
                  });
  
                  if (segmentBlock) {
                      console.log(segmentBlock);
                    setSegmentData(segmentBlock);
                  }
                });
            }
          });
      }
    }, [id]);
  
    console.log(segmentData,"world");
    return (
        <div className='border-2'>
            <div className='border-b-2 py-3 pl-2'>
                <h2 className='text-2xl font-bold'>Teaches</h2>
            </div>
            <div>
                {
                    segmentData?.map((items, i) => (
                        <div key={i} className='grid grid-cols-1 sm:grid-cols-6 gap-4 py-3 pl-2'>
                            <div className='font-bold text-md col-span-1'>
                                <p>{items?.segment_name}</p>
                                <p>Board:</p>   
                            </div>
                            <div className='col-span-5'>
                               <p> {
                                    items.subjectData.map((subject,i) => (
                                        <span key={i}>{`${subject?.subject_name}, `}</span>
                                    ))
                                }
                                
                                </p>
                               <p> {
                                    items.boardData.map((board,i) => (
                                        <span key={i}>{`${board?.listItemName}, `}</span>
                                    ))
                                }
                                
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Teaches;