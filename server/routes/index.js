const express = require("express");
const router = express.Router();

//localhost:4000 test
router.get("/", function (req, res, next) {
  res.send("test");
});

module.exports = router;
