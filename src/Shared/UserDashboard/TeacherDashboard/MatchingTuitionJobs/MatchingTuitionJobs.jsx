import React, { useEffect, useState } from "react";
import MatchingTuitionBlock from "../../../../components/MatchingTuitionBlock/MatchingTuitionBlock";
import axios from "axios";
import useAuthChanged from "../../../../Hooks/useAuthChanged";

const MatchingTuitionJobs = () => {
  const { user } = useAuthChanged();
  const [tuitionJobs, setTuitionJobs] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/studentlevel?user=${user?.userid}`)
        .then((res) => {
          if (res.statusText == "OK") {
            setTuitionJobs(res?.data);
          }
        });
    }
  }, [user]);

  console.log(tuitionJobs);
  return (
    <div className="space-y-5 py-4">
      {tuitionJobs &&
        tuitionJobs?.map((jobs, i) => (
          <MatchingTuitionBlock user={user} jobs={jobs} key={i}></MatchingTuitionBlock>
        ))}
    </div>
  );
};

export default MatchingTuitionJobs;
