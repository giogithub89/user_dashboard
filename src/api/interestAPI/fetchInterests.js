import { useEffect, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";

const useFetchInterests = (url) => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [pkId, setId] = useState();

  const colors = [
    "#14a627",
    "#cf581d",
    "#fae505",
    "#104bc9",
    "#852466",
    "#5e14cc",
    "#320c63",
    "#ffc300",
    "#76d1f5",
    "#e80953",
    "#ff7700",
    "#248531",
    "#1d9ccf",
    "#db1212",
    "#45d17d",
  ];

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
        setLoading(false);
        const result = response?.data.results;
        if (result) {
          setCards(
            result.map((el, index) => ({
              ...el,
              color: colors[index],
            }))
          );
          setId(result[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [url]);

  return { loading, cards, pkId };
};

export default useFetchInterests;
