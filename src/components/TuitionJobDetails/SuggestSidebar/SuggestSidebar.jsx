import React from "react";
import SuggestBlock from "./SuggestBlock/SuggestBlock";
import axios from "axios";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import { useState } from "react";
import { useEffect } from "react";

const SuggestSidebar = ({ paramid }) => {
  const { user } = useAuthChanged();

  const [suggesttuitionJobs, setSuggesttuitionJobs] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/studentlevel?user=${user?.userid}`)
        .then((res) => {
          if (res.statusText == "OK") {
            const restTuitonData = res?.data?.filter(
              (item) => item?.id != paramid
            );

            console.log(restTuitonData);
            setSuggesttuitionJobs(restTuitonData);
          }
        });
    }
  }, [user, paramid]);
  console.log(suggesttuitionJobs);
  return (
    <div className="p-4 border">
      <h1 className="text-black font-medium">Similar Tutor Jobs</h1>
      <div className=" overflow-y-auto h-[600px] mt-4 space-y-5">
        {suggesttuitionJobs?.length > 0 &&
          suggesttuitionJobs.map((job) => (
            <SuggestBlock job={job} key={job?.id}></SuggestBlock>
          ))}

      </div>
    </div>
  );
};

export default SuggestSidebar;
