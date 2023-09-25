const express = require("express");
const router = express.Router();
const searchAPICtrl = require("../controllers/searchAPI");

// search route
router.post("/", searchAPICtrl.search);

module.exports = router;