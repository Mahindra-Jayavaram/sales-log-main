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
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
} from "../Redux/tasks/action";

export const Form = ({ handleClose }) => {
  //useState hook to hold the entered values/ data.
  const [data, setData] = useState({
    status: "progress",
  });
  const dispatch = useDispatch();

  //handle dat afunction to handle the onChange and taking the values from the input box.
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //handle submit is to post the data into the server as well as to update the state in the redux.
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskRequest());
    axios
      .post("https://sales-log.herokuapp.com/data", data)
      .then((res) => {
        dispatch(addTaskSuccess(res.data));

        // alert("task added succesfully");
      })
      .catch((err) => {
        dispatch(addTaskFailure(err.message));
      });
  };

  return (
    <div>
      {/* material ui container to wrap the form */}
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
                id="outlined-required"
                label="Entity Name"
                fullWidth
                value={data.entityName}
                onChange={handleData}
                name="entityName"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Task</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="task"
                  value={data.task}
                  label="task"
                  onChange={handleData}
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
                id="outlined-required"
                type={"Date"}
                label=""
                fullWidth
                value={data.date}
                name="date"
                onChange={handleData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Person Name"
                fullWidth
                value={data.personName}
                name="personName"
                onChange={handleData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Contact No"
                type={"Number"}
                fullWidth
                value={data.contactNumber}
                name="contactNumber"
                onChange={handleData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Note (Optional)"
                defaultValue=""
                style={{ width: "98%", height: "100px" }}
                value={data.notes}
                name="notes"
                onChange={handleData}
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
            ADD TASK
          </Button>
        </form>
      </Container>
    </div>
  );
};
