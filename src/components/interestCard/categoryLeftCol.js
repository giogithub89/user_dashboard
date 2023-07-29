import { Box } from "@mui/material";
import React from "react";

const CategoryLeftCol = ({ children, onClick }) => {
  return (
    <Box
      onClick={onClick}
      display="flex"
      width="80%"
      height="100%"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center">
      {children}
    </Box>
  );
};

export default CategoryLeftCol;
