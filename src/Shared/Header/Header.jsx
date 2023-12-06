import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/message.gif";
import "./Header.css";
import { AiOutlineMenu } from "react-icons/ai";
import useAuthChanged from "../../Hooks/useAuthChanged";
const Header = () => {
  const { user, setUser } = useAuthChanged();
  //console.log(user);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("mapmyskill-token");
    //console.log("hello its' log out");
    setUser(null);
    navigate("/");
  };

  const handleRequestTutor =()=>{
    navigate("/request-tutor/hire-tutor")
  }


  return (
    <div className=" flex flex-col md:flex-row fixed top-0 left-0 right-0 bg-white z-30 md:items-center justify-between px-6 md:px-16 py-5 border-b">
      <div className=" flex items-center justify-between">
        <div className="">
          <Link to="/">
            <img className="logo w-[56px] h-[46px]" src={logo} />
          </Link>
        </div>
        <div className="md:hidden block">
          <button className="text-4xl" onClick={() => setIsActive(!isActive)}>
            <AiOutlineMenu></AiOutlineMenu>
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row items-center gap-3   absolute md:static right-0 left-0 bg-white py-12 duration-300 md:py-0 ${
          isActive ? "top-20" : "-top-96"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
         { user && <div>
          <Link to={"/myaccount/upgrade"}><button 
          className="shrink bg-red-500 text-white px-3 py-2"
          >
           subscription
          </button></Link>
          </div>}
          <select className="px-5 py-2 rounded text-18 border border-solid border-gray-400">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>
          <select className="px-5 py-2 rounded text-18 border border-solid border-gray-400">
            <option>Browse tutors</option>
            <option>Browse Institutes</option>
            <option>Browse Classes</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button 
          className="shrink bg-sky-500 text-white px-3 py-2"
          onClick={handleRequestTutor}
          >
            Request a Tutor
          </button>
          {user ? (
            <>
              <Link
                className=" text-white py-2 px-2 rounded-md bg-[#46768b]"
                to={
                  user?.roleid == 3
                    ? "/myaccount/basic-details"
                    : user?.roleid == 4
                    ? "/myaccount/personal-information"
                    : "/"
                }
              >
                {" "}
                {user && <p>{user?.poc}</p>}
              </Link>
              <button
                onClick={handleLogOut}
                className="login-btn  bg-sky-500 text-white px-3 py-2"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <button className="login-btn  bg-sky-500 text-white px-3 py-2">
                <Link to="/login" className="td">
                  Login
                </Link>
              </button>
              <button className="bg-sky-500 text-white px-3 py-2">
                <Link to="/signup" className="td">
                  Signup
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
