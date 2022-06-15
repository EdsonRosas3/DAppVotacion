const Organization = require("../models/Organization");
const User = require("../models/User");
const Election= require("../models/Election");
const { getLastElection } = require("../utils");
const Participant = require("../models/Participant");

const createOrganization = async (req, res) => {
  try {
    const { name, description, reach, type, creatorUserId } = req.body;
    const organization = await Organization.create({
      name,
      description,
      reach,
      type,
      creatorUserId,
    });

    const user = await User.findByPk(req.params.idUser);
    organization.addUser(user);
    return res.status(201).json(organization);

  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    return res.status(200).json(organizations);
  } catch (error) {
    
  }
};

const getUser = async (req, res) => {};

const addUsersToOrganization = async (req, res) => {
  try {
    const { users } = req.body;
    const organization = await Organization.findByPk(req.params.idOrganization);
    const lastElection = await getLastElection(req.params.idOrganization);
    
    let i = 0;
    while (i < users.length) {
      const user = await User.findByPk(users[i]);
      organization.addUser(user);
      let participant = await Participant.create({userId:user.id, electionId:lastElection.id});
      i++;
    }

    return res.status(201).json({message: "Se agrego correctamente"});

  } catch (error) {
    return res.status(500).json({message: "Error al agregar usuarios"});
  }
};

const getUsersByOrganization = async (req, res) => {
  try {
    const users = await Organization.findByPk(req.params.idOrganization,{include:User});
    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getUser,
  addUsersToOrganization,
  getUsersByOrganization
}
