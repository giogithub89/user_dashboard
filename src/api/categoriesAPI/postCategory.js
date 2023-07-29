import { getToken } from "../../script/useSessionStorage";
import axios from "../axios";

export function postCategory(categoryName, id) {
  //setLoading(true);
  const data = { name: categoryName, area_id: id };
  const token = getToken();
  try {
    axios.post(`/staff/areas/${id}/categories/`, data, {
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
