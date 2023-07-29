import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostSPContent } from "../../../api/sponsorAPI/fetchSponsorCnt";
import { useFetchUsersList } from "../../../api/usersAPI/fetchUsersList";
import BoxCard from "../../../components/gridLayout/BoxCard";
import CellGridCustom from "../../../components/gridLayout/CellGridCustom";
import ComboBox from "../../../components/inputBase/autoCompleteCustom";
import MultipleImageUpload from "../../../components/inputBase/multipleFileUpload";
import GoogleMaps from "../../../components/inputBase/placeInputCustom";
import VideoUpload from "../../../components/inputBase/videoUpload";
import Header from "../../../components/layout/Header";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import CustomCard from "../../../components/widget/customCard";
import placeholder from "../../../resources/image_placeholder.jpeg";
import "../sponsor_content/sponsor.css";
import LoadingBtn from "../../../components/buttons/loadingBtn";
import { useTotalBagName } from "../../../api/bagAPI/fetchBag";

const Sponsor = () => {
  const { sponsorList, usersList } = useFetchUsersList();
  const { options } = useTotalBagName();
  const { message, open, severity, loading, onSuccess, openSnackbar, mutate } = usePostSPContent();

  const CHARACTER_LIMIT = 3500;
  const TITLE_LIMIT = 100;
  const CONTENT_TEXT_LIMIT = 1000;
  const [contentMediaType, setContentMediaType] = useState("text");
  const [contentText, setContentText] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dataUploaded, setDataUploaded] = useState();

  const [userName, setUser] = React.useState("");
  const [userId, setUserId] = useState("");
  const [target_position_name, setPosition] = useState("");
  const [target_position_latitude, setLatitude] = useState("");
  const [target_position_longitude, setLongitude] = useState("");
  const [tag, setTag] = useState([]);
  const [bagsList, setBagsList] = useState([]);
  const [bagsIds, setSecBagsIds] = useState([]);

  const modules = {
    toolbar: ["bold", "italic", "underline"],
  };

  useEffect(() => {
    if (userName) {
      const user = sponsorList.find((user) => userName === user.username);
      setUserId(user?.id);
    }
  }, [userName]);

  const handleChangeMediaType = (event) => {
    setContentMediaType(event.target.value);
  };

  // handle text fields event
  const editContentText = (event) => {
    setContentText(event.target.value);
  };
  const editTitle = (event) => {
    setTitle(event.target.value);
  };
  const editDesc = (event) => {
    setDesc(event.target.value);
  };
  //handle author name
  const handleInputChange = (event, newValue) => {
    setUser(newValue);
  };
  //handle tags
  const onInputChange = (event, value) => {
    const id = value.map((user) => user.id);
    setTag(id);
  };

  const handleLocation = (value) => {
    setPosition(value);
  };
  const handleLatLong = (location) => {
    const { latitude, longitude } = location;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const onSecBagChange = (event, value) => {
    //const selectedOption = value.map((i) => i.name);
    //const existBag = selectedOption.find((item) => item === newBags);
    if (value.length < 5) {
      setBagsList(value);
      const id = value.map((el) => el.id);
      setSecBagsIds(id);
    }
  };

  //snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackbar(false);
  };

  //handle files uploaded
  const handleDataUploaded = (files) => {
    setDataUploaded(files);
  };

  //submit data
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      title,
      caption: desc,
      target_position_name,
      target_position_latitude,
      target_position_longitude,
      author_id: userId,
      bags_ids: bagsIds,
      mentions_ids: tag,
    };

    //console.log(data, contentMediaType, contentText ? contentText : dataUploaded);

    if (contentMediaType === "text") {
      await mutate(data, contentMediaType, contentText);
      console.log("text");
      console.log(data, contentMediaType, contentText);
    } else {
      for (var pair of dataUploaded.entries()) {
        console.log("pair", pair);
      }
      console.log("media");
      console.log(data, contentMediaType, contentText, dataUploaded);
      await mutate(data, contentMediaType, contentText, dataUploaded);
    }

    //clearForm();
  };

  const clearForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <Box m="20px">
      <Header title="NEW SPONSOR CONTENT" subtitle="Create a new Sponsor Content" />
      <form>
        <CustomCard flexDirection="column" p="20px 20px" alignItems="center">
          <BoxCard rowGap="30px">
            {/* ROW 1 */}
            <CellGridCustom gridColumn="span 4" width="70%">
              <label>{"Autore"}</label>
              <Autocomplete
                disablePortal
                inputValue={userName ? userName : ""}
                onInputChange={handleInputChange}
                id="combo-box-demo"
                options={sponsorList}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option?.username}
                renderInput={(params) => <TextField {...params} placeholder="Cerca..." />}
              />
            </CellGridCustom>
            <CellGridCustom gridColumn="span 2" width="90%" alignItems="center" justifyContent="center">
              {/* <FormControlLabel control={<Checkbox onChange={handleCheckbox} />} label="Sei tu l'autore?" /> */}
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>

            {/* ROW 2 */}
            <CellGridCustom gridColumn="span 3" width="70%">
              <label htmlFor="role-label">Content</label>
              <Select
                labelId="role-label"
                id="demo-simple-select"
                value={contentMediaType}
                onChange={handleChangeMediaType}>
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"audio"}>Audio</MenuItem>
                <MenuItem value={"image"}>Photo</MenuItem>
                <MenuItem value={"video"}>Video</MenuItem>
              </Select>
            </CellGridCustom>

            <CellGridCustom gridColumn="span 3" width="70%"></CellGridCustom>
            <CellGridCustom gridColumn="span 6" width="70%"></CellGridCustom>

            {/* ROW 3 */}
            <CellGridCustom gridColumn="span 12">
              {contentMediaType === "audio" && (
                <VideoUpload alt={"user3"} src={placeholder} sendImage={handleDataUploaded} input={contentMediaType} />
              )}
              {contentMediaType === "image" && (
                <MultipleImageUpload alt={"user3"} src={placeholder} sendSelectedFiles={handleDataUploaded} />
              )}
              {contentMediaType === "video" && (
                <VideoUpload src={placeholder} sendImage={handleDataUploaded} input={contentMediaType} />
              )}
            </CellGridCustom>

            {contentMediaType === "text" && (
              <>
                <CellGridCustom gridColumn="span 8" width="90%" height={"130px"}>
                  <label htmlFor="contentText">Text</label>
                  <CellGridCustom gridColumn="span 12" width="90%">
                    <label htmlFor="content">Content Text</label>
                    <TextField
                      multiline
                      inputProps={{ maxLength: CHARACTER_LIMIT }}
                      helperText={`${desc.length}/${CHARACTER_LIMIT}`}
                      type="text"
                      id="content"
                      onChange={(e) => editDesc(e)}
                      required
                      value={contentText}></TextField>
                  </CellGridCustom>
                </CellGridCustom>
                <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>
              </>
            )}

            {/* ROW 4 */}

            <CellGridCustom gridColumn="span 4" width="90%">
              <label htmlFor="title">Title</label>
              <TextField
                type="text"
                id="title"
                inputProps={{ maxLength: TITLE_LIMIT }}
                helperText={`${title.length}/${TITLE_LIMIT}`}
                onChange={setContentText}
                required
                value={title}></TextField>
            </CellGridCustom>
            <CellGridCustom gridColumn="span 8" width="90%">
              <label htmlFor="captation">Description</label>
              <TextField
                multiline
                inputProps={{ maxLength: CHARACTER_LIMIT }}
                helperText={`${desc.length}/${CHARACTER_LIMIT}`}
                type="text"
                id="captation"
                onChange={(e) => editDesc(e)}
                required
                value={desc}></TextField>
            </CellGridCustom>

            {/* ROW 6 */}
            <CellGridCustom gridColumn="span 4" width="90%">
              <label htmlFor="city">Place</label>
              <GoogleMaps setLocation={handleLocation} setLatLong={handleLatLong} />
            </CellGridCustom>

            <CellGridCustom gridColumn="span 4" width="90%">
              {" "}
              <ComboBox label={"Tag"} option={usersList} onChange={onInputChange}></ComboBox>
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%">
              <ComboBox label={"Bag secondarie"} onChange={onSecBagChange} option={options} value={bagsList}></ComboBox>
            </CellGridCustom>

            {/* ROW 7 */}
            <Box gridColumn="span 10"></Box>
            <Box gridColumn="span 2" display="flex" alignItems="center" justifyContent="center" marginTop="20px">
              <LoadingBtn text="Pubblica" loading={loading}></LoadingBtn>
            </Box>
          </BoxCard>
        </CustomCard>
      </form>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
    </Box>
  );
};

export default Sponsor;
