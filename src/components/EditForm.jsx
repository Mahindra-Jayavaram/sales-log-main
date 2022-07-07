import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CallIcon from "@mui/icons-material/Call";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getData } from "../Redux/tasks/action";

export const EditForm = ({ handleClose, taskData }) => {
  // console.log("TASKDATA", taskData);
  const dispatch = useDispatch();

  //to get the the data from the table, use usestate hook to restore the old values
  //set the values as the current values in the exit form.
  const [updatedData, setUpdatedData] = useState({
    entityName: taskData.row.entityName,
    task: taskData.row.task,
    date: taskData.row.date,
    personName: taskData.row.personName,
    contactNumber: taskData.row.contactNumber,
    notes: taskData.row.notes,
  });

  //this will help to set the updated data into the useState.
  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: [e.target.value.trim()],
    });
  };
  //function to update the data and make a patch request to the json server
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://sales-log.herokuapp.com/data/${taskData.row.id}`,
        updatedData
      )
      .then((res) => {
        dispatch(getData());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {/* edit form having the values of the uppdated data */}
      <Container maxWidth="sm" sx={{ padding: "10px" }}>
        <form action="" onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, md: 3 }}
            gridTemplateColumns="repeat(3,1fr)"
          >
            <Grid item xs={12}>
              <TextField
                required
                label="Entity Name"
                fullWidth
                value={updatedData.entityName}
                onChange={handleChange}
                name="entityName"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Task</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="task"
                  name="task"
                  value={updatedData.task}
                  onChange={handleChange}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="Call">
                    <span>
                      <CallIcon
                        sx={{ fontSize: "20px", marginRight: "10px" }}
                      />
                    </span>{" "}
                    Call
                  </MenuItem>
                  <MenuItem value="video">
                    <span>
                      <GroupIcon
                        sx={{ fontSize: "20px", marginRight: "10px" }}
                      />
                    </span>
                    Video Call
                  </MenuItem>
                  <MenuItem value="Meeting">
                    <span>
                      <LocationOnIcon
                        sx={{ fontSize: 18, marginRight: "10px" }}
                      />
                    </span>
                    Meeting
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                type={"Date"}
                label=""
                fullWidth
                value={updatedData.date}
                name="date"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="Person Name"
                fullWidth
                value={updatedData.personName}
                name="personName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="Contact No"
                type={"Number"}
                fullWidth
                value={updatedData.contactNumber}
                name="contactNumber"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Note (Optional)"
                defaultValue=""
                style={{ width: "98%", height: "100px" }}
                value={updatedData.notes}
                name="notes"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            sx={{
              marginTop: "10px",
            }}
            type="submit"
            onClick={handleClose}
          >
            SAVE
          </Button>
        </form>
      </Container>
    </div>
  );
};
