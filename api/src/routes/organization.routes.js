const { Router } = require("express");
const router = Router();

const {organizationCtrl} = require("../controllers");
const { authJwt, verifySignup } = require("../middlewares");

router.post(
  "/:idUser",
  [authJwt.verifyToken],
  organizationCtrl.createOrganization
);

router.post(
  "/:idOrganization/users",
  [authJwt.verifyToken],
  organizationCtrl.addUsersToOrganization
);

router.get(
  "/:idOrganization/users",
  [authJwt.verifyToken],
  organizationCtrl.getUsersByOrganization
);

router.get(
  "/:idOrganization/notusers",
  [authJwt.verifyToken],
  organizationCtrl.getNotUsersByOrganization
);

module.exports = router;