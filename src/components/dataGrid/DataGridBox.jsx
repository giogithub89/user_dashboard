import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const DataGridBox = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="20px 0 0 0"
      height="70vh"
      sx={{
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {},
        // "& .name-column--cell": {
        //   color: colors.secondary[100],
        // },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.yellow[600],
          borderBottom: "none",
        },
        "& .MuiDataGrid-row": {
          backgroundColor: colors.primary[400],
          ":hover": { cursor: "pointer" },
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.yellow[600],
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        },
        "& .MuiCheckbox-root": {
          color: `${colors.secondary[200]} !important`,
        },
      }}>
      {children}
    </Box>
  );
};

export default DataGridBox;
