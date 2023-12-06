import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useFetchValue from "../../../../Hooks/useFetchValue";
import Multiselect from "multiselect-react-dropdown";
const AddMoreTutoring = ({ blocks, setBlocks, user }) => {
  //teaching experience

  const { getValue: teacherBoard } = useFetchValue("teacherBoard");
  const [boardValue, setBoardValue] = useState([]);

  const [categories, setCategories] = useState([]);
  const [segments, setSegments] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAddBlock = () => {
    setBlocks([
      ...blocks,
      {
        category: "",
        segment: "",
        subjects: [],
        boards: [],
        price: "",
        userid: user?.userID,
      },
    ]);
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const handleCategoryChange = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].category = value;
    setBlocks(updatedBlocks);

    // Fetch segments based on the selected category
    axios
      .get(`http://localhost:8080/api/segment/bycategory/${value}`)
      .then((response) => {
        // Update the 'segments' state for the specific block
        const updatedSegments = [...segments];
        updatedSegments[index] = response.data;
        setSegments(updatedSegments);
      })
      .catch((error) => {
        console.error("Error fetching segments:", error);
      });
  };

  const handleSegmentChange = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].segment = value;
    updatedBlocks[index].userid = user?.userID;
    setBlocks(updatedBlocks);

    // Fetch subjects based on the selected segment
    axios
      .get(`http://localhost:8080/api/subject/bysegment/${value}`)
      .then((response) => {
        // Update the 'subjects' state for the specific block
        const updatedSubjects = [...subjects];
        updatedSubjects[index] = response.data;
        setSubjects(updatedSubjects);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  };

  const handleBoardChange = (index, teacherBoard) => {
    const value = teacherBoard.map((item) => item?.listItemId);
    const updatedBlocks = [...blocks];
    updatedBlocks[index].boards = value;
    setBlocks(updatedBlocks);
  };
  const handlePriceChange = (index, value) => {
    if (isNaN(value)) {
      alert("Only numeric value accepted");
      return;
    }
    if (value.length > 5) {
      alert("Upto 5 digits allowed.");
      return;
    }
    const updatedBlocks = [...blocks];
    updatedBlocks[index].price = value;
    setBlocks(updatedBlocks);
  };

  const handleSubjectChange = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].subjects = value;
    setBlocks(updatedBlocks);
  };

  return (
    <div className="">
      {blocks.map((block, index) => (
        <CardContent className="border-2" key={index}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} lg={6} item>
              <FormControl variant="standard" fullWidth>
                <InputLabel id={`category-label-${index}`}>
                  Category*
                </InputLabel>
                <Select
                  value={block.category}
                  labelId={`category-label-${index}`}
                  required
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category.categoryid}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} lg={6} item>
              <FormControl variant="standard" fullWidth>
                <InputLabel id={`segment-label-${index}`}>Level *</InputLabel>
                <Select
                  value={block.segment}
                  required
                  labelId={`segment-label-${index}`}
                  onChange={(e) => handleSegmentChange(index, e.target.value)}
                >
                  <MenuItem value="">Select Level</MenuItem>
                  {segments[index] &&
                    segments[index].map((segment) => (
                      <MenuItem key={segment.id} value={segment.segmentid}>
                        {segment.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <InputLabel className="mt-5" id="demo-simple-select-standard-label">
            Select Subjects
          </InputLabel>
          <div className="mb-4 h-40 border-2 rounded-md border-gray-300 overflow-y-auto">
            <ul className="subject-checkboxes">
              {subjects[index] &&
                subjects[index].map((subject) => (
                  <li key={subject.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={subject.subjectid}
                        checked={block.subjects.includes(subject.subjectid)}
                        onChange={(e) => {
                          const selectedSubjects = [...block.subjects];
                          if (e.target.checked) {
                            selectedSubjects.push(subject.subjectid);
                          } else {
                            const subjectIndex = selectedSubjects.indexOf(
                              subject.subjectid
                            );
                            if (subjectIndex !== -1) {
                              selectedSubjects.splice(subjectIndex, 1);
                            }
                          }
                          handleSubjectChange(index, selectedSubjects);
                        }}
                      />
                      {subject.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          {/* ----------------------------- select subject  */}

          <Grid container spacing={2} className="board">
            <Grid xs={12} sm={12} lg={12} item>
              <FormControl variant="standard" fullWidth>
                <Multiselect
                  displayValue={"listItemName"}
                  isObject={true}
                  onSelect={(teacherBoard) =>
                    handleBoardChange(index, teacherBoard)
                  }
                  onRemove={(teacherBoard) =>
                    handleBoardChange(index, teacherBoard)
                  }
                  options={teacherBoard}
                  placeholder="Select Boards (Multiple)"
                  showArrow={true}
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6} lg={6} item>
              <TextField
                variant="standard"
                fullWidth
                label="Rate per hour"
                placeholder="Enter amount in Rs."
                value={block.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
          <div className="text-right">
            <Button variant="outlined" onClick={() => handleDeleteBlock(index)}>
              Delete Tutoring
            </Button>
          </div>
        </CardContent>
      ))}
      <div className="text-right pr-3 pt-2">
        <Button variant="outlined" type="button" onClick={handleAddBlock}>
          Add More Tutoring
        </Button>
      </div>
    </div>
  );
};

export default AddMoreTutoring;
