import AxiosFactory from "./Axios";

export const electionService = {

  createElection: (idOrg,data) => {
    const api = AxiosFactory("elections");
    return api.post("/"+idOrg, data);
  },

  deleteElection: (id) => {
    const api = AxiosFactory("elections");
    return api.delete("/"+id);
  }
};
