import { useEffect, useState } from "react";
import { getToken } from "../../script/useSessionStorage";
import axios from "../axios";

const USER_URL = "/staff/users/";

export const useFetchUserId = (id) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      console.log("fetch users");
      try {
        const response = await axios.get(`${USER_URL}${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const result = response?.data;
        if (result) {
          setUser(result);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { user, loading };
};

export const usePostUser = (id) => {
  const [loading, setLoading] = useState();

  //setLoading(true);
  const token = getToken();
  try {
    axios.post(`${USER_URL}${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: {
        name: "Prova",
        id: "514",
        icon: null,
      },
    });
  } catch (err) {
    console.log(err);
    //setLoading(false);
  }
};

export const useDeleteUser = (id) => {
  const [loading, setLoading] = useState();

  //setLoading(true);
  const token = getToken();
  try {
    axios.delete(`${USER_URL}${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
    //setLoading(false);
  }
};
