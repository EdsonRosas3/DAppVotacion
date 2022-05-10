import React from 'react';
import Dashboard from './Main';
import Cookies from "js-cookie";

const AuthControl = () => {
  const token = Cookies.get('AUTH_TOKEN');  
  return token?<Dashboard/>:window.location.replace("/login");
}

export default AuthControl