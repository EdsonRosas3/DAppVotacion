const { Router } = require("express");
const router = Router();

const {postulantCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idElection/:idUser",
  [authJwt.verifyToken],
  postulantCtrl.addCandidateToElection
);

module.exports = router;