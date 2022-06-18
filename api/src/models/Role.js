const { Model, DataTypes } = require("sequelize");
const sequelize = require("./DBconnection");

class Role extends Model {}
Role.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
    sequelize,
    modelName: "roles",
    timestamps: true
});

module.exports = Role;
