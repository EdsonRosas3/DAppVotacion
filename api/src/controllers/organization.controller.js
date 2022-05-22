const Organization = require("../models/Organization");
const User = require("../models/User");
const Election= require("../models/Election");

const createOrganization = async (req, res) => {
  try {
    const { name, description, reach } = req.body;
    const organization = await Organization.create({
      name,
      description,
      reach,
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
    
    let i = 0;
    while (i < users.length) {
      const user = await User.findByPk(users[i]);
      organization.addUser(user);
      i++;
    }
    return res.status(201).json({message: "Se agrego correctamente"});

  } catch (error) {
    return res.status(500).json(error);
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
