import { useEffect, useMemo, useState } from "react";
import { getToken } from "../../script/useSessionStorage";
import axios from "../axios";
import useSWR from "swr";

const CONTENT_URL = "/staff/contents";

export const useSWRTotSponsCont = () => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${CONTENT_URL}/sponsor-contents/`,
    fetcher
  );
  const sponsorContCount = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.count;
  }, [data]);

  return { sponsorContCount, isLoading };
};

export const useSponsorContentId = (id) => {
  const [content, setContent] = useState([]);
  //const [bag, setBag] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${CONTENT_URL}/sponsor-contents/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data;
        if (result) {
          setContent(result);
          setLoading(false);
          setTitle(result.title);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, content, title };
};

export const useFetchSponsorCntList = () => {
  const [sponsorContList, setContentList] = useState([]);
  const [totalRows, setCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${CONTENT_URL}/sponsor-contents/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data.results;
        const count = response?.data.count;

        if (result) {
          setContentList(result);
          setCount(count);
          setLoading(false);
          console.log(" sponsor", result);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, sponsorContList, totalRows };
};

export const usePostSPContent = () => {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [loading, setLoading] = useState();
  const [onSuccess, setOnSuccess] = useState(false);

  return {
    message,
    loading,
    severity,
    open,
    onSuccess,

    openSnackbar,
    mutate: async (data, contentType, contentText, files) => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.post(`${CONTENT_URL}/sponsor-contents/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        openSnackbar(true);
        setMessagge("Dati caricamento in corso...");
        setSeverity("info");
        const result = JSON.stringify(response.data?.id);

        if (contentType === "text") {
          try {
            await postContentText(result, contentType, contentText);
            openSnackbar(true);
            setMessagge("Contenuto creato con successo.");
            setSeverity("success");
          } catch (err) {
            openSnackbar(true);
            setSeverity("error");
            setMessagge("Errore durante il caricamento del testo");
          }
        } else {
          try {
            await postContentMedia(result, contentType, files);
            openSnackbar(true);
            setMessagge("Contenuto creato con successo.");
            setSeverity("success");
          } catch (err) {
            console.log("error postContentMedia", err);
            openSnackbar(true);
            setSeverity("error");
            setMessagge("Formato dei media errato");
          }
        }
      } catch (err) {
        openSnackbar(true);
        setSeverity("error");
        if (err?.response?.status === 400) {
          console.log(err.response);
          setMessagge("Non è stato possibile creare il contenuto");
        } else {
          console.log(err?.response);
          setMessagge("Errore di connessione al server");
        }
      } finally {
        setLoading(false);
      }
    },
  };
};

export function postContentText(content_id, media_type, contentText) {
  const token = getToken();

  return axios.post(`${CONTENT_URL}/${content_id}/media/${media_type}`, JSON.stringify({ text: contentText }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
}

export function postContentMedia(content_id, media_type, files) {
  const token = getToken();
  // for (var pair of files.entries()) {
  //   console.log("pair", pair);
  // }

  return axios
    .post(`${CONTENT_URL}/${content_id}/media/${media_type}`, files, {
      headers: {
        //"Content-Type": ` ${mime}`,
        "Content-Type": `multipart/form-data; `,
        //"Content-Disposition": `attachement; filename=${filename}`,
        Authorization: `Token ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
