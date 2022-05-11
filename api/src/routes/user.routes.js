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
module.exports = router;
