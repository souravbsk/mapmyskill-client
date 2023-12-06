import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetchValue from "../../../Hooks/useFetchValue";

const MatchingTeacherFilter = ({ tutorsData, handleFilterData }) => {
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/segment").then((res) => {
      setSegments(res?.data);
    });
  }, []);

  const handleSegmentChange = (event) => {
    const selectedValue = Number(event.target.value);
    setSelectedSegment(selectedValue);
    const filterSegmentData = tutorsData.filter((teacher) => {
      return teacher?.segmentsid.includes(selectedValue);
    });
    handleFilterData(filterSegmentData);
  };

  return (
    <div className="px-3 border-r">
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

export default MatchingTeacherFilter;
