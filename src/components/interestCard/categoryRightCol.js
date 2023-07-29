import { Box } from "@mui/system";
import React from "react";

const CategoryRightCol = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" width="20%" marginTop="20px" height="100%">
      {children}
    </Box>
  );
};

export default CategoryRightCol;
