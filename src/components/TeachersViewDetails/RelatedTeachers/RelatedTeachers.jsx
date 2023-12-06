import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TutorCard from '../../../Shared/UserDashboard/StudentDashboard/TutorCard/TutorCard';
import { useNavigate } from 'react-router-dom';

const RelatedTeachers = () => {

    const [allTutors, setAllTutors] = useState([])
    const [tutorsData, setTutorsData] = useState([])
    const navigate = useNavigate()

    // Calculate age function
    const covertAge = (dob, address1) => {
        const dobdata = new Date(dob)
        const currentDate = new Date()
        const age = currentDate.getFullYear() - dobdata.getFullYear()
        return age
    }

    // Update address function
    const updateAddress = (address1) => {
        const [a, city, c] = address1.split(",")
        return city
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/users/find-teachers-by-role/3")
            .then((response) => {
                response.data.forEach(tutor => {
                    const tAge = covertAge(tutor.dob)
                    tutor.dob = tAge
                    const tCity = updateAddress(tutor.address1)
                    tutor.address1 = tCity
                })

                response.data ? setTutorsData(response.data) : null
            })
            .catch((error) => {
                console.error(error)
            })

    }, [])

    const handleCardClick = (userid) => {
        navigate(`/myaccount/teachers/${userid}`)
    }



    return (
        <div className='shadow-md py-2 '>
            <div className='bg-gray-300 p-5'>
                <h2 className='text-center text-xl font-bold'>Tutors you might prefer</h2>
            </div>
            <div className="flex flex-col px-4 py-4 gap-2 overflow-y-scroll">
                {
                    tutorsData.map((items, i) => (
                        <div key={i} onClick={() => handleCardClick(items?.userid)}>
                            <TutorCard
                                allData={items}>
                            </TutorCard>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default RelatedTeachers;