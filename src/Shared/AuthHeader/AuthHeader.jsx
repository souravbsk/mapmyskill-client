import React from 'react'
import logo from "./../../assets/images/message.gif"
import {HiOutlineMail} from "react-icons/hi"
import { Link } from 'react-router-dom'

const AuthHeader = () => {
  return (
    <div className='flex items-center justify-between gap-3 containerCl border-b'>
      <div>
        <Link to="/" ><img className='w-[100px] h-[100px] mx-auto' src={logo}/></Link>
        
      </div>
      <div className='text-right'>
        <p className='text-right'>For Any assitance</p>
        <p className='text-xl font-medium flex items-center gap-2'><HiOutlineMail></HiOutlineMail>support@mapmyskill.in</p>
      </div>
    </div>
  )
}

export default AuthHeader
