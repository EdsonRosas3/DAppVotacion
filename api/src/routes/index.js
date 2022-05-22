const { Router } = require("express");
const AuthRouter = require("./auth.routes");
const UserRouter = require("./user.routes");
const OrganizationRouter = require("./organization.routes");
const ElectionRouter = require("./election.routes");
const PostulantRouter = require("./postulant.routes");

const router = Router();

router.use("/auth",AuthRouter);
router.use("/users",UserRouter);
router.use("/organizations",OrganizationRouter);
router.use("/elections",ElectionRouter);
router.use("/postulants",PostulantRouter);

module.exports = router;