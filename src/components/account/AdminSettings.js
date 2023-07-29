import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomCard from "../widget/customCard";
import CustomizedSwitches from "../widget/customizedSwitches";

const AdminSettings = () => {
  return (
    <CustomCard flexDirection="column" p="20px">
      <Box marginBottom="20px">
        <Typography textTransform="uppercase">Manager</Typography>
      </Box>
      <Box marginLeft="10px" marginBottom="20px">
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Modifica/Elimina categorie"} defaultChecked={true} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Modifica/Elimina bag"} defaultChecked={true} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Aggiungi categorie"} defaultChecked={true} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Aggiungi bag"} defaultChecked={true} />
        </Box>
      </Box>
      <Box marginBottom="20px">
        <Typography textTransform="uppercase">Staff</Typography>
      </Box>

      <Box marginLeft="10px">
        <Box m="0px 0px 10px 0px">
          <Typography>Aree Tematiche</Typography>
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Modifica categorie"} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Modifica bag"} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Aggiungi categorie"} defaultChecked={true} />
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Aggiungi bag"} defaultChecked={true} />
        </Box>
        <Box m="10px 0px 10px 0px">
          <Typography> Contenuti</Typography>
        </Box>
        <Box display="flex" align-items="flex-start" margin-top="16px">
          <CustomizedSwitches label={"Pubblica contenuti"} />
        </Box>
      </Box>
    </CustomCard>
  );
};

export default AdminSettings;
