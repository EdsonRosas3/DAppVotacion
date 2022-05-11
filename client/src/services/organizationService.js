import AxiosFactory from "./Axios";

export const organizationService = {
  
  getUsers: (idOrg) => {   
    const api = AxiosFactory("organizations");
    return api.get("/"+idOrg+"/users");
  },
  
  addOrganization: (idUser,data) => {
    const api = AxiosFactory("organizations");
    return api.post("/"+idUser, data);
  },

  deleteOrganization: (id) => {
    const api = AxiosFactory("organizations");
    return api.delete("/"+id);
  }
};
