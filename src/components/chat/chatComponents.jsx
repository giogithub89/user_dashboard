import React from "react";

import { Stack, Box, Typography, Menu, MenuItem, IconButton, Divider, useTheme, colors } from "@mui/material";
import { tokens } from "../../theme";

export const Timeline = ({ el }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: colors.primary[1000] }}>
        {/* {el.text} */}
        oggi
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};
