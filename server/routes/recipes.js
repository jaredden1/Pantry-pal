const express = require('express');
const router = express.Router();
const Recipe = require('../controllers/recipes'); 

// Restaurants CRUD routes
router.get("/", recipesCtrl.index);
router.get("/:id", recipesCtrl.show);
router.post("/", recipesCtrl.create);
router.put("/:id", recipesCtrl.update);
router.delete("/:id", recipesCtrl.delete);

module.exports = router;
