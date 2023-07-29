import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostContent } from "../../../api/content/fetchContent";
import { useFetchDivList, useSWRUsersListPage } from "../../../api/usersAPI/fetchUsersList";
import BoxCard from "../../../components/gridLayout/BoxCard";
import CellGridCustom from "../../../components/gridLayout/CellGridCustom";
import ComboBox from "../../../components/inputBase/autoCompleteCustom";
import MultipleImageUpload from "../../../components/inputBase/multipleFileUpload";
import GoogleMaps from "../../../components/inputBase/placeInputCustom";
import VideoUpload from "../../../components/inputBase/videoUpload";
import Header from "../../../components/layout/Header";
import MultipleSelect from "../../../components/selects/MultiSelect";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import CustomCard from "../../../components/widget/customCard";
import placeholder from "../../../resources/image_placeholder.jpeg";
import "../sponsor_content/sponsor.css";
import { useTotalBagName } from "../../../api/bagAPI/fetchBag";
import AutocompleteSelect from "../../../components/inputBase/autocompleteSelect";
import { mockUserList } from "../../../data/userData_mock";

const CreateContent = () => {
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  const { usersList, isLoading } = useSWRUsersListPage(page, pageSize);
  const { message, open, severity, loading, onSuccess, openSnackbar, mutate } = usePostContent();

  const { options } = useTotalBagName();

  const CHARACTER_LIMIT = 3500;
  const TITLE_LIMIT = 100;
  const CONTENT_TEXT_LIMIT = 1000;
  const [contentMediaType, setContentMediaType] = useState("text");
  const [type, setType] = useState("regular");
  const [contentText, setContentText] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dataUploaded, setDataUploaded] = useState();
  const [url, setUrl] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [checked, setChecked] = useState(true);
  const [userName, setUser] = useState("");
  const [value, setNewValue] = React.useState(null);
  const [bags, setBags] = useState([]);
  const [newBags, setNewBags] = useState();
  const [bagsList, setBagsList] = useState([]);

  const [bagId, setBagId] = useState();
  const [bagsIds, setSecBagsIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [position_name, setPosition] = useState("Torino, Italy");
  const [position_latitude, setLatitude] = useState("45.0703393");
  const [position_longitude, setLongitude] = useState("7.686864");
  const [tag, setTag] = useState([]);
  const [fileName, setFileName] = useState();
  const [mime, setMediaType] = useState();
  const contentRef = useRef();

  const modules = {
    toolbar: ["bold", "italic", "underline"],
  };

  const style = {
    "& .ql-snow .ql-stroke": { stroke: "white" },
  };
  const qlstroke = document.getElementsByClassName(".ql-stroke");

  const handlePage = () => {
    setPage((prev) => prev + 1);
  };

  //handle author name
  const handleUsernameChange = (event, inputValue) => {
    setUser(inputValue.username);
    setNewValue(inputValue);

    // Accessing the bag list
    const bagsList = inputValue ? inputValue.bags : [];
    setBags(bagsList);
  };

  useEffect(() => {
    if (userName) {
      const user = mockUserList.find((user) => userName === user.username);
      setUserId(user?.id);
      console.log(user?.id);
    }
  }, [userName]);

  const handleChangeMediaType = (event) => {
    setContentMediaType(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };
  const handleUrl = (e) => {
    //const inputValues = e.target.value.split(", ");
    //setUrlList([inputValues.map((value) => value.trim())]);
    //setUrl([inputValues.map((value) => value.trim())]);
    // const urlList = inputValues.map((value) => value.trim());

    // const newUrl = urlList.map((url) => ({
    //   text: url,
    //   source: url,
    // }));
    const newUrl = { text: e.target.value, url: e.target.value };
    setUrlList([newUrl]);
    setUrl(e.target.value);
    //console.log([newUrl]);
  };

  // handle text fields event
  const editContentText = (content) => {
    setContentText(content);
  };

  const editTitle = (event) => {
    setTitle(event.target.value);
  };
  const editDesc = (event) => {
    setDesc(event.target.value);
  };

  //handle tags
  const onInputChange = (event, value) => {
    const id = value.map((user) => user.id);
    setTag(id);
  };

  //handle bag name
  const setBagValue = (value) => {
    setNewBags(value);
  };

  //get bags id
  const handlePrimaryBagId = (value) => {
    setBagId(value);
  };

  const onSecBagChange = (event, value) => {
    const selectedOption = value.map((i) => i.name);
    const existBag = selectedOption.find((item) => item === newBags);
    if (existBag) {
      return null;
    } else {
      if (value.length < 5) {
        setBagsList(value);
        const id = value.map((el) => el.id);
        setSecBagsIds(id);
      }
    }
  };

  const handleLocation = (value) => {
    setPosition(value);
  };
  const handleLatLong = (location) => {
    const { latitude, longitude } = location;
    setLatitude(latitude);
    setLongitude(longitude);
    //console.log(latitude, longitude);
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
      type,
      source_is_author: checked,
      position_name,
      position_latitude,
      position_longitude,
      author_id: userId,
      bag_id: bagId,
      secondary_bags_ids: bagsIds,
      sources: urlList,
      mentions_ids: tag,
    };

    //console.log(data, contentMediaType, contentText ? contentText : dataUploaded, mime, fileName);
    if (contentMediaType === "text") {
      await mutate(data, contentMediaType, contentText);
    } else {
      // for (var pair of dataUploaded.entries()) {
      //   console.log("pair", pair);
      // }
      //console.log(data, contentMediaType, contentText, dataUploaded);
      await mutate(data, contentMediaType, contentText, dataUploaded, mime, fileName);
    }
    clearForm();
  };

  const clearForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Box m="20px">
      <Header title={"NEW CONTENT"} subtitle="Create new content" />
      <form>
        <CustomCard flexDirection="column" p="20px 20px" alignItems="center">
          <BoxCard rowGap="30px">
            {/* ROW 1 */}
            <CellGridCustom gridColumn="span 4" width="70%">
              <AutocompleteSelect
                label={"Author"}
                onChange={handleUsernameChange}
                option={mockUserList}
                value={value}></AutocompleteSelect>
            </CellGridCustom>
            <CellGridCustom gridColumn="span 2" width="90%" alignItems="center" justifyContent="center">
              <FormControlLabel
                control={<Checkbox onChange={handleCheckbox} checked={checked} />}
                label="Are you the author?"
              />
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%">
              <label htmlFor="url">Url</label>
              <TextField
                required={!checked}
                //pattern="https://.*"
                type="text"
                id="url"
                placeholder="Enter the link url"
                // onChange={(e) => handleUrl(e.target.value)}
                onChange={handleUrl}
                value={url}
                //value={url.join(", ")}
              ></TextField>
            </CellGridCustom>

            {/* ROW 2 */}
            <CellGridCustom gridColumn="span 3" width="70%">
              <label htmlFor="role-label">Content type</label>
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

            <CellGridCustom gridColumn="span 3" width="70%">
              <label htmlFor="type-label">Content Subscription</label>
              <Select labelId="type-label" id="type-select" value={type} onChange={handleChangeType}>
                <MenuItem value={"regular"}>Normal</MenuItem>
                <MenuItem value={"premium"}>Premium</MenuItem>
              </Select>
            </CellGridCustom>
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
                  value={desc}></TextField>
              </CellGridCustom>
            )}

            {/* ROW 4 */}

            <CellGridCustom gridColumn="span 4" width="90%">
              <label htmlFor="title">Title</label>
              <TextField
                type="text"
                id="title"
                inputProps={{ maxLength: TITLE_LIMIT }}
                helperText={`${title.length}/${TITLE_LIMIT}`}
                onChange={(e) => editTitle(e)}
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

            {/* ROW 5 */}
            <CellGridCustom gridColumn="span 4" width="90%">
              <MultipleSelect
                required
                label={"Primary Category"}
                names={bags}
                multiple={false}
                htmlFor="bag"
                id="bag"
                setBagsId={handlePrimaryBagId}
                setBagValue={setBagValue}
              />
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%">
              <ComboBox
                label={"Secondary Category"}
                onChange={onSecBagChange}
                option={options}
                value={bagsList}></ComboBox>
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>

            {/* ROW 6 */}
            <CellGridCustom gridColumn="span 4" width="90%">
              <label htmlFor="city">Place</label>
              <GoogleMaps setLocation={handleLocation} setLatLong={handleLatLong} />
            </CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>
            <CellGridCustom gridColumn="span 4" width="90%">
              <ComboBox label={"Tag"} option={usersList} onChange={onInputChange}></ComboBox>
            </CellGridCustom>

            {/* ROW 7 */}
            <Box gridColumn="span 10"></Box>
            <Box gridColumn="span 2" display="flex" alignItems="center" justifyContent="center" marginTop="20px">
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ borderRadius: 2 }}>
                Publish
              </LoadingButton>
            </Box>
          </BoxCard>
        </CustomCard>
      </form>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
    </Box>
  );
};

export default CreateContent;
