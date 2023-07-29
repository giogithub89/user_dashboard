import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";
import useSWR from "swr";

const URL = "/staff/account/";
const UPDATE_PSWD_URL = "/staff/account/password/";

export const useFetchAccount = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const token = getToken();
      setLoading(true);
      console.log("fetch account");
      try {
        const response = await axios.get(`${URL}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data;
        if (result) {
          setData(result);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading };
};

export const useSWRFetchAccount = () => {
  const token = getToken();

  const parameters = {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  };

  const fetcher = (url) =>
    fetch(url, { headers: { Authorization: `Token ${token}` } })
      .then((res) => res.json())
      .finally(() => console.log("fetch call"));

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${URL}`, fetcher);

  const userData = useMemo(() => {
    if (!data) {
      return [];
    }
    console.log("fetch account");
    return data;
  }, [data]);

  return { userData, isLoading };
};

export const useEditPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [open, setOpenSnackbar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState();

  return {
    loading,
    message,
    open,
    openAlert,
    severity,
    setOpenSnackbar,
    setOpenAlert,
    mutate: async (data) => {
      const token = getToken();
      try {
        const response = await axios.post(UPDATE_PSWD_URL, data, {
          headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
        });
        // if (response.status === 201) {
        // }
        setOpenAlert(true);
        console.log("password reset successfuly");
        console.log(JSON.stringify(response?.data));
        setOpenSnackbar(true);
        setSeverity("success");
        setMessage("Password salvata correttamente");
      } catch (error) {
        setOpenSnackbar(true);
        setSeverity("error");
        console.log(error);
        if (!error?.response) {
          setMessage("Nessuna risposta dal server");
        } else if (error?.response.status === 400) {
          setMessage("Password non valida.");
        } else if (error?.response.status === 401) {
          setMessage("Controlla le credenziali.");
        } else {
          setMessage("Non è stato possibile salvare la nuova password.");
        }
      } finally {
        setLoading(false);
      }
    },
  };
};

export const useEditAccount = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [open, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState();

  return {
    loading,
    message,
    open,
    severity,
    setOpenSnackbar,
    mutate: async (data) => {
      console.log(data);
      const token = getToken();
      setLoading(true);
      try {
        const response = await axios.put(URL, data, {
          headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
        });
        // if (response.status === 201) {
        // }

        console.log("Modifiche salvate con successo");
        console.log(JSON.stringify(response?.data));
        setOpenSnackbar(true);
        setSeverity("success");
        setMessage("Modifiche salvate con successo");
      } catch (error) {
        setOpenSnackbar(true);
        setSeverity("error");
        console.log(error);
        if (!error?.response) {
          setMessage("Nessuna risposta dal server");
        } else if (error?.response.status === 400) {
          setMessage("Modifiche non salvate");
        } else if (error?.response.status === 401) {
          setMessage("Controlla i dati.");
        } else {
          setMessage("Non è stato possibile salvare le modifiche.");
        }
      } finally {
        setLoading(false);
      }
    },
  };
};
