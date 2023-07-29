import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";

const BackArrow = ({ to, title, subTitle }) => {
  return (
    <Box margin="10px 0px 0px 20px" display="flex">
      <Link to={to}>
        <Box p="0px 0px 5px 0px" marginRight="20px">
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Box>
      </Link>
      <Header title={title} subtitle={subTitle} />
    </Box>
  );
};

export default BackArrow;
