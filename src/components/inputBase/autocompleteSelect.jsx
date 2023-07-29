import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Chip, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function AutocompleteSelect({ label, option, onChange, value, ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bagsList, setBagsList] = React.useState([]);

  const handleChange = (event, obj) => {
    const {
      target: { value },
    } = event;
    setBagsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const key = obj.key.replace(".$", "");
  };

  return (
    <>
      <label>{label}</label>
      <Autocomplete
        loading
        disablePortal
        //multiple
        filterSelectedOptions
        onChange={onChange}
        value={value}
        id="multiselectChips"
        options={option}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option?.username}
        renderInput={(params) => <TextField {...params} placeholder="Search..." />}
      />
    </>
  );
}
