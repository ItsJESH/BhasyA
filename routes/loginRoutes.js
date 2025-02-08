const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController")
const logoutController = require("../controllers/logoutController")
const registerController = require("../controllers/registerController")


router.get("/login", loginController.loginPage);
router.post("/login", loginController.loginUser);


router.get("/logout", logoutController.logoutUser);

router.get("/register", loginController.loginPage);
router.post("/register", registerController.registerUser);

router.get("/verify", registerController.getVerify);
router.get("/verify/:token", registerController.verifyUser);

module.exports = router;