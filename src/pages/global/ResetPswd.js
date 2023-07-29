import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomForm from "../../components/form/customForm";
import SnackBarCustom from "../../components/widget/SnackBarCustom";
import { useResetPassword } from "../../api/resetPasswordAPI/resetPassword";

const ResetPswd = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const { errMessage, isLoading, severity, open, setOpenSnackbar, mutate } = useResetPassword();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const openSnackbar = () => {
    setOpenSnackbar(true);
  };

  // useEffect(() => {
  //   setErrMessage("");
  // }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(e);
  };

  return (
    <CustomForm justifyContent="space-around">
      <Box m="30px 0px 0px 0px">
        <Typography variant="h1" textAlign="center" fontWeight="bold" marginBottom="30px">
          RESET PASSWORD
        </Typography>
      </Box>

      <Box display="flex" width="100%" flexDirection="column">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" margin-bottom="20px">
            <label htmlFor="email">Email</label>
            <TextField
              //focused
              //   error={emailErrMsg}
              //   helperText={emailErrMsg}
              type="email"
              id="email"
              inputRef={emailRef}
              fullWidth
              autoComplete="on"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}></TextField>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box m="30px 0px 20px 0px" display="flex" justifyContent="center">
              <LoadingButton
                loading={isLoading}
                sx={{ borderRadius: 2, width: "50%" }}
                color="primary"
                variant="contained"
                type="submit">
                Invia
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>

      <Box marginTop="30px">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Typography color="white" sx={{ ":hover": { color: "rgb(51,198,182)" } }}>
            Già registrato? Effettua il Login
          </Typography>
        </Link>
      </Box>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={errMessage} />
    </CustomForm>
  );
};

export default ResetPswd;
