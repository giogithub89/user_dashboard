import { useEffect, useMemo, useState } from "react";
import { getToken } from "../../script/useSessionStorage";
import axios from "../axios";
import useSWR from "swr";

const USER_URL = "/staff/users/";

// export const useFetchUsersList = () => {
//   const [usersList, setUsersList] = useState([]);
//   const [divList, setDivList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sponsorList, setSponsorList] = useState([]);
//   const [userCount, setTotalNumUser] = useState();

//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       const token = getToken();
//       try {
//         const response = await axios.get(`${USER_URL}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });
//         console.log("useFetchUsersList");

//         const result = response?.data.results;
//         const count = response?.data.count;
//         if (count) {
//           setTotalNumUser(count);
//         }
//         if (result) {
//           setUsersList(result);
//           // console.log(result);
//           const communicatorUser = result.filter((user) => user.type === "communicator");
//           setDivList(communicatorUser);
//           const sponsorUser = result.filter((user) => user.type === "business");
//           setSponsorList(sponsorUser);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   return { usersList, loading, divList, sponsorList, userCount };
// };

export const useSWRUsersListPage = (page, pageSize) => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${USER_URL}?page=${page}&page_size=${pageSize}&ordering=-date_joined`,
    fetcher
  );

  const userCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  const usersList = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.results;
  }, [data]);

  return { usersList, userCount, isLoading };
};

export const useFetchUsersList = () => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${USER_URL}`, fetcher);

  const divList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results.filter((user) => user.type === "communicator");
  }, [data]);

  const sponsorList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results.filter((user) => user.type === "business");
  }, [data]);

  const userCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  const usersList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results;
  }, [data]);

  return { usersList, userCount, divList, sponsorList, loading: isLoading };
};

export const useFetchDivList = () => {
  const token = getToken();
  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${USER_URL}?type=communicator`, fetcher);

  const divListCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  const divList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results;
  }, [data]);

  return { divListCount, divList, loading: isLoading };
};

export const useFetchSponsorList = () => {
  const token = getToken();
  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}${USER_URL}?type=business`, fetcher);

  const sponsorListCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  return { sponsorListCount, loading: isLoading };
};
