import { Button } from "@mui/material";
import React from "react";

const ContainedButton = ({ text, onClick, variant, color, type, m }) => {
  return (
    <Button sx={{ borderRadius: 2, marginLeft: "20px" }} color={color} variant={variant} type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ContainedButton;
