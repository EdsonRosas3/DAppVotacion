import AxiosFactory from "./Axios";

export const organizationService = {
  
  getOrganizations: (idUser) => {   
    const api = AxiosFactory("organizations");
    return api.get("/"+idUser);
  },
  
  addOrganization: (data,idUser) => {
    const api = AxiosFactory("organizations");
    return api.post("/"+idUser, data);
  },

  deleteOrganization: (id) => {
    const api = AxiosFactory("organizations");
    return api.delete("/"+id);
  }
};
