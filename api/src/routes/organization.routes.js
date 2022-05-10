const { Router } = require("express");
const router = Router();

const {orgCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idUser",
  [authJwt.verifyToken],
  orgCtrl.createOrganization
);

module.exports = router;
