import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";
import useSWR from "swr";

export const AREAS_URL = "/staff/areas/";
const BAG_URL = "/staff/bags";

// export const useFetchBag = () => {
//   const [bagList, setBagList] = useState([]);
//   const [bagLength, setBagLength] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   return {
//     bagList,
//     bagLength,
//     mutate: async (id, catID) => {
//       console.log("fetch bags");
//       const token = getToken();
//       try {
//         const response = await axios.get(`${AREAS_URL}${id}/categories/${catID}/bags`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });
//         const results = response?.data;
//         setBagList(results.results);
//         setBagLength(results.count);
//         console.log(results.count);
//       } catch (err) {
//         if (err?.response?.status === 400) {
//           console.log("Inserisci un nome");
//         } else {
//           console.log(err);
//         }
//       }
//     },
//   };
// };

//tot bag count for analytics
export const useSWRFetchTotBag = () => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${BAG_URL}`, fetcher);

  const bagsCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  return { bagsCount, isLoading };
};

export const useFetchBag = (id, catID) => {
  const [bagList, setBagList] = useState([]);
  const [bagLength, setBagLength] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();

      try {
        const response = await axios.get(`${AREAS_URL}${id}/categories/${catID}/bags`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data.results;
        if (result) {
          setBagList(result);
          setBagLength(result.length);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    // return () => {

    // }
  }, [id, catID]);

  return { isLoading, bagList, bagLength };
};

// export const useFetchTotalBag = () => {
//   const [totalCount, setTotalCount] = useState([]);
//   const [totalBags, setTotalBags] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalIcons, setIcons] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       const token = getToken();
//       try {
//         const response = await axios.get(`/staff/bags?page=${1}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });
//         const result = response?.data;
//         const totalCount = result?.count;
//         const totalBags = response?.data.results;

//         if (result) {
//           setTotalCount(totalCount);
//           setTotalBags(totalBags);

//           setIcons(totalBags);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   //call second and third page icon dialog
//   const mutate = async (page) => {
//     setLoading(true);
//     const token = getToken();
//     try {
//       const response = await axios.get(`/staff/bags?page=${page}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//       });
//       const result = response?.data;

//       const totalBags = response?.data.results;
//       if (result) {
//         setIcons(totalBags);
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, totalBags, totalCount, totalIcons, mutate };
// };

//call all icon names for create content dropdown
export function useTotalBagName() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalBags, setTotalBags] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      if (nextPage !== null) {
        try {
          const response = await axios.get(`/staff/bags?page=${page}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
          const result = response?.data;
          const totalBags = response?.data.results;
          const nextPage = response?.data.next;
          setNextPage(nextPage);

          setTotalBags(totalBags);
          setOptions((prevOptions) => [...prevOptions, ...totalBags]);
          console.log(nextPage);
          setPage((prevPage) => prevPage + 1);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetch();
  }, [page]);
  return { loading, totalBags, options };
}

//EDIT bag
export function useEditBag() {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return {
    message,
    severity,
    open,
    loading,
    openSnackbar,
    mutate: async (bagName, iconId, catId, bagId) => {
      setLoading(true);
      const data = { name: bagName, category_id: catId, icon: iconId };
      const token = getToken();
      try {
        axios.put(`${BAG_URL}/${bagId}/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        openSnackbar(true);
        setMessagge("Modifiche salvate con successo.");
        setSeverity("success");
        setLoading(false);
        clearForm();
      } catch (err) {
        setSeverity("error");
        openSnackbar(true);
        setLoading(false);
        if (err?.response?.status === 400) {
          console.log("Inserisci un nome");

          setMessagge("Controlla tutti i campi");
        } else {
          console.log(err);
          setMessagge("Errore di connessione al server");
        }
      }
    },
  };
}

//PARTIAL EDIT bag

export function usePatchBag() {
  const [message, setMessagge] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, openSnackbar] = useState(false);

  return {
    message,
    severity,
    open,
    openSnackbar,
    mutate: async (bagName, id, iconId, catId, bagId) => {
      //setLoading(true);
      const data = { name: bagName, category_id: catId, icon: iconId };
      const token = getToken();
      try {
        axios.patch(`${BAG_URL}/${bagId}/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        openSnackbar(true);
        setMessagge("Modifiche salvate con successo.");
        setSeverity("success");
      } catch (err) {
        setSeverity("error");
        openSnackbar(true);
        if (err?.response?.status === 400) {
          console.log("Inserisci un nome");
          setMessagge("Controlla tutti i campi");
        } else {
          console.log(err);
          setMessagge("Errore di connessione al server");
        }
      } finally {
        openSnackbar(false);
      }
    },
  };
}

//__________
//POST

export const usePostBag = () => {
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
    mutate: async (bagName, id, iconId, catId) => {
      setFetching(true);
      const data = { name: bagName, area_id: id, icon: iconId, category_id: catId };
      const token = getToken();
      try {
        const response = await axios.post(`${AREAS_URL}${id}/categories/${catId}/bags/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 201) {
          openSnackbar(true);
          setMessagge("Bag salvata con successo.");
          setSeverity("success");
        }
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
