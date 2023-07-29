import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
var voucher_codes = require("voucher-code-generator");

const CodeGenerator = () => {
  const [voucher, setVoucher] = useState();

  const generateCode = () => {
    setVoucher(
      voucher_codes.generate({
        pattern: "##-###-##-####",
      })
    );
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="start">
        <Button variant="contained" onClick={() => generateCode()}>
          Genera Codice Invito
        </Button>
        <Box marginLeft="20px">
          <TextField value={voucher} disabled size="small"></TextField>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeGenerator;
