import { Box, Select, MenuItem, FormGroup, FormControlLabel, useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SnackBarCustom from "../widget/SnackBarCustom";
import React, { useEffect, useRef, useState } from "react";
import { MuiDataPicker } from "../widget/MuiDataPicker";
import BoxCard from "../gridLayout/BoxCard";
import CellGridCustom from "../gridLayout/CellGridCustom";
import ContainedButton from "../buttons/ContainedButton";
import { LoadingButton } from "@mui/lab";
import UserBadge from "../widget/UserBadge";
import { tokens } from "../../theme";
import CustomCard from "../widget/customCard";
import AlertDialog from "../modalDialog/AlertDialogDelete";
import ImageUpload from "../inputBase/imageUpload";
import { mockUserList } from "../../data/userData_mock";

const InfoCard = ({ userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const title = "Delete user?";
  const desc = "By clicking on continue, this action will no longer be reversible";

  const usernameRef = useRef(null);
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();

  const [open, setOpenSnackbar] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [name, setFirstName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.surname);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender ? user?.gender : "male");
  const [type, setType] = useState(user?.type ? user.type : "");
  const [date, setDate] = useState(user?.dob);
  const [city, setCity] = useState(user?.city?.name);

  useEffect(() => {
    const user = mockUserList.find((user) => user.id === userId);

    // If user is not found, display a message
    if (!user) {
      return <div>User not found</div>;
    }
    setUser(user);
    setUsername(user?.username);
    //console.log(user);
  }, [user, userId]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const openOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const submitFormChanges = (event) => {
    console.log("inputRef " + usernameRef.current.value);
    console.log("inputRef " + emailRef.current.value);
    console.log("inputRef " + nameRef.current.value);
    console.log("inputRef " + surnameRef.current.value);
    openOpenSnackbar(true);

    event.preventDefault();
  };

  return (
    <form onSubmit={submitFormChanges}>
      <SnackBarCustom severity="success" open={open} onClose={handleCloseSnackbar} text="Changes saved!" />

      {/* GRID */}
      <CustomCard>
        <BoxCard backgroundColor={colors.primary[400]} rowGap="30px">
          {/* ROW userId */}

          <Box gridColumn="span 12" display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box display="flex" justifyContent="space-between" width="25%">
                <ImageUpload alt={"user3"} src={user?.image} />

                <Box>
                  <UserBadge type={type} />
                </Box>
              </Box>

              <Box>
                <ContainedButton
                  text={"DELETE USER"}
                  variant="contained"
                  color="error"
                  onClick={() => setOpenAlert(true)}></ContainedButton>
              </Box>
            </Box>
          </Box>

          {/* ROW 2 */}
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="username">Username</label>
            <TextField
              inputRef={usernameRef}
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="email">Email</label>
            <TextField
              inputRef={emailRef}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>
          {/* ROW 3 */}

          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="name">Name</label>
            <TextField
              name="name"
              type="text"
              id="name"
              //autoComplete="on"
              required
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
              inputRef={nameRef}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="surname">Surname</label>
            <TextField
              type="text"
              id="surname"
              //autoComplete="on"
              required
              inputRef={surnameRef}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="60%">
            <label htmlFor="dob">Date of birth</label>
            <MuiDataPicker dob={date} />
          </CellGridCustom>

          {/* ROW 4 */}
          <CellGridCustom gridColumn="span 2" width="90%">
            <label id="gender-label">Genre</label>
            <Select labelId="gender-label" id="demo-simple-select" value={"male"} onChange={handleChange}>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="80%">
            <label htmlFor="city">City</label>
            <TextField
              inputRef={cityRef}
              type="text"
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4">
            <FormGroup>
              <FormControlLabel control={<Checkbox disabled checked />} label="Terms & conditions" />
              <FormControlLabel control={<Checkbox disabled checked />} label="Privacy & cookie policy" />
            </FormGroup>
          </CellGridCustom>
          {/* ROW 5 */}
          <Box gridColumn="span 10" display="flex" alignItems="center" justifyContent="center"></Box>
          <Box gridColumn="span 2" display="flex" alignItems="center" justifyContent="center">
            <LoadingButton variant="contained" color="secondary" type="submit">
              Save changes
            </LoadingButton>
          </Box>
        </BoxCard>
      </CustomCard>
      <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)} title={title} desc={desc} />
    </form>
  );
};

export default InfoCard;
