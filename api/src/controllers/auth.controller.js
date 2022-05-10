const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { encryptPassword, comparePassword } = require("../utils");

const signUp = async (req, res) => {
  try {
    const { name, last_name, username, email, password } = req.body;
    const newUser = await User.create({
      name,
      last_name,
      username,
      email,
      password: await encryptPassword(password),
    });
    const token = jwt.sign({ id: newUser.id }, config.SECRET, {
      expiresIn: 86400, //24 horas
    });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const include = {
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ["id", "name", "last_name", "username", "email"],
    };
    let userFound;
    if (email) {
      userFound = await User.findOne({ where: { email: email } });
    }
    if (username) {
      userFound = await User.findOne({ where: { username: username } });
    }

    if (!userFound)
      return res
        .status(200)
        .json({
          token: null,
          message: "Nombre de usuario o contraseña incorrecta",
        });

    const matchPassword = await comparePassword(password, userFound.password);

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Nombre de usuario o contraseña incorrecta",
      });
    const user = await User.findByPk(userFound.id, include);
    const token = jwt.sign({ id: userFound.id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
