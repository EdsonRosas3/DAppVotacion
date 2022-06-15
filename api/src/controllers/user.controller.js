const User = require("../models/User");
const Role = require("../models/Role");
const Organization = require("../models/Organization");
const Participant = require("../models/Participant");
const Election = require("../models/Election");
const { getLastElection } = require("../utils");

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
    const {idOrganization} = req.params;

    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const getUsersWithoutOrganization = async (req, res) => {
  try {
    const {idOrganization} = req.params;
    const users = await User.findAll({include:Organization});
    const usersWithoutOrganization = users.filter(user => {
      if(user.organizations.length === 0){
        return user;
      }else{
        
      }
    });
    return res.status(200).json(usersWithoutOrganization);
  } catch (error) {
    return res.status(500).json(error);
  }
}
    

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
    if (participantsAccept.count *100 /allParticipants.count>= 51) {
      console.log("PORCENTAJE: ",participantsAccept.count *100 /allParticipants.count);
      const election = await Election.update({statusAccept: true}, {where: {id: lastElection.id}});
    }
    //return res.status(200).json(participantAccept,{message: "Usuario acepto la eleccion"});
    return res.status(200).json({message: "Usuario acepto la eleccion"});

  } catch (error) {
    return res.status(500).json(error);
  }
};
const verifyUserAcceptElection = async (req, res) => {
  try {

    const lastElection = await getLastElection(req.params.idOrganization);
    const participant = await Participant.findOne({where: {userId: req.params.idUser, electionId: lastElection.id}});

    if(participant.acceptElection){
      return res.status(200).json({status:true,message: "Usted acepto la eleccion"});
    }else{
      return res.status(200).json({status:false,message: "Acepte la eleccion!"});
    }

  } catch (error) {
    return res.status(500).json(error);
  }
};

const userVoteElection = async (req, res) => {
  try {

    const lastElection = await getLastElection(req.params.idOrganization);
    if(lastElection.status === "VOTACION"){
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
      return res.status(200).json(election, {message: "Usuario voto en la eleccion, votos actualizados en eleccion"});  
    }
    else{
      return res.status(200).json({message: "No es dia de votacion"});
    }

    
  } catch (error) {
    return res.status(500).json(error);
  }
};
const verifyUserVoteElection = async (req, res) => {
  try {
    const lastElection = await getLastElection(req.params.idOrganization);
    if(lastElection.status === "VOTACION"){
      const participant = await Participant.findOne({where: {userId: req.params.idUser, electionId: lastElection.id}});

      if(participant.voteElection){
        return res.status(200).json({status:true,message: "Usted voto en la eleccion"});
      }else{
        return res.status(200).json({status:false,message: "Vota ahora en la eleccion!"});
      }
    }
    else{
      return res.status(200).json({message: "No es dia de votacion"});
    }

    
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createUser,
  getUsers,
  getOrganizationsByUser,
  userAcceptElection,
  verifyUserAcceptElection,
  userVoteElection,
  verifyUserVoteElection,
  getUsersWithoutOrganization
};
