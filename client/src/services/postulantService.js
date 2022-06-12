import AxiosFactory from "./Axios";

export const postulantService = {

  addPostulation: (idElection,idUser,data) => {
    const api = AxiosFactory("postulants");
    return api.post("/"+idElection+"/"+idUser, data);
  },

  isCandidate: (idElection,idUser) => {
    const api = AxiosFactory("postulants");
    return api.get("/iscandidate/"+idElection+"/"+idUser);
  },

  allPostulantsResult: (idElection) => {
    const api = AxiosFactory("elections");
    return api.get("/"+idElection+"/postulants");
  }

};
