import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";
import useSWR from "swr";

const CONTENT_URL = "/staff/contents/bag-contents";

export const AREAS_URL = "/staff/areas/";

export const useSWRFetchContentCount = () => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${CONTENT_URL}`, fetcher);

  const contentsCount = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.count;
  }, [data]);

  return { contentsCount, isLoading };
};

export const useSWRFetchContent = (page, pageSize) => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${CONTENT_URL}/?page=${page}&page_size=${pageSize}&ordering=-created_at`,
    fetcher
  );

  const contentsList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results;
  }, [data]);

  const totalRows = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.count;
  }, [data]);

  return { contentsList, isLoading, totalRows };
};

// export const useFetchContentList = (page, pageSize) => {
//   const [contentList, setContentList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState();

//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       const token = getToken();
//       try {
//         const response = await axios.get(`${CONTENT_URL}/?page=${page}&page_size=${pageSize}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });
//         const result = response?.data.results;
//         const count = response?.data.count;

//         if (result) {
//           setContentList(result);
//           setTotalRows(count);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [page, pageSize]);

//   return { loading, contentList, totalRows };
// };

export const useBagContentId = (id) => {
  const [content, setContent] = useState([]);
  //const [bag, setBag] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${CONTENT_URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const result = response?.data;
        if (result) {
          setContent(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, content };
};
