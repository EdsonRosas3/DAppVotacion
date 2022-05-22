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
    });

    return res.status(201).json({message: "Se agrego correctamente al candidato"});

  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
    addCandidateToElection,
}
