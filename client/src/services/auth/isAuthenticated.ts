import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { ContextAPI } from "../../context/ContextAPI";

type Token = {
  exp: number;
  firstName: string;
  iat: number;
  lastName: string;
  roles: string[];
  username: string;
};

/**
 * Check if the user is authenticated
 * @returns boolean
 */
export const checkIsAuthenticated = (): boolean => {
  const token = window.localStorage.getItem("authToken");
  // console.log("Current User Email :", auth.currentUser?.email);
  // const btn = document.querySelector('.btnLogOut');
  // console.log(btn);
  // console.log("authExp", exp);
  let isAuthenticated = false;
  if (token) {
    // return true;
    let { exp } = jwtDecode<Token>(token); // expiration time in seconds
    // let { exp } = token?.claims;
    let expiration: number = exp * 1000; // convert expiration time to milliseconds
    const nowTime = new Date().getTime(); //now time in milliseconds
    if (expiration > nowTime) {
      // return true;
      isAuthenticated = true;
    }
    // return false;
  }
  // return false;

  return isAuthenticated;
};
