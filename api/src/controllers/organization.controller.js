const Organization = require("../models/Organization");
const User = require("../models/User");

const createOrganization = async (req, res) => {
  try {
    const { name, reach } = req.body;
    
    const organization = await Organization.create({
      name,
      reach,
    });

    const user = await User.findByPk(req.params.idUser);

    organization.addUser(user);

    return res.status(200).json(organization);
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

module.exports = {
  createOrganization,
  getOrganizations,
  getUser
}
