import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const CategoryChip = ({ label, onDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack direction="row" spacing={1} marginRight="10px">
      <Chip
        label={label}
        variant="outlined"
        onDelete={onDelete}
        sx={{
          borderColor: colors.secondary[500],
          color: colors.secondary[500],
        }}
      />
    </Stack>
  );
};

export default CategoryChip;
