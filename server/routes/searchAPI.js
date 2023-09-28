const express = require("express");
const router = express.Router();
const searchAPICtrl = require("../controllers/searchAPI");

//Search route
router.post("/", searchAPICtrl.search);
router.get("/recipe/:id", searchAPICtrl.getrecipebyid);

module.exports = router;