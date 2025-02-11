const express = require("express");
const router = express.Router();
const reqAuth = require("../middlewares/reqAuth");
const getRes = require("../controllers/getRes");

router.get('/progress',getRes.resData);


module.exports = router;