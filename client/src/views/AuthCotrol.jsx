import React from 'react';
import Dashboard from './Main';
import Cookies from "js-cookie";

const AuthControl = () => {
  
  const token = Cookies.get('AUTH_TOKEN');
  const user = Cookies.get('AUTH_USER');
  
  return token&&user?<Dashboard/>:window.location.replace("/signin");
}

export default AuthControl