import axios from "../axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RESET_URL = "/staff/password-reset/";
const VALIDATE_RESET_URL = "/staff/password-reset/validate/";
const CONFIRM_RESET_URL = "/staff/password-reset/confirm/";

export const useResetPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [open, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");

  return {
    isLoading,
    errMessage,
    open,
    severity,
    setOpenSnackbar,
    mutate: async (e) => {
      try {
        const response = await axios.post(RESET_URL, JSON.stringify({ email: e.target.email.value }), {
          headers: { "Content-Type": "application/json" },
        });
        console.log(JSON.stringify(response?.data));
        setLoading(false);
        setOpenSnackbar(true);
        setSeverity("success");
        setErrMessage("Richiesta inviata con successo. Controlla la tua email.");
      } catch (error) {
        setOpenSnackbar(true);
        setSeverity("error");
        if (!error?.response) {
          setErrMessage("Nessuna risposta dal server");
        } else if (error?.response?.status === 400) {
          setErrMessage("Email non valida");
        } else if (error?.response?.status === 401) {
          setErrMessage("Controlla le credenziali");
        } else {
          setErrMessage("Login Failed");
        }
        setLoading(false);
      }
    },
  };
};

export const useValidateResetPassword = async () => {
  //http://localhost:3000/password-reset/validate/?token=90b49591150e0ca44cffdbff62033531b304d5d914c1914733
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(VALIDATE_RESET_URL, JSON.stringify({ token }), {
          headers: { "Content-Type": "application/json" },
        });
        setErrMessage("valid Token");

        navigate("/password-reset/confirm/", { state: { token: token } });
      } catch (error) {
        console.log(error.message);
        setErrMessage(error?.message);
        //openSnackbar(true);
        if (!error?.response) {
          setErrMessage("Nessuna risposta dal server");
        } else if (error?.response?.status === 400) {
          setErrMessage("Invalid Token");
        } else if (error?.response?.status === 401) {
          setErrMessage("Unauthorized. Check your credentials");
        } else {
          setErrMessage("Il token non esiste");
        }
      } finally {
        setLoading(false);
        //console.log(errMessage);
      }
    };
    validateToken();
  }, [location.search]);

  return { errMessage, isLoading, token };
};

export const useConfirmResetPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [open, setOpenSnackbar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  return {
    isLoading,
    errMessage,
    open,
    openAlert,
    setOpenSnackbar,
    setOpenAlert,
    mutate: async ({ e, token }) => {
      console.log(e);
      try {
        const response = await axios.post(
          CONFIRM_RESET_URL,
          JSON.stringify({ password: e.target.password.value, token }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // if (response.status === 201) {
        // }
        setOpenAlert(true);
        console.log("password reset successfuly");
        //console.log(JSON.stringify(response?.data));
      } catch (error) {
        setOpenSnackbar(true);
        console.log(error);
        if (!error?.response) {
          setErrMessage("Nessuna risposta dal server");
        } else if (error?.response?.status === 400) {
          setErrMessage("L'url non è più valido. Richiedi un nuovo link.");
        } else if (error?.response?.status === 401) {
          setErrMessage("Controlla la password");
        } else {
          setErrMessage("Contatta l'amministratore");
        }
      } finally {
        setLoading(false);
      }
    },
  };
};
