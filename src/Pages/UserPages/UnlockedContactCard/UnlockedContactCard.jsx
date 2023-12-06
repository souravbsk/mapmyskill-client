import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import useAuthChanged from '../../../Hooks/useAuthChanged';

const UnlockedContactCard = ({tutorsData }) => {
    const { user } = useAuthChanged();

    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")



    useEffect(() => {
        if (tutorsData?.address1) {
            const address = tutorsData?.address1;
            setAddress(address)
            const [a, newCity, b] = address.split(",");
            setCity(newCity);
        }
    }, [user]);
    

//   console.log("tutorsData",tutorsData)
  return (
    <div className='mb-5 px-28 py-7'>
    <div className='flex items-center gap-10 border-2 px-5'>
        <div>
            <div>
                <img height="300px" width="250px" src={`http://localhost:8080/${tutorsData.profileimagepath}`} alt='teacher-image' ></img>
            </div>
            <div className='text-center'>{`#${tutorsData.userid}`}</div>
       

        </div>

        <div>
            <div className='border-b-2 pt-4' >
                <Link to={`/myaccount/teachers/${tutorsData.userid}`}>
                    <h2 className='font-bold text-2xl'>{`${tutorsData.name} `}</h2>
                </Link>

         

                {/* <p className='text-cyan-800 text-md'>Qualification</p> */}
                <p className='text-cyan-800 text-md'>
                    <span>mele </span>
                    <span>20 years</span>
                </p>
            </div>
            <div className='border-b-2 py-2'>
                {/* <div>
                    <span className='font-semibold text-lg'>Qualification:</span>
                </div> */}
                <div>
                    <span className='font-semibold'>City:</span>
                    <span>{city}</span>
                </div>
                <div>
                    <span className='font-semibold'>Area: </span>
                    <span >{tutorsData.address1}</span>
                </div>

                <div>
                    <span className='font-semibold'>Teaches:</span>
                    {
                        tutorsData?.segments.map((items, i) => (
                            <span key={i}>{` (${items?.segmentname} :- ${items?.subjects}) `}</span>
                        ))
                    }
                     {/* <span >(Class- 10 to 12 :- Hindi,Zoology,History,Statistics,Geography) (Class- 7 to 9 :- Math,English,Science,Computer,Physics,Chemistry)</span> */}
                </div>

                <div>
                    <span className='font-semibold'>Curriculums:</span>
                    {/* {
                        allData[0]?.boardNames.map((items, i) => (
                            <span key={i} >{` ${items}, `}</span>
                        ))
                    } */}




                </div>
            </div>

           
                <div className='py-2'>
                    <p>
                        <span className='font-semibold'>Email:</span>
                        <span > {tutorsData.email}</span>
                    </p>
                    <p>
                        <span className='font-semibold'>Mobile:</span>
                        <span > {tutorsData.mobile}</span>
                    </p>
                    <p>
                        <span className='font-semibold'>WhatsApp:</span>
                        <span > {tutorsData.whatsapp}</span>
                    </p>
                </div>
          


        </div>
    </div>

    <div className='text-white flex items-center justify-between p-4 border-r-2 border-l-2 border-b-2'>
        <button className='bg-blue-500 p-2'> Send Message</button>
    </div>

</div>
  )
}

export default UnlockedContactCard