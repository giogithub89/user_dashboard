import { Box } from "@mui/material";
import React from "react";

const CustomForm = ({ children, m, justifyContent }) => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" backgroundColor="rgb(51,198,182)">
      <Box
        backgroundColor="rgb(19,33,45)"
        width="30%"
        height="70vh"
        color="#fff"
        display="flex"
        flexDirection="column"
        justifyContent={justifyContent}
        p="2px 40px 2px 40px"
        borderRadius={4}
        boxShadow={"5px 5px 10px #111"}
        m={m}>
        {children}
      </Box>
    </Box>
  );
};

export default CustomForm;
