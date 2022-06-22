import AxiosFactory from "./Axios";

export const userService = {
  
  getOrganizations: (idUser) => {   
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/organizations");
  },
  getUsers: (idOrganization) => {
    const api = AxiosFactory("users");
    return api.get("/organizations/"+idOrganization);
  },
  getUsersDiferent: (idOrganization) => {
    const api = AxiosFactory("organizations");
    return api.get("/"+idOrganization+"/notusers");
  }
};