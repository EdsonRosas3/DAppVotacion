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
  },
  
  voteNow: (idElection,idCandidate) => {
    const api = AxiosFactory("elections");
    return api.post("/"+idElection+"/vote",{idCandidate});
  },

  userAcceptElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.put("/"+idUser+"/acceptElection/"+idOrganization);
  },
  userVoteElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.put("/"+idUser+"/voteElection/"+idOrganization);
  },

  verifyUserAcceptElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/acceptElection/"+idOrganization);
  },
  verifyUserVoteElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/voteElection/"+idOrganization);
  }
};
