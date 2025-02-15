const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/exam", authMiddleware,examController.getHome);

module.exports = router;
