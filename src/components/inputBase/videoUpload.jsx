import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import SnackBarCustom from "../widget/SnackBarCustom";

const VideoUpload = ({ src, sendImage, input }) => {
  const [source, setSource] = useState();
  const [severity, setSeverity] = useState();
  const [open, openSnackbar] = useState(false);
  const [message, setMessage] = useState();

  //snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackbar(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files;
    const url = URL.createObjectURL(file[0]);
    const fileName = file[0].name;
    const type = file[0].type;

    let totalFileSize = file[0].size;
    let round = (totalFileSize / 1000000).toFixed(1);

    if ((input === "audio" && round > 50) || (input === "video" && round > 400)) {
      openSnackbar(true);
      setSeverity("warning");
      setMessage("Il file selezionato è troppo grande");
    } else {
      setSource(url);
      const formData = new FormData();
      formData.append("media_files", file[0]);
      sendImage(formData);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="fit-content">
      {input === "audio" ? (
        <audio width="200px" height="100px" controls src={source ? source : src}></audio>
      ) : (
        <video className="VideoInput_video" width="200px" height="100px" controls src={source} />
      )}

      <Button variant="contained" component="label" sx={{ marginTop: "15px", borderRadius: 2 }}>
        <input hidden accept={input === "audio" ? "audio/*" : "video/*"} type="file" onChange={handleUpload} />
        CARICA
      </Button>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
    </Box>
  );
};

export default VideoUpload;
