import { Avatar, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import SnackBarCustom from "../widget/SnackBarCustom";

const MultipleImageUpload = ({ alt, src, sendSelectedFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMess] = useState();
  const [open, openSnackbar] = useState(false);

  const handleFileChange = (event) => {
    const urlFiles = Array.from(event.target.files).map((file, i) => URL.createObjectURL(file));
    const files = Array.from(event.target.files);

    let totalFileSize = 0;

    for (let i = 0; i < files.length; i++) {
      totalFileSize += files[i].size;
    }
    let round = (totalFileSize / 1000000).toFixed(1);

    if (round < 200) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("media_files", files[i]);
        //"image"
        //"url"
        //"type"
      }
      //setSelectedFiles(files.map(file => URL.createObjectURL(file)));
      sendSelectedFiles(formData);
      setSelectedFiles(urlFiles);
      // for (var pair of formData.entries()) {
      //   console.log("pair", pair);
      // }
    } else {
      openSnackbar(true);
      setMess(`il totale dei file, ${round} MB, ha superato il limite di 200 MB`);
    }
  };

  //snackbar
  const handleCloseSnackbar = (event, reason) => {
    openSnackbar(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {selectedFiles.map((previewUrl, index) => (
          <img
            src={previewUrl ? previewUrl : src}
            key={index}
            alt="Preview"
            width="200px"
            height="100px"
            style={{ marginRight: "15px" }}
          />
        ))}
        {selectedFiles.length === 0 && (
          <Avatar alt={alt} src={src} sx={{ width: 100, height: 100, cursor: "pointer" }} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" component="label" sx={{ marginTop: "15px", borderRadius: 2, width: "200px" }}>
          CARICA FOTO
          <input hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
        </Button>
      </Grid>
      <SnackBarCustom severity={"warning"} open={open} onClose={handleCloseSnackbar} text={message} />
    </Grid>
  );
};

export default MultipleImageUpload;
