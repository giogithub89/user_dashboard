import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useValidateResetPassword } from "../../api/resetPasswordAPI/resetPassword";
import ContainedButton from "../../components/buttons/ContainedButton";

const ValidateResetPswd = () => {
  const { isLoading, errMessage } = useValidateResetPassword();
  const navigate = useNavigate();

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box height="40vh" width="400px">
        {isLoading && <CircularProgress />}

        {isLoading ? (
          <Typography variant="h3">Reindirizzamento... Attendere prego</Typography>
        ) : (
          <Typography variant="h3">Errore, contatta l'amministratore</Typography>
        )}
        {errMessage && <Typography variant="h3">Errore</Typography>}
        <ContainedButton
          text={"Login"}
          sx={{ borderRadius: 2, width: "50%" }}
          color="primary"
          variant="contained"
          onClick={() => navigate("/login")}></ContainedButton>
      </Box>
    </Box>
  );
};

export default ValidateResetPswd;
