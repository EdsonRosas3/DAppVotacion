const Organization = require("../models/Organization");
const User = require("../models/User");
// verify if a organization is central or not

const checkOrganizationIsCentralizedOrDecentralized = (req, res, next) => {
    const { idOrganization, idUser } = req.params;
    const organization = Organization.findByPk(idOrganization);
    const user = User.findByPk(idUser);
    verifyMemberAccept(idUser);
    if (organization.type === "Descentralizada") {
        const lastElection = getLastElection(idOrganization);
        if( lastElection !== null ){
            if(lastElection.statusAccept === false){
            }
        }
    }
    
};

const verifyMemberAccept = async (idUser) => {
    const user = User.findByPk(idUser);
    let el = user.getElections();
    console.log(el);
}

const getLastElection = async (idOrganization) => {
    try {
      const elections = await Election.findAndCountAll({
        where: { organization_id: idOrganization },
        });
      if(elections.count >=1){
        let lastElection = elections.rows[elections.count -1];
        return lastElection;
      }
      else{
        return null;
      }
    }
    catch (error) {
      return;
    }
  };

module.exports = { checkOrganizationIsCentralizedOrDecentralized };
