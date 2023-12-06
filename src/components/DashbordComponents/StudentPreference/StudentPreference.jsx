import React, { useEffect, useState } from 'react'
import img from "../../../../src/assets/images/profile.png"
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import useAuthChanged from '../../../Hooks/useAuthChanged';

function StudentPreference() {
    const { user } = useAuthChanged()
    const [showForm, setShowForm] = useState(true)
    const [userDetails, setUserDetails] = useState(null)


    // ======================User Info get start====================
    useEffect(() => {
        if (user?.userid) {
            axios
                .get(`http://localhost:8080/api/studentlevel/${user?.userid}`)
                .then((response) => {
                    if (response?.data) {
                        // console.log(response?.data);
                        setUserDetails(response.data)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching studentlevel:", error);
                });
        }
    }, [user]);

    //console.log("tutor preference", userDetails);


    // ======================User Info get end====================

    return (
        <div className=''>
            {
                showForm ? <div>
                    <div className='p-4 border-b-2 text-lg font-semibold bg-white flex justify-between '>
                        <p> Tutor Preference</p>
                        <div onClick={() => setShowForm(!true)} className='p-1 hover:cursor-pointer hover:text-blue-500'>
                            <EditNoteIcon /><span className='text-sm'>Edit</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 p-6 bg-white border-b-2 mb-9'>
                        <div className='flex'>
                            <label className='font-semibold w-48'>Gender :</label>
                            <label>{userDetails?.data.genPref}</label>
                        </div>
                        <div className='flex'>
                            <label className='font-semibold w-48'>Marital Status :</label>
                            <label>{userDetails?.data.martial}</label>
                        </div>
                        <div className='flex'>
                            <label className='font-semibold w-48'>Age Group :</label>
                            <label>{userDetails?.data.agegroup}</label>
                        </div>
                        <div className='flex'>
                            <label className='font-semibold w-48'>Schooling Background :</label>
                            <label>{userDetails?.data.schooling}</label>
                        </div>
                    </div>

                </div>
                    :
                    // =======================Edit Form Design start===============================
                    <div>
                        <div className='p-4 border-b-2 text-lg font-semibold bg-white flex justify-between  '>
                            <div onClick={() => setShowForm(true)} className='p-1 hover:cursor-pointer hover:text-blue-500'>
                                <span className='text-sm'>Back</span>
                            </div>
                            <p>Edit Tutor Preference</p>
                        </div>

                        <div className='p-x-2 pt-4 pb-2 bg-white  border-b-2 mb-9'>

                            <div className="max-w-lg lg:ms-auto mx-auto text-center shadow-lg p-2 ">
                                <div className="rounded-md bg-white">
                                    <form className="" action="" method="POST">
                                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">

                                            <div className="md:col-span-1">
                                                <label for="subject" className="float-left block  font-normal text-gray-400 text-lg">Gender Preference</label>
                                                <select name="" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                                >
                                                    <option value="" > Male</option>
                                                    <option value="" > Female</option>
                                                    <option value="" > Other</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-1">
                                                <label for="subject" className="float-left block  font-normal text-gray-400 text-lg">Marital Status</label>
                                                <select id="" name="" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700">
                                                    <option value="" > Male</option>
                                                    <option value="" > Female</option>
                                                    <option value="" > Other</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-1">
                                                <label for="subject" className="float-left block  font-normal text-gray-400 text-lg">Age Group</label>
                                                <select id="" name="" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700">
                                                    <option value="" > Male</option>
                                                    <option value="" > Female</option>
                                                    <option value="" > Other</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-1">
                                                <label for="subject" className="float-left block  font-normal text-gray-400 text-lg">Schooling Background </label>
                                                <select id="" name="" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700">
                                                    <option value="" > Male</option>
                                                    <option value="" > Female</option>
                                                    <option value="" > Other</option>
                                                </select>
                                            </div>

                                            <div className="text-left">
                                                <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] w-full hover:bg-[#37728b] transition duration-300">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
            }

        </div>
    )
}

export default StudentPreference
