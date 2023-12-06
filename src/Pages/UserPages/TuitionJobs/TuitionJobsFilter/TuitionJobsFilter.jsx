import React, { useEffect, useState } from "react";
import useFetchValue from "../../../../Hooks/useFetchValue";
import axios from "axios";

const TuitionJobsFilter = ({
  tuitionJobs,
  handleFilterChange,
  setTuitionJobs,
}) => {
  const { getValue: studentLocations } = useFetchValue(
    "studentTrainingLocation"
  );

  const [selectedSegment, setSelectedSegment] = useState(null);

  // location filter
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [segments, setSegments] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/segment").then((res) => {
      setSegments(res?.data);
    });
  }, []);

  const handleSegmentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSegment(selectedValue);

    const filterBySegment = tuitionJobs.filter(
      (job) => job?.segmentid == selectedValue
    );

    if (filterBySegment?.length > 0) {
      setTuitionJobs(filterBySegment);
    } else {
      setTuitionJobs(tuitionJobs);
    }
  };

  const handleLocationChange = (event) => {
    const locationId = Number(event.target.value);
    const isChecked = event.target.checked;

    const existID = selectedLocations.find((id) => locationId == id);
    if (!existID) {
      setSelectedLocations([...selectedLocations, locationId]);
    } else {
      const restids = selectedLocations.filter((id) => locationId != id);
      setSelectedLocations(restids);
    }

    console.log(selectedLocations);
  };

  useEffect(() => {
    if(selectedLocations.length > 0){
      const filterCheckBoxData = tuitionJobs.filter((job) => {
        return selectedLocations.includes(job?.locationid);
      });
      handleFilterChange(filterCheckBoxData);
    }
    else{
      handleFilterChange(tuitionJobs);
    }
  }, [selectedLocations]);

  return (
    <div className="px-3 border-r">
      <form className="mt-5">
        <div>
          <p className="mb-4">LOCATION PREFERENCE</p>

          {studentLocations?.map((location) => (
            <>
              <label key={location?.listItemId}>
                <input
                  type="checkbox"
                  value={location?.listItemId}
                  id={location?.listItemId}
                  name="check"
                  onChange={handleLocationChange}
                  checked={selectedLocations?.listItemId?.includes(
                    location?.listItemd
                  )}
                />
                {location?.listItemName}
              </label>
              <br />
            </>
          ))}
        </div>
      </form>

      <form className="mt-5">
        <div>
          <p className="mb-3">SEGMENTS</p>

          {segments.map((segment) => (
            <>
              <label key={segment?.segmentid}>
                <input
                  type="radio"
                  value={segment?.segmentid}
                  name="jobfreshness"
                  onChange={handleSegmentChange}
                  checked={selectedSegment == segment?.segmentid}
                />
                {segment?.name} <small>({segment?.catname})</small>
              </label>
              <br />
            </>
          ))}
        </div>
      </form>
    </div>
  );
};

export default TuitionJobsFilter;
