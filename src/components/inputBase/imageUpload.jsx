import { Avatar, Box, Button } from "@mui/material";
import React, { useState } from "react";

const ImageUpload = ({ alt, src, sendImage }) => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async (e) => {
    const files = e.target.files;
    if (files) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
      const base64 = await convertToBase64(files[0]);
      sendImage(base64);
    } else {
      console.log("cannot upload image");
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Avatar
        alt={fileName ? fileName : alt}
        src={image ? image : src}
        sx={{ width: 100, height: 100, cursor: "pointer" }}
      />
      <Button variant="contained" component="label" sx={{ marginTop: "15px", borderRadius: 2 }}>
        CARICA FOTO
        <input hidden accept="image/*" type="file" onChange={handleImage} />
      </Button>
    </Box>
  );
};

export default ImageUpload;
