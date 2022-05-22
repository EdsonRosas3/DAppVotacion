const authCtrl = require("./auth.controller");
const userCtrl = require("./user.controller");
const organizationCtrl = require("./organization.controller");
const electionCtrl = require("./election.controller");
const postulantCtrl = require("./postulant.controller");

module.exports = {
    authCtrl,
    userCtrl,
    organizationCtrl,
    electionCtrl,
    postulantCtrl,
}