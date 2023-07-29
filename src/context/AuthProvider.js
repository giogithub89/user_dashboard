import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserSession, setUserSession } from "../script/useSessionStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  // let updateToken = async () => {
  //   let response = await fetch("https://app.bigbag-web.com/authenticate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${authTokens}`,
  //     },
  //   });

  //   let data = await response.json();

  //   if (response.status === 200) {
  //     const accessToken = data.token;
  //     const userEmail = data.email;
  //     setAuthTokens(accessToken);
  //     setUser(userEmail);
  //     setUserSession(data.email, data.token);
  //   } else {
  //     logoutUser();
  //   }

  //   // if(loading){
  //   //     setLoading(false)
  //   // }
  // };

  //https://www.cluemediator.com/login-app-create-login-form-in-reactjs-using-secure-rest-api
  //check token on refresh page

  // const AUTH_URL = "/authenticate"

  // const response = await axios.get(`AUTH_URL?Token=${token}`).then(response => {
  //   setUserSession(response.data.token, response.data.email);
  // });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
