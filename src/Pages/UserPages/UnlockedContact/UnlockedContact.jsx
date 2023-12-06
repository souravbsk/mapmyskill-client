import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import axios from "axios";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import { Link } from "react-router-dom";
import UnlockedContactCard from "../UnlockedContactCard/UnlockedContactCard";

const UnlockedContact = () => {
  const { user } = useAuthChanged();
  const [allData, setAllData] = useState([]);
  const [unlockedContact, setUnlockedContacts] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/findallbyrole/3`)
      .then((res1) => {
        // console.log("Res1", res1.data);
        res1.data ? setAllData(res1?.data) : null;

        if (res1.statusText == "OK") {
          axios
            .get(`http://localhost:8080/api/contactsviewed/${user?.userid}`)
            .then((res2) => {
              // console.log("Res2", res2.data);

              // const filtered = res2.data.filter((item1) => {
              //   res1.data.includes(item1.viewedusers);
              // });
              const filteredId = res2?.data?.map(item1 => item1.viewedusers)
              const filteredUsers = res1?.data.filter(item2 =>filteredId.includes(item2.userid) )
              setUnlockedContacts(filteredUsers)
              console.log("filteredId",filteredId);
              console.log("filteredUsers",filteredUsers);
            })
            .catch((error) => {
              console.error("error fetching contactsviewed data ", error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.userid]);

  console.log("allData", allData);
  // console.log("user", user);
  // console.log("unlockedContact", unlockedContact);

  return (
    <div>
      <div className="ml-[116px] mt-28">
        <Link to={"/myaccount/dashboard"}>
          <button className="bg-[#0ea5e9] text-white py-1 pl-2 pr-4">
            <ArrowBackIcon className="text-white"></ArrowBackIcon>
            Back
          </button>
        </Link>
      </div>

      <div>
        {unlockedContact.map((data) => (
          <UnlockedContactCard
            key={data.userid}
            tutorsData={data}
          ></UnlockedContactCard>
        ))}
      </div>
    </div>
  );
};

export default UnlockedContact;
