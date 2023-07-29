import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useConfirmResetPassword } from "../../api/resetPasswordAPI/resetPassword";
import CustomForm from "../../components/form/customForm";
import { InputPswd } from "../../components/inputBase/inputPswd";
import CustomAlertDialog from "../../components/modalDialog/CustomAlertDialog";
import SnackBarCustom from "../../components/widget/SnackBarCustom";

const ConfirmResetPswd = () => {
  const [password, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [pswdErrMsg, setPaswErrMsg] = useState();
  const [confirmPswdErrMsg, setConfirmPswdErrMsg] = useState();
  const navigate = useNavigate();
  const [helperTx, setHelperText] = useState({});
  const { state } = useLocation();
  const { token } = state || {};

  const {
    openAlert,
    isLoading: loading,
    errMessage,
    open,
    setOpenAlert,
    setOpenSnackbar,
    mutate,
  } = useConfirmResetPassword();
  const title = "Completato";
  const desc = "Password resettata con successo. Vai al login.";

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      //.min(8, "La password deve contenere minimo 8 caratteri")
      //.matches(/^[a-zA-Z0-9]+$/, "La password deve essere alfanumerica"),
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        "La password deve contenere almeno 8 caratteri, di cui almeno una lettera minuscola, una lettera maiuscola, e un numero"
      ),
    confirmPswd: Yup.string().oneOf([Yup.ref("password"), null], "Le password non corrispondono"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ password, confirmPswd })
      .then(() => {
        mutate({ e, token });
      })
      .catch((error) => {
        setHelperText({ confirmPswd: error.message });
        console.error("Password is invalid", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomForm justifyContent="space-around">
        <Box m="30px 0px 0px 0px">
          <Typography variant="h1" textAlign="center" fontWeight="bold" marginBottom="30px">
            RESET PASSWORD
          </Typography>
        </Box>
        <InputPswd
          label="Nuova Password"
          htmlFor="newPassword"
          id="newPassword"
          value={password}
          onChange={(e) => setPswd(e.target.value)}></InputPswd>
        <InputPswd
          label="Conferma Password"
          htmlFor="confrimPassword"
          id="confrimPassword"
          error={helperTx.confirmPswd}
          value={confirmPswd}
          onChange={(e) => setConfirmPswd(e.target.value)}>
          {helperTx.confirmPswd && <FormHelperText id="password-helper-text">{helperTx.confirmPswd}</FormHelperText>}
        </InputPswd>
        <Box m="20px 0px 0px 0px" display="flex" justifyContent="center">
          <LoadingButton
            loading={loading}
            sx={{ borderRadius: 2, width: "50%" }}
            color="primary"
            variant="contained"
            type="submit">
            Salva Password
          </LoadingButton>
        </Box>
      </CustomForm>
      <CustomAlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        title={title}
        desc={desc}
        confirmModal={() => navigate("/login")}
      />
      <SnackBarCustom severity="error" open={open} onClose={handleCloseSnackbar} text={errMessage} />
    </form>
  );
};

export default ConfirmResetPswd;
