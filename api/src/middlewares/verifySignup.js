const User = require("../models/User");


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const {username,email} = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user)
      return res.status(400).json({ message: "El nombre de usuario ya existe" });
    const e = await User.findOne({ where: { email: email } });
    if (e)
      return res.status(400).json({ message: "El email ya esta registrado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  next();
};

const checkRolesExisted = (req, res, next) => {
  /* if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  } */

  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };
