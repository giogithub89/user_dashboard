import { Box, Typography } from "@mui/material";
import React from "react";
import CellGridCustom from "../gridLayout/CellGridCustom";
import CustomCard from "../widget/customCard";

const SmallBox = ({ children }) => {
  return (
    <Box display="flex" p="20px" flexDirection="column" flex={1} borderRight="1px solid #0f1a24">
      {children}
    </Box>
  );
};

const StatsCommunicator = () => {
  return (
    <>
      <CellGridCustom gridColumn="span 8">
        <CustomCard m="20px" flexDirection="column">
          {/* UTENTI */}
          <Box display="flex" borderBottom="1px solid #0f1a24">
            <SmallBox>
              <Typography textTransform="uppercase">Free Plan</Typography>
              <Typography variant="h2" color="secondary">
                {"24.980"}
              </Typography>
            </SmallBox>
            <Box display="flex" p="20px" flexDirection="column" flex={1}>
              <Typography textTransform="uppercase">Premium Plan</Typography>
              <Typography variant="h2" color="secondary">
                {"5.020"}
              </Typography>
            </Box>
          </Box>

          {/* DIVULGATORI */}
          <Box display="flex" borderBottom="1px solid #0f1a24">
            <SmallBox>
              <Typography textTransform="uppercase">Communicators</Typography>
              <Typography variant="h2" color="secondary">
                {"472"}
              </Typography>
            </SmallBox>
            <Box display="flex" p="20px" flexDirection="column" flex={1}>
              <Typography textTransform="uppercase">{"Contents"}</Typography>
              <Typography variant="h2" color="secondary">
                {"9.376"}
              </Typography>
            </Box>
          </Box>

          {/* SPONSOR */}
          <Box display="flex">
            <SmallBox>
              <Typography textTransform="uppercase">Sponsor Users</Typography>
              <Typography variant="h2" color="secondary">
                {"76"}
              </Typography>
            </SmallBox>
            <Box display="flex" p="20px" flexDirection="column" flex={1}>
              <Typography textTransform="uppercase">Sponsor Contents</Typography>
              <Typography variant="h2" color="secondary">
                {"3.293"}
              </Typography>
            </Box>
          </Box>
        </CustomCard>
      </CellGridCustom>

      <CellGridCustom gridColumn="span 4">
        <CustomCard m="20px" flexDirection="column">
          <Box display="flex" p="20px" flexDirection="column" flex={1} borderBottom="1px solid #0f1a24">
            <Typography textTransform="uppercase">Reports</Typography>
            <Typography variant="h2" color="secondary">
              {"34"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" flex={1} p="20px">
            <Typography textTransform="uppercase">Chat Reports</Typography>
            <Typography variant="h2" color="secondary">
              {"348"}
            </Typography>
          </Box>
        </CustomCard>
      </CellGridCustom>
    </>
  );
};

export default StatsCommunicator;
