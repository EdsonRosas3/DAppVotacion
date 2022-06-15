const User = require("../models/User");
const Role = require("../models/Role");
const Organization = require("../models/Organization");
const Participant = require("../models/Participant");

const createUser = async (req, res) => {
  try {
    const { name, last_name, username, email, password } = req.body;
    
    const user = await User.create({
      name,
      last_name,
      username,
      email,
      password
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {};

const getOrganizationsByUser = async (req, res) => {
  try {
    const organizations = await User.findByPk(req.params.idUser,{include:Organization});
    return res.status(200).json(organizations);

  } catch (error) {
    return res.status(500).json(error);
  }
};

const userAcceptElection = async (req, res) => {
  try {

    const lastElection = await getLastElection(req.params.idOrganization);
    const participantAccept = await Participant.update(
      { acceptElection: true},
      { where: {userId: req.params.idUser, electionId: lastElection.id}}
    );

    const participantsAccept = await Participant.findAndCountAll({
      where: { electionId: lastElection.id, acceptElection: true },
    });

    const allParticipants = await Participant.findAndCountAll({
      where: { electionId: lastElection.id },
    });
    //revisar si funciona los calculos
    if (participantsAccept.count * allParticipants.count/100 >= 51) {
      const election = await Election.update({statusAccept: true}, {where: {id: lastElection.id}});
    }
    return res.status(200).json(participantAccept,{message: "Usuario acepto la eleccion"});

  } catch (error) {
    return res.status(500).json(error);
  }
};

const userVoteElection = async (req, res) => {
  try {

    const lastElection = await getLastElection(req.params.idOrganization);
    const participantVoted = await Participant.update(
      { voteElection: true},
      { where: {userId: req.params.idUser, electionId: lastElection.id}}
    );

    const participantsVoted = await Participant.findAndCountAll({
      where: { electionId: lastElection.id, voteElection: true },
    });

    const allParticipants = await Participant.findAndCountAll({
      where: { electionId: lastElection.id },
    });

    let participantAbsent = allParticipants.count - participantsVoted.count;
    const election = await Election.update({votesCast: participantsVoted.count, absentVotes: participantAbsent}, {where: {id: lastElection.id}});
    return res.status(200).json(election, participantVoted,{message: "Usuario voto en la eleccion, votos actualizados en eleccion"});

  } catch (error) {
    return res.status(500).json(error);
  }
};

const getLastElection = async (idOrganization) => {
  try {
    const elections = await Election.findAndCountAll({
      where: { organization_id: idOrganization },
    });
    if (elections.count >= 1) {
      let lastElection = elections.rows[elections.count - 1];
      return lastElection;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  getOrganizationsByUser,
  userAcceptElection,
  userVoteElection
}
