const { Router } = require("express");
const router = Router();

const {organizationCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idUser",
  [authJwt.verifyToken],
  organizationCtrl.createOrganization
);

module.exports = router;
