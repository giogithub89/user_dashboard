import useSWR from "swr";
import { getToken } from "../../script/useSessionStorage";
import { useMemo } from "react";

const COM_INVIT_URL = "/staff/communicator-invitations/";

//fetch list by page
export const useSWRInvitationsListPage = (page, pageSize) => {
  const token = getToken();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Token ${token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_BASE_URL}${COM_INVIT_URL}?page=${page}&page_size=${pageSize}`,
    fetcher
  );

  const invitationsList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results;
  }, [data]);

  const totalRows = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.count;
  }, [data]);

  return { invitationsList, loading: isLoading, totalRows };
};
