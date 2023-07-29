import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCV from "../../../components/addNewUser/AddCV";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/layout/Header";
import ContainedButton from "../../../components/buttons/ContainedButton";
import useFetchUserId from "../../../api/usersAPI/fetchUserId";

//edit Cv user already exist
//pass cv from user id

const EditCVPage = () => {
  const location = useLocation();
  const exp = location.state?.exp;

  return (
    <Box m="20px">
      {/* <BackArrow to={`/users/${params.userId}`} title="MODIFICA CURRICULUM" /> */}
      {/* <BackArrow navigate=(-1) title="MODIFICA CURRICULUM" /> */}
      <Header title="Curriculum" subtitle="Modifica Curriculum"></Header>

      <AddCV experiences={exp} />
      <Box display="flex" justifyContent="flex-end">
        <ContainedButton text="Salva modifiche" variant="contained" color="secondary" type="submit"></ContainedButton>
      </Box>
    </Box>
  );
};
export default EditCVPage;
