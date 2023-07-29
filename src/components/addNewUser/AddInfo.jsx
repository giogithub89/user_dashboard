import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import CellGridCustom from "../gridLayout/CellGridCustom";
import { MuiDataPicker } from "../../components/widget/MuiDataPicker";
import placeholder from "../../resources/profile_placeholder.jpeg";
import ImageUpload from "../inputBase/imageUpload";
import GoogleMaps from "../inputBase/placeInputCustom";

const AddInfo = ({ role, changeRole }) => {
  const nameRef = useRef();
  const surnameRef = useRef();
  const [gender, setGender] = useState("uomo");
  const [dob, setDob] = useState();
  const emailRef = useRef();
  const pswdRef = useRef();
  const nCivicoRef = useRef();
  const addressRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();
  const rSocialeRef = useRef(null);
  const pivaRef = useRef();
  const [position_name, setPosition] = useState("");
  const [position_latitude, setLatitude] = useState("");
  const [position_longitude, setLongitude] = useState("");

  const [provincia, setProvincia] = useState("");

  const handleLocation = (value) => {
    setPosition(value);
  };
  const handleLatLong = (location) => {
    const { latitude, longitude } = location;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const changeProvince = (event) => {
    setProvincia(event.target.value);
  };

  const changeGender = (event) => {
    setGender(event.target.value);
  };

  const uploadImage = () => {
    console.log("upload image");
  };

  const submitForm = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitForm}>
      <Box rowGap="20px" columnGap="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)">
        {/* ROW userId */}

        <Box gridColumn="span 2" display="flex">
          <ImageUpload alt="profile-user" src={placeholder} />
        </Box>
        <CellGridCustom gridColumn="span 2" width="80%" justifyContent="flex-end">
          <label htmlFor="role-label">Ruolo</label>
          <Select labelId="role-label" id="simple-select" value={role} size="small" onChange={changeRole}>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="divulgatore">Divulgatore</MenuItem>
            <MenuItem value="sponsor">Business</MenuItem>
          </Select>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 3" justifyContent="flex-end">
          <label htmlFor="username">Username</label>
          <TextField
            size="small"
            type="text"
            id="username"
            required
            autoComplete="off"
            //inputRef={pswdRef}
          ></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 3" width="90%" justifyContent="end">
          <label htmlFor="email">Email</label>
          <TextField
            //inputRef={emailRef}
            size="small"
            type="email"
            id="email"
            //autoComplete="on"
            required></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 2" justifyContent="flex-end">
          <label htmlFor="password">Password</label>
          <TextField
            size="small"
            type="password"
            id="password"
            required
            autoComplete="off"
            //inputRef={pswdRef}
          ></TextField>
        </CellGridCustom>

        {/* ROW 2 */}

        <CellGridCustom gridColumn="span 4" width="90%">
          <label htmlFor="name">Nome</label>
          <TextField
            size="small"
            name="name"
            type="text"
            id="name"
            //autoComplete="on"
            required
            inputRef={nameRef}></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 4" width="90%">
          <label htmlFor="surname">Cognome</label>
          <TextField
            size="small"
            type="text"
            id="surname"
            //autoComplete="on"
            required
            //inputRef={surnameRef}
          ></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 2">
          <label htmlFor="dob">Data di nascita</label>
          <MuiDataPicker size="small" />
        </CellGridCustom>
        <CellGridCustom gridColumn="span 2" width="70%">
          <label id="gender-label">Genere</label>
          <Select labelId="gender-label" id="gender-select" value={gender} size="small" onChange={changeGender}>
            <MenuItem value={"uomo"}>Uomo</MenuItem>
            <MenuItem value={"donna"}>Donna</MenuItem>
            <MenuItem value={"altro"}>Altro</MenuItem>
          </Select>
        </CellGridCustom>
        {/* ROW 3 */}
        <CellGridCustom gridColumn="span 12">
          <Typography variant="h4" fontWeight="bold">
            Indirizzo
          </Typography>
        </CellGridCustom>

        <CellGridCustom gridColumn="span 4" width="90%">
          <label htmlFor="address">Indirizzo</label>
          <TextField inputRef={addressRef} size="small" type="text" id="address" required></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 2" width="90%">
          <label htmlFor="nCivico">N.civico</label>
          <TextField inputRef={nCivicoRef} size="small" id="nCivico" type="number" required></TextField>
        </CellGridCustom>

        <CellGridCustom gridColumn="span 2" width="90%">
          <label htmlFor="zipCode">Codice Postale</label>
          <TextField inputRef={zipCodeRef} size="small" type="number" id="zipCode" required></TextField>
        </CellGridCustom>
        <CellGridCustom gridColumn="span 3" width="90%">
          <label htmlFor="city">Città</label>
          <GoogleMaps size={"small"} setLocation={handleLocation} setLatLong={handleLatLong} />
        </CellGridCustom>
        <CellGridCustom gridColumn="span 1">
          <label htmlFor="provincie-label">Provincia</label>
          <Select
            labelId="provincie-label"
            id="provincie-select"
            value={provincia}
            size="small"
            onChange={changeProvince}>
            <MenuItem></MenuItem>
          </Select>
        </CellGridCustom>
        {/* ROW 5 */}
      </Box>

      {role === "sponsor" && (
        <Box rowGap="20px" columnGap="20px" marginTop="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)">
          <CellGridCustom gridColumn="span 12">
            <Typography variant="h4" fontWeight="bold">
              Business Info
            </Typography>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="rSociale">Ragione Sociale</label>
            <TextField inputRef={rSocialeRef} type="text" id="rSociale" required size="small"></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="piva">P. Iva</label>
            <TextField inputRef={pivaRef} type="text" id="piva" required size="small"></TextField>
          </CellGridCustom>
        </Box>
      )}
    </form>
  );
};

export default AddInfo;
