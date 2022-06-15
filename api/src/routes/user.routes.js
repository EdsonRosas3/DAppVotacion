const { Router } = require("express");
const router = Router();

const {userCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/",
  [authJwt.verifyToken,authJwt.isAdmin],
  userCtrl.createUser
);

router.get(
  "/",
  [authJwt.verifyToken],
  userCtrl.getUsers
);

router.get(
  "/:idUser/organizations",
  [authJwt.verifyToken],
  userCtrl.getOrganizationsByUser
);

router.put(
  "/:idUser/acceptElection/:idOrganization",
  [authJwt.verifyToken],
  userCtrl.userAcceptElection
);

router.put(
  "/:idUser/voteElection/:idOrganization",
  [authJwt.verifyToken],
  userCtrl.userVoteElection
);

module.exports = router;
