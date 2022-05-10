const User = require("../models/User");
const Role = require("../models/Role");

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

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    
  }
};



const getUser = async (req, res) => {};

module.exports = {
  createUser,
  getUsers,
  getUser
}
