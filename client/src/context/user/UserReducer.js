import { REGISTER, LOGIN,LOGIN_ID, LOGOUT } from "../types";
const userReducerAux= (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGIN_ID:
      return {
        ...state,
        user: payload,
      };
    case REGISTER:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user:payload
      }
    default:
      return state;
  }
};
export default userReducerAux;