import AxiosFactory from "./Axios";

export const electionService = {

  createElection: (idOrg,data) => {
    const api = AxiosFactory("elections");
    return api.post("/"+idOrg, data);
  },

  deleteElection: (id) => {
    const api = AxiosFactory("elections");
    return api.delete("/"+id);
  },

  infoElection: (idOrg) => {
    const api = AxiosFactory("elections");
    return api.get("/exist/"+idOrg);
  },
  
  allCandidates: (idElection) => {
    const api = AxiosFactory("elections");
    return api.get("/"+idElection+"/postulants");
  }
};
