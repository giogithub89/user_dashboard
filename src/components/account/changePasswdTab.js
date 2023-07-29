import { FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import CustomCard from "../widget/customCard";
import { useEditPassword } from "../../api/accountAPI/fetchAccount";
import * as Yup from "yup";
import SnackBarCustom from "../../components/widget/SnackBarCustom";
import { InputPswd } from "../inputBase/inputPswd";
//import validationSchemm from '../../script/validateYup'

const ChangePasswdTab = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [helperTx, setHelperText] = useState({});
  const { loading, open, status, severity, message, setOpenSnackbar, mutate } = useEditPassword();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "La password deve contenere minimo 8 caratteri")
      .matches(/[a-zA-Z]/, "La password deve contenere almeno una lettera")
      .matches(/\d/, "La password deve contenere almeno un numero"),
    confirmPswd: Yup.string().oneOf([Yup.ref("password"), null], "Le password non corrispondono"),
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password: password };
    validationSchema
      .validate({ password, confirmPswd })
      .then(() => {
        console.log("Password is valid");
        mutate(data);
        if (status === 200) {
          setPassword("");
          setOldPassword("");
          setConfirmPswd("");
        }
      })
      .catch((error) => {
        console.error("Password is invalid", error);
        setHelperText({ password: error.message, confirmPswd: error.message });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomCard flexDirection="column" p="20px">
        <Box display="flex" justifyContent="space-evenly" marginBottom="20px">
          <Box display="flex" flexDirection="column" width="25%">
            <InputPswd
              label="Vecchia Password"
              htmlFor="oldPassword"
              id="oldPassword"
              //error={helperTx.password}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}></InputPswd>
          </Box>
          <Box display="flex" flexDirection="column" width="30%">
            <InputPswd
              label="Nuova Password"
              htmlFor="password"
              id="password"
              error={helperTx.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              {helperTx.password && <FormHelperText id="password-helper-text">{helperTx.password}</FormHelperText>}
            </InputPswd>
          </Box>
          <Box display="flex" flexDirection="column" width="30%">
            <InputPswd
              label="Conferma Password"
              htmlFor="confrimPassword"
              id="confrimPassword"
              error={helperTx.confirmPswd}
              value={confirmPswd}
              onChange={(e) => setConfirmPswd(e.target.value)}>
              {helperTx.confirmPswd && (
                <FormHelperText id="password-helper-text">{helperTx.confirmPswd}</FormHelperText>
              )}
            </InputPswd>
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          <LoadingButton loading={loading} variant="contained" color="secondary" type="submit">
            Salva modifiche
          </LoadingButton>
        </Box>
      </CustomCard>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
    </form>
  );
};

export default ChangePasswdTab;
