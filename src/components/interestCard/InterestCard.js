import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import "./interestCard.css";
import CategoryLeftCol from "./categoryLeftCol";
import { Delete, Edit } from "@mui/icons-material";
import CategoryRightCol from "./categoryRightCol";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const InterestCard = ({ text, backgroundColor, onMouseEnter, onMouseLeave, onClick, onEdit, onDelete, icon }) => {
  const iconList = [<OndemandVideoIcon />, <OndemandVideoIcon />];

  return (
    <Box
      className="interestCard"
      boxShadow="rgba(0, 0, 0, 0.64) 0px 3px 8px"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      m="5px 0px 10px 0px"
      gridColumn="span 3"
      width="200px"
      height="100px"
      borderRadius={2}
      backgroundColor={backgroundColor}
      color="white"
      sx={{
        transition: "all 100ms ease-in-out",
        ":hover": { cursor: "pointer", transform: "scale(1.1)", transition: " transform .2s" },
      }}>
      <Box width="200px" height="100%" display="flex" alignItems="center">
        <CategoryLeftCol onClick={onClick}>
          {/* <SurfingRoundedIcon sx={{ fontSize: 22 }} /> */}

          {/* <span className={`icon-${icon}`}></span> */}
          {/* <OndemandVideoIcon /> */}
          {icon}
          <Typography variant="h6" fontWeight="bold">
            {text}
          </Typography>
        </CategoryLeftCol>

        <CategoryRightCol>
          <IconButton className="interestCard_icon" onClick={onEdit}>
            <Edit sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton className="interestCard_icon" onClick={onDelete}>
            <Delete sx={{ fontSize: 14 }} />
          </IconButton>
        </CategoryRightCol>
      </Box>
    </Box>
  );
};

export default InterestCard;
