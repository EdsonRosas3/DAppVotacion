import React from 'react';
import Dashboard from './Dashboard';


const AuthControl = () => {
    const token = true;
  
  return token?<Dashboard/>:window.location.replace("/login");
}

export default AuthControl