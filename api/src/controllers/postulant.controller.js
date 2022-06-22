const User = require("../models/User");
const Election= require("../models/Election");
const Postulant = require("../models/Postulant");

const addCandidateToElection = async (req, res) => {
  try {
    const{ idElection, idUser} = req.params;
    const { nameFront, description} = req.body;

    const postulant = await Postulant.create({
      electionId:idElection,
      userId:idUser,
      nameFront,
      description,
      votesReceived:0,
    });

    return res.status(201).json({message: "Se agrego correctamente al candidato"});

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const userIsCandidate = async (req, res) => {
  try {
    const{ idElection, idUser} = req.params;
    const postulant = await Postulant.findOne({
      where:{electionId:idElection,
        userId:idUser}
    });
    if(postulant){
      return res.status(200).json({candidate:true, message: "Usted es candidato"});
    }
    return res.status(200).json({candidate:false, message: "Usted no es candidato"});
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateVotes = async (req, res) => {
  try {
    const {idElection} = req.params;
    const {users} = req.body;

    let i = 0;
    while (i < users.length) {
      let idu = users[i].idUser;
      let votes = users[i].votes;
      const postulante = await Postulant.update({
        votesReceived: votes,
      },
      { where: {
            userId: idu,
            electionId:idElection,
      }});
      i++;
    }

    return res.status(201).json({message: "Se actualizo los votos"});

  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
    addCandidateToElection,
    userIsCandidate,
    updateVotes
}
