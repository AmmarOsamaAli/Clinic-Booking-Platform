const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require('../middleware/verifyToken')

router.post("/sign-up", authController.signUp);

router.post("/login", authController.signIn);

router.post("/logout", authController.logOut);

router.get("/me", verifyToken ,authController.verifyUser);

module.exports = router;
