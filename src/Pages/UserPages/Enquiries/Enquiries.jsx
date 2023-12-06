import React from 'react'
import EnquiriesCard from './EnquiriesCard/EnquiriesCard'
import { Link } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuthChanged from '../../../Hooks/useAuthChanged';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


const Enquiries = () => {

  const { user } = useAuthChanged();
  const [enquiriesData, setEnquiriesData] = useState([])

  useEffect(() => {
      axios.get(`http://localhost:8080/api/messagetoteacher/${user?.userid}`)
        .then((res) => {
          // console.log("enquiries", res.data)
         setEnquiriesData(res?.data)
        })
        .catch((error) => {
          console.log("Error fetching Enquiries data", error)
        })

  }, [user?.userid])


  console.log("enquiriesData", enquiriesData);

  return (
    <div>
      <div className=" ml-20 mt-[100px]">
        <Link to={"/myaccount/dashboard"}>
          <button className="bg-[#0ea5e9] text-white py-1 pl-2 pr-4">
            <ArrowBackIcon className="text-white"></ArrowBackIcon>
            Back
          </button>
        </Link>
      </div>
      <div>

        {
            enquiriesData?.map((data, i) => (
              <EnquiriesCard
                enquiryDatas={data}
                key={i}
              ></EnquiriesCard>
            ))
        }

      </div>

    </div>
  )
}

export default Enquiries