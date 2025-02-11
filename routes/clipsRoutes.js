const express = require("express");
const router = express.Router();
const clipController = require("../controllers/clipController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/clip", authMiddleware,clipController.getHome);

module.exports = router;
