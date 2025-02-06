const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController")


router.get("/login", loginController.loginPage);
router.post("/login", loginController.loginUser);


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

router.get("/register", loginController.loginPage);
router.post("/register", loginController.registerUser);

router.get("/verify", loginController.getVerify);
router.get("/verify/:token", loginController.verifyUser);

module.exports = router;