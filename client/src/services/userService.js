import AxiosFactory from "./Axios";

export const userService = {
  
  getOrganizations: (idUser) => {   
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/organizations");
  },
  getUsers: () => {
    const api = AxiosFactory("users");
    return api.get("/");
  }
};