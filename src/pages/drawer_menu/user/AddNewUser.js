import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/layout/Header";
import HorizontalLinearStepper from "../../../components/stepper/customStepper";

const AddNewUser = () => {
  return (
    <Box m="20px">
      <Header title="NEW USERS" subtitle="Add a new user" />

      <HorizontalLinearStepper />
    </Box>
  );
};

export default AddNewUser;
