import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";

export const InputPswd = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <OutlinedInput
        error={props.error}
        aria-describedby="password-helper-text"
        type={showPassword ? "text" : "password"}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.children}
    </FormControl>
  );
};
