const { Router } = require("express");
const AuthRouter = require("./auth.routes");
const UserRouter = require("./user.routes");


const router = Router();

router.use("/auth",AuthRouter);
router.use("/users",UserRouter);


module.exports = router;