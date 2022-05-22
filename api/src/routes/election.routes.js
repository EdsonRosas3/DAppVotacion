const { Router } = require("express");
const router = Router();

const {electionCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idOrganization",
  [authJwt.verifyToken],
  electionCtrl.createElection
);

router.get(
  "/exist/:idOrganization",
  [authJwt.verifyToken],
  electionCtrl.existElections
);

module.exports = router;
