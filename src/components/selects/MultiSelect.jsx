import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { tokens } from "../../theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, bagsList, theme) {
  return {
    fontWeight: bagsList.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ label, names, placeholder, setBagsId, setBagValue, ...props }) {
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
    setBagsId(key);
    setBagValue(value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <label htmlFor={props.htmlFor}>{label}</label>
        <Select
          required={props.required}
          labelId="demo-multiple-chip-label"
          id={props.id}
          multiple={props.multiple}
          value={bagsList}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" placeholder={placeholder} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  variant="outlined"
                  sx={{
                    borderColor: colors.secondary[500],
                    color: colors.secondary[500],
                  }}
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem key={name.id} value={name.name} style={getStyles(name, bagsList, theme)}>
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
