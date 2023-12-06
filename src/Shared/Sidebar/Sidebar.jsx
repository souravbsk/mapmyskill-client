import React, { useState } from 'react';
import './Sidebar.css'
// -------------------mui icon import start---------------------
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { FaIdCard } from 'react-icons/fa';
import {MdSubscriptions} from "react-icons/md"
// -------------------mui icon import end---------------------
// ------------------sidebar data start----------------------------------------
const sideNav = [
  {id:1, title:'Dashboard', iconn:<HomeOutlinedIcon/>,href:"/tutor-app/admin"},
  {id:2, title:'Users', iconn:<GroupOutlinedIcon/>,href:"/tutor-app/admin/users"},
  {id:3, title:'Segment', iconn:<CardGiftcardIcon/>,href:"/tutor-app/admin/segment"},
  {id:4, title:'Subject', iconn:<ChromeReaderModeOutlinedIcon/>,href:"/tutor-app/admin/subject"},
  {id:5, title:'Master Data', iconn:<TopicOutlinedIcon/>,href:"/tutor-app/admin/master-data"},
  {id:6, title:'NID Verify', iconn:<FaIdCard/>,href:"/tutor-app/admin/verify-card"},
  {id:6, title:'Subscription', iconn:<MdSubscriptions/>,href:"/tutor-app/admin/subcription-plan"},
]
// ------------------sidebar data end----------------------------------------
const Sidebar = () => {

  const [active, setActive] = useState(null)

    return (
        <div id='sidebar'>
      <h1>Map My Skill</h1>
      <ul>
        {
          sideNav.map((sidenavdata) => (
            <li key={sidenavdata.id} onClick={() => setActive(sidenavdata)} className={` ${active === sidenavdata && 'active'}`}>
                
                 <Link className='flex gap-3  items-center' to={sidenavdata.href}><span>{sidenavdata.iconn}</span> {sidenavdata.title} <ArrowForwardIosIcon className='arrow' /></Link>
                 
                 </li>
          ))
        }

      </ul>
    </div>
    );
};

export default Sidebar;