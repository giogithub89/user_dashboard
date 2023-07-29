import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";

export default function GridToggleButton({ handleChange, alignment }) {
  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
      <ToggleButton value="card">
        <GridViewRoundedIcon />
      </ToggleButton>
      <ToggleButton value="grid">
        <TableRowsRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
