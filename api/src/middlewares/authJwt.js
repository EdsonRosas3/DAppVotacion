const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");
const Role = require("../models/Role");

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);

    
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    req.userId=decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId,{
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
      attributes: ["id","name","last_name","username","email"]
    });
    let roles = [];
    roles=user.roles;
    let isAdmin = false;
    roles.forEach(role => {
      if (role.name==="admin") {
        isAdmin = true;
      }
    });
    if (!isAdmin) {
      return res.status(200).json({message:"No es administrador"});
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
}


