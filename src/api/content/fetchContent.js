import { useState } from "react";
import { getToken } from "../../script/useSessionStorage";
import axios from "../axios";

const CONTENT_URL = "/staff/contents";

export const usePostContent = () => {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [loading, setLoading] = useState();
  const [onSuccess, setOnSuccess] = useState(false);
  const [contentId, setContId] = useState();

  return {
    message,
    loading,
    severity,
    open,
    onSuccess,
    contentId,
    openSnackbar,
    mutate: async (data, contentType, contentText, files, mime, filename) => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.post(`${CONTENT_URL}/bag-contents/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        openSnackbar(true);

        setMessagge("Dati caricamento in corso...");
        setSeverity("info");
        const result = JSON.stringify(response.data?.id);
        setContId(result);

        if (contentType === "text") {
          try {
            await postContentText(result, contentType, contentText);
            openSnackbar(true);
            setMessagge("Contenuto creato con successo.");
            setSeverity("success");
          } catch (err) {
            //console.log("error postContentText", err);
            openSnackbar(true);
            setSeverity("error");
            setMessagge("Errore durante il caricamento del testo");
          }
        } else {
          try {
            await postContentMedia(result, contentType, files, mime, filename);
            openSnackbar(true);
            setMessagge("Contenuto creato con successo.");
            setSeverity("success");
          } catch (err) {
            //console.log("error postContentMedia", err);
            openSnackbar(true);
            setSeverity("error");
            setMessagge("Formato dei media errato");
          }
        }
      } catch (err) {
        openSnackbar(true);
        setSeverity("error");
        if (err?.response?.status === 400) {
          console.log(err.response.data);
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

export function postContentMedia(content_id, media_type, files, mime, filename) {
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
      //handle success
      //console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
