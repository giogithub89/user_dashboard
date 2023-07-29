// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem("userEmail");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userEmail", JSON.stringify(user));
};

// import { useState, useEffect } from 'react';

// function getSessionStorageOrDefault(key, defaultValue) {
//   const stored = sessionStorage.getItem(key);
//   if (!stored) {
//     return defaultValue;
//   }
//   return JSON.parse(stored);
// }

// export function useSessionStorage(key, defaultValue) {
//   const [value, setValue] = useState(
//     getSessionStorageOrDefault(key, defaultValue)
//   );

//   useEffect(() => {
//     sessionStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }

//App.js
// const [termsAccepted, setTermsAccepted] = useSessionStorage('terms', false);

//______________________________
