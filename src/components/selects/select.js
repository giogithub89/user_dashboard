import { Box, Select } from "@mui/material";
import React from "react";

export const CustomSelect = ({ value, onChange, labelId, id, children, fullWidth }) => {
  return (
    <Box width="40%">
      <Select labelId={labelId} id={id} value={value} size="small" onChange={onChange} fullWidth={fullWidth}>
        {children}
      </Select>
    </Box>
  );
};
