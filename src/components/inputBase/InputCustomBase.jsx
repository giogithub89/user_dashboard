import { IconButton, InputBase, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { tokens } from "../../theme";

const InputCustomBase = ({ m }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" backgroundColor={colors.white[500]} borderRadius="3px" border="1px solid #0f1a24" m={m}>
      <InputBase sx={{ ml: 2, flex: 1, color: colors.primary[500] }} placeholder="Search" />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon sx={{ color: colors.primary[500] }} />
      </IconButton>
    </Box>
  );
};

export default InputCustomBase;
