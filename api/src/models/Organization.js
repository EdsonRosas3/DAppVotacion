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
  description: {
    type: DataTypes.STRING
  },
  reach:{
    type: DataTypes.ENUM,
    values: ['Nacional','Departamental','Municipal','Vecinal','Institucional']
  },
  type:{
    type: DataTypes.ENUM,
    values: ['CENTRALIZADA','DESCENTRALIZADA']
  },
  creatorUserId:{
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, {
    sequelize,
    modelName: "organizations",
    timestamps: false
});

module.exports = Organization;