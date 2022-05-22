const {Model,DataTypes}=require("sequelize");
const sequelize = require("./DBconnection");

class Postulant extends Model{}
Postulant.init({
    nameFront: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
},
{
    sequelize,
    modelName: "postulant",
    timestamps: false
})
module.exports = Postulant;


