import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { tokens } from "../../theme";

const UserBadge = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="130px"
      height="30px"
      m="0 auto"
      p="5px"
      display="flex"
      justifyContent="center"
      backgroundColor={
        type === "communicator" ? colors.secondary[400] : type === "business" ? colors.pink[500] : colors.yellow[500]
      }
      borderRadius="4px">
      {type === "business" && <MilitaryTechIcon />}
      {type === "communicator" && <RecordVoiceOverIcon />}
      {type === "user" && <LockOpenOutlinedIcon />}

      <Typography color={colors.white[500]} sx={{ ml: "5px" }}>
        {type}
      </Typography>
    </Box>
  );
};

export default UserBadge;
