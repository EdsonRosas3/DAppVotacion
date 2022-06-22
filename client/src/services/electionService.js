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
  
  allCandidates: (idOganization) => {
    const api = AxiosFactory("elections");
    return api.get("/"+idOganization+"/postulants");
  },
  
  userAcceptElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.put("/"+idUser+"/acceptElection/"+idOrganization);
  },
  verifyUserAcceptElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/acceptElection/"+idOrganization);
  },


  verifyUserVoteElection: (idUser,idOrganization) => {
    const api = AxiosFactory("users");
    return api.get("/"+idUser+"/voteElection/"+idOrganization);
  },
  userVoteElection: (idUser,idOrganization,idCandidato) => {
    const api = AxiosFactory("users");
    return api.put("/"+idUser+"/voteElection/"+idOrganization+"/candidato/"+idCandidato);
  },
};
