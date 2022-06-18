const {Model,DataTypes}=require("sequelize");
const sequelize = require("./DBconnection");

class Participant extends Model{}
Participant.init({
    acceptElection: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    voteElection: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},
{
    sequelize,
    modelName:"participants",
    timestamps: true
})
module.exports = Participant;


