const { Model, DataTypes } = require("sequelize");
const sequelize = require("./DBconnection");
const Organization = require("./Organization");

class Election extends Model {}
Election.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  postulation_StartDate: {
    type: DataTypes.DATE
  },
  postulation_EndDate: {
    type: DataTypes.DATE
  },
  date: {
    type: DataTypes.DATE
  },
  votesCast: {
    type: DataTypes.INTEGER
  },
  absentVotes: {
    type: DataTypes.INTEGER
  },
  statusAccept:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status:{
    type: DataTypes.ENUM,
    values: ['POSTULACION','ESPERA','VOTACION','FINALIZADA','DESAPROBADO']
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: 'id'
    }
  },
}, {
    sequelize,
    modelName: "elections",
    timestamps: true
});

module.exports = Election;
