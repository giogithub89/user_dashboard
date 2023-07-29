import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../script/useSessionStorage";
import axios from "../axios";

export const useFetchLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [open, openSnackbar] = useState();
  const navigate = useNavigate();

  return {
    isLoading,
    errMessage,
    open,
    openSnackbar,
    mutate: async (url, data) => {
      setLoading(true);

      try {
        const response = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
        //retreieve token from database
        const accessToken = response?.data.token;
        //save token to local storage
        setUserSession(accessToken);
        navigate("/");
      } catch (error) {
        openSnackbar(true);
        if (!error?.response) {
          setErrMessage("Nessuna risposta dal server");
        } else if (error?.response?.status === 400) {
          setErrMessage("Manca l'Email o la Password");
        } else if (error?.response?.status === 401) {
          setErrMessage("Non autorizzato. Controlla le credenziali");
        } else {
          setErrMessage("Login fallito");
        }
      } finally {
        setLoading(false);
      }
    },
  };
};
