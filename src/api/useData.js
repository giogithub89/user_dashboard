import { useEffect, useState } from "react";
import { getToken } from "../script/useSessionStorage";
import axios from "./axios";

export const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();

      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data?.results;
        const count = response?.data?.count;
        const content = response?.data;
        if (result) {
          setData(result);
          setCount(count);
          setContent(content);
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return { data, loading, count, content };
};

//create general data
export const usePostData = () => {
  const [loading, setLoading] = useState();
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [status, setStatus] = useState();

  return {
    loading,
    message,
    severity,
    open,
    status,
    openSnackbar,
    mutate: async (url, data) => {
      setLoading(true);
      const token = getToken();

      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        //console.log(JSON.stringify(response?.data));
        openSnackbar(true);
        setSeverity("success");
        setMessagge("Contenuto creato con successo");
        console.log(response);

        console.log(response.status);
        setStatus(response.status);
      } catch (err) {
        console.log(err);
        openSnackbar(true);
        setSeverity("error");
        setMessagge("Non è stato possibile creare il contenuto");
      } finally {
        setLoading(false);
      }
    },
  };
};

//edit general data
export const usePutData = () => {
  const [loading, setLoading] = useState();
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [status, setStatus] = useState("");

  return {
    loading,
    message,
    severity,
    open,
    status,
    openSnackbar,
    mutate: async (url, data) => {
      setLoading(true);
      const token = getToken();

      try {
        const response = await axios.put(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          ///console.log(JSON.stringify(response?.data));
          openSnackbar(true);
          setSeverity("success");
          setMessagge("Contenuto modificato con successo");
          setStatus(response.status);
          console.log(response.status);
        }
      } catch (err) {
        console.log(err);
        openSnackbar(true);
        setSeverity("error");
        setMessagge("Non è stato possibile modificare il contenuto");
      } finally {
        setLoading(false);
      }
    },
  };
};

//delete
export const useDeleteData = () => {
  const [loading, setLoading] = useState();
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);

  return {
    open,
    loading,
    message,
    severity,
    openSnackbar,
    mutate: async (url) => {
      setLoading(true);
      const token = getToken();
      try {
        axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        openSnackbar(true);
        setSeverity("success");
        setMessagge("Contenuto eliminato con successo");
      } catch (err) {
        console.log(err);
        openSnackbar(true);
        setSeverity("error");
        setMessagge("Non è stato possibile eliminare il contenuto");
      } finally {
        setLoading(false);
      }
    },
  };
};

//get icons list
export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = getToken();
    const fe = async () => {
      var requestOptions = {
        method: "GET",
        //redirect: "follow",
      };

      const response = await fetch("https://staging.bigbag-web.com/static/fonts/icons-list.json", requestOptions, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const iconsArray = data.icons;
          console.log(data);
          setData(iconsArray); // The "icons" array
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fe();
  });

  return { data };
};

export const useGetIcons = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, {
          headers: {},
        });
        const result = response?.data.icons;

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
