import React, { useReducer, useState } from "react";
import AxiosFactory from "../../services/Axios";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import Cookies from "js-cookie";

import { LOGIN, LOGOUT } from "../types";

const UserState = (props) => {
  const initialState = {
    token: "",
    user: {
      username:""
    },
  };
  const [message, setMessage] = useState("");
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [auth, setAuth] = useState(false);

  const updateDataAuth = () => {
    const data= {
      user: JSON.parse(Cookies.get("AUTH_USER")),
      token: Cookies.get("AUTH_TOKEN"),
    }
    dispatch({ type: LOGIN, payload:data  });
    setAuth(true);
  };

  const signin = async (userAcces) => {
    const api = AxiosFactory("auth");
    try {
      const res = await api.post("/signin",userAcces)
      if(res.status === 200){
        setMessage("")
        setAuth(true)
        Cookies.set("AUTH_TOKEN", res.data.token);
        Cookies.set("AUTH_USER", JSON.stringify(res.data.user));
        dispatch({type:LOGIN,payload:res.data})
        return true;
      }
    } catch (error) {
      if(error.response){
        setMessage(error.response.data.message)
      }
      return false;
    }
  };

  const signup = async (user) => {
    const api = AxiosFactory("auth");
    try {
      const res = await api.post("/signup",user)
      if(res.status === 201){
        setMessage("")
        setAuth(true)
        Cookies.set("AUTH_TOKEN", res.data.token);
        Cookies.set("AUTH_USER", JSON.stringify(res.data.user));
        dispatch({type:LOGIN,payload:res.data})
        return true;
      }
    } catch (error) {
      if(error.response){
        setMessage(error.response.data.message)
      }
      return false;
    }
  };

  const logout = () => {
    const data = {
      toke: "",
      user: {
        nombres: "",
        rol: "",
      },
    };
    setAuth(false);
    Cookies.remove('AUTH_TOKEN');
    dispatch({ type: LOGOUT, payload: data });
  };

  return (
    <UserContext.Provider
      value={{
        userAll: state,
        user: state.user.user,
        token: state.token,
        auth,
        setAuth,
        message,
        setMessage,
        signin,
        signup,
        logout,
        updateDataAuth,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
