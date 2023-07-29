import React from "react";
import CellGridCustom from "../gridLayout/CellGridCustom";
import CustomCard from "../widget/customCard";
import { Box, LinearProgress, Typography } from "@mui/material";

const LineProgressCard = ({ customMap }) => {
  return (
    <CellGridCustom gridColumn="span 6">
      <CustomCard m="20px" p="20px">
        <Box display="flex" flexDirection="column" flex={2} justifyContent="space-between">
          <Typography textTransform="uppercase" marginBottom="10px">
            Statistiche demografiche
          </Typography>
          {customMap.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" width="100%" p={2} justifyContent="space-around">
              <Typography variant="h4">{item.age}</Typography>
              <LinearProgress
                color="info"
                variant="determinate"
                //value={item.perc.replace("%", "")}
                value={item.count}
                sx={{ width: "150px" }}
              />
              <Typography variant="h4" color="secondary">
                {item.count}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CustomCard>
    </CellGridCustom>
  );
};

export default LineProgressCard;
