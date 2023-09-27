const express = require("express");
const router = express.Router();
const searchAPICtrl = require("../controllers/searchAPI");

// search route
router.get("/recipe/:id", searchAPICtrl.getrecipebyid);
router.post("/", searchAPICtrl.search);

module.exports = router;