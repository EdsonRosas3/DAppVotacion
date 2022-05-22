const { Router } = require("express");
const router = Router();

const {postulantCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idElection/:idUser",
  [authJwt.verifyToken],
  postulantCtrl.addCandidateToElection
);
router.get(
  "/iscandidate/:idElection/:idUser",
  [authJwt.verifyToken],
  postulantCtrl.userIsCandidate
);
module.exports = router;