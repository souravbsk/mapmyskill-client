import React from "react";

// ---------------mui icon start------------------
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
// ---------------mui icon end------------------

// ------------------mui component start--------------------
import Button from '@mui/material/Button';
// ------------------mui component end--------------------

// import css from header csss 

 import './AdminHeader.css'

const Header = () => {
  return (
    <div id="header">
      <h3>User</h3>
      <Person2RoundedIcon className="iconn" />
      <NotificationsActiveRoundedIcon className="iconn" />
      <Button variant="contained">Logout</Button>
    </div>
  );
};

export default Header;
