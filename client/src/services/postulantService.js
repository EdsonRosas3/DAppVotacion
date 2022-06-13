import AxiosFactory from "./Axios";

export const postulantService = {

  addPostulation: (idElection,idUser,data) => {
    const api = AxiosFactory("postulants");
    return api.post("/"+idElection+"/"+idUser, data);
  },

  isCandidate: (idElection,idUser) => {
    const api = AxiosFactory("elections");
    return api.get("/"+idElection+"/users/"+idUser+"/iscandidate");
  },

  allPostulantsResult: (idElection) => {
    const api = AxiosFactory("elections");
    return api.get("/"+idElection+"/postulants");
  }

};
