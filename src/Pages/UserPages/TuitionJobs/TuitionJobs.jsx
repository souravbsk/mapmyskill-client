import React, { useEffect, useState } from "react";
import TuitionJobsFilter from "./TuitionJobsFilter/TuitionJobsFilter";
import MatchingTuitionBlock from "../../../components/MatchingTuitionBlock/MatchingTuitionBlock";
import axios from "axios";
import useAuthChanged from "../../../Hooks/useAuthChanged";

const TuitionJobs = () => {
  const { user } = useAuthChanged();
  const [tuitionJobs, setTuitionJobs] = useState([]);
  const [filteredTuitionJobs, setFilteredTuitionJobs] = useState([]);
  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/studentlevel?user=${user?.userid}`)
        .then((res) => {
          if (res.statusText == "OK") {
            setTuitionJobs(res?.data);
            setFilteredTuitionJobs(res?.data);
          }
        });
    }
  }, [user]);
  console.log(tuitionJobs);

  const handleFilterChange = (filteredData) => {
    setFilteredTuitionJobs(filteredData);
  };

  console.log(tuitionJobs);

  return (
    <div className="containerCl">
      <div className="py-5">
        <h2 className="font-semibold text-xl">
          Matching Tuition Jobs in Kolkata
        </h2>
        <p className="text-gray-500 font-light">
          {filteredTuitionJobs?.length} records found
        </p>
      </div>
      <div className="flex mt-4">
        <TuitionJobsFilter
          handleFilterChange={handleFilterChange}
          setTuitionJobs={handleFilterChange}
          tuitionJobs={tuitionJobs}
        ></TuitionJobsFilter>
        <div>
          {filteredTuitionJobs &&
            filteredTuitionJobs?.map((jobs, i) => (
              <MatchingTuitionBlock
                user={user}
                jobs={jobs}
                key={i}
              ></MatchingTuitionBlock>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TuitionJobs;
