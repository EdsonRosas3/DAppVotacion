const { Model, DataTypes } = require("sequelize");
const sequelize = require("./DBconnection");

class User extends Model {}
User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  username:{
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password:{
    type:DataTypes.STRING
  }
}, {
    sequelize,
    modelName: "users",
    timestamps: true
});

module.exports = User;
