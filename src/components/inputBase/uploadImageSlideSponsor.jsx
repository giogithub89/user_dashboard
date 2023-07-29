import { Avatar, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import SnackBarCustom from "../widget/SnackBarCustom";

const ImageUploadSponsorSlide = ({ alt, src, sendSelectedFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [message, setMess] = useState();
  const [open, openSnackbar] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const urlFiles = URL.createObjectURL(files[0]);

    let totalFileSize = 0;
    let round = (totalFileSize / 1000000).toFixed(1);

    if (round < 200) {
      sendSelectedFiles(files[0]);
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
        <Avatar
          alt={alt}
          src={selectedFiles ? selectedFiles : src}
          sx={{ width: 100, height: 100, cursor: "pointer" }}
        />
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

export default ImageUploadSponsorSlide;
