import axios from "axios";

export default axios.create({
  //baseURL: process.env.REACT_APP_STAGING_URL,
  baseURL: process.env.REACT_APP_BASE_URL,
});
