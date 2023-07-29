import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";
import useSWR from "swr";

const CATEG_URL = "/staff/categories";
const AREAS_URL = "/staff/areas/";

//fetch tot categories count analytics
export const useSWRFetchTotCat = () => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${CATEG_URL}`,
    fetcher
    //  {
    //   revalidateOnFocus: 30000, // revalidate after 30 seconds of focus
    //   revalidateOnReconnect: 30000, // revalidate after 30 seconds of reconnection
    // }
  );
  const catCount = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.count;
  }, [data]);

  return { catCount, isLoading };
};

export const useFetchCategories = (url, areaId) => {
  const [catLength, setCatLength] = useState("");
  const [catList, setCatList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${url}${areaId}/categories`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const result = response?.data.results;

        if (result) {
          setCatList(result);
          setCatLength(result.length);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [url, areaId]);

  return { loading, catList, catLength };
};

//PUT category

export function putCategory(categoryName, areaId, catId) {
  //setLoading(true);
  const data = { name: categoryName, area_id: areaId };
  const token = getToken();
  try {
    axios.put(`/staff/areas/${areaId}/categories/${catId}/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (err) {
    if (err?.response?.status === 400) {
      console.log("Inserisci un nome");
    } else {
      console.log(err);
    }
  }
}

export const usePutCategory = () => {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [fetching, setFetching] = useState();

  const clearForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return {
    message,
    fetching,
    severity,
    open,
    openSnackbar,
    mutate: async (categoryName, iconId, areaId, catId) => {
      setFetching(true);
      const data = { name: categoryName, icon: iconId, area_id: areaId };
      const token = getToken();
      console.log("data", data);
      try {
        const response = await axios.put(`staff/categories/${catId}/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        openSnackbar(true);
        setMessagge("Categoria salvata con successo.");
        setSeverity("success");
        clearForm();
      } catch (err) {
        openSnackbar(true);
        setSeverity("error");
        if (err?.response?.status === 400) {
          console.log(err);
          setMessagge("Inserisci un nome");
        } else {
          console.log(err);
          setMessagge("Errore di connessione al server");
        }
      } finally {
        setFetching(false);
      }
    },
  };
};

//__________
//POST
export const usePostCategory = () => {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [fetching, setFetching] = useState();

  return {
    message,
    fetching,
    severity,
    open,
    openSnackbar,
    mutate: async (categoryName, areaId, iconId) => {
      setFetching(true);
      const data = { name: categoryName, area_id: areaId, icon: iconId };
      const token = getToken();
      try {
        const response = await axios.post(`${AREAS_URL}${areaId}/categories/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 201) {
          openSnackbar(true);
          setMessagge("Categoria salvata con successo.");
          setSeverity("success");
        }
      } catch (err) {
        openSnackbar(true);
        setSeverity("error");
        if (err?.response?.status === 400) {
          console.log(err);
          setMessagge("Inserisci un nome");
        } else {
          console.log(err);
          setMessagge("Errore di connessione al server");
        }
      } finally {
        setFetching(false);
      }
    },
  };
};

//delete
export const useDeleteCategory = (areaId, categoryId) => {
  const [loading, setLoading] = useState();

  //setLoading(true);
  const token = getToken();
  try {
    axios.delete(`/staff/areas/${areaId}/categories/${categoryId}/`, {
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

//get categories number
export const useGetTotCateg = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();

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
        if (result) {
          setData(result);
          setCount(count);
          console.log("categories");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return { data, loading, count };
};
