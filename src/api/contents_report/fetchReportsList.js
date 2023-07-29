import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import { getToken } from "../../script/useSessionStorage";
import useSWR from "swr";

const CONTENT_URL = "/staff/contents/reports/";

//fetch list by page
export const useSWRContentListPage = (page, pageSize) => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${CONTENT_URL}?page=${page}&page_size=${pageSize}`,
    fetcher
  );

  const reportsList = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.results;
  }, [data]);

  return { reportsList, loading: isLoading };
};

export const useSWRContReportList = () => {
  const token = getToken();
  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${CONTENT_URL}`, fetcher);

  const reportsCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  const reportsList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results;
  }, [data]);

  return { reportsCount, reportsList, isLoading };
};

export const useContentsReportId = (id) => {
  const [content, setContent] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(`${CONTENT_URL}${id}`, {
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
