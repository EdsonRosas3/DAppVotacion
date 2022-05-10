const { Model, DataTypes } = require("sequelize");
const sequelize = require("./DBconnection");

class Organization extends Model {}
Organization.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING
  },
  reach:{
    type: DataTypes.ENUM,
    values: ['Nacional','Departamental', 'Municipal','Vecinal']
  },
}, {
    sequelize,
    modelName: "organization",
    timestamps: false
});

module.exports = Organization;
