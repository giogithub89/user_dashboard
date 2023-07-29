import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import BoxCard from "../gridLayout/BoxCard";

export function CardSkeleton() {
  return (
    <BoxCard>
      <Box m="5px 0px 10px 0px" gridColumn="span 3">
        <Skeleton animation="wave" variant="rounded" sx={{ width: 200, height: 100 }} />
      </Box>
      <Box m="5px 0px 10px 0px" gridColumn="span 3">
        <Skeleton animation="wave" variant="rounded" sx={{ width: 200, height: 100 }} />
      </Box>
      <Box m="5px 0px 10px 0px" gridColumn="span 3">
        <Skeleton animation="wave" variant="rounded" sx={{ width: 200, height: 100 }} />
      </Box>
      <Box m="5px 0px 10px 0px" gridColumn="span 3">
        <Skeleton animation="wave" variant="rounded" sx={{ width: 200, height: 100 }} />
      </Box>
    </BoxCard>
  );
}

export function UserSkeleton() {
  return (
    <Box sx={{ width: "80%" }}>
      <Skeleton animation="wave" variant="circular" height={70} width={70} />
      <Box height={30}></Box>
      <Skeleton animation="wave" variant="rounded" height={250} />
      <Box height={30}></Box>
    </Box>
  );
}

export function AdminSkeleton() {
  return (
    <Box sx={{ width: "80%" }}>
      <Box height={30}></Box>
      <Skeleton animation="wave" variant="rounded" height={250} />
      <Box height={30}></Box>
    </Box>
  );
}
