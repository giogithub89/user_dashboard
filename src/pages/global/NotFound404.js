import { Box, Typography } from "@mui/material";
import React from "react";
import page404 from "../../resources/404_error.png";
const NotFound404 = () => {
  return (
    <Box m="20px" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Box display="flex">
        <img alt="404-page-not-found" src={page404} style={{ width: "700px", height: "600px" }}></img>
      </Box>
      <Typography variant="h1" fontWeight="bold">
        Page not Found
      </Typography>
    </Box>
  );
};

export default NotFound404;
