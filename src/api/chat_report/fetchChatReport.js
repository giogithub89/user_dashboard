import { useEffect, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";

const CHAT_URL = "/staff/chats/reports/";

export const useFetchChatReport = () => {
  const [chatsList, setChatsList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${CHAT_URL}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data?.results;
        if (result) {
          setChatsList(result);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, chatsList };
};
