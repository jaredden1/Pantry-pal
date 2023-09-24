const { Recipe } = require("../models");

module.exports = {
  index,
  show,
  create,
  update,
  delete: destroy,
};

//index async function for CRUD route
async function index(req, res) {
    try {
      res.status(200).json(await Recipe.find());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  //show async function for CRUD route
  async function show(req, res) {
    try {
      res.status(200).json(await Recipe.findById(req.params.id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //create async function for CRUD route
  async function create(req, res) {
    try {
      console.log(req.body);
      res.status(201).json(await Recipe.create(req.body));
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  //create async function for CRUD route
  async function update(req, res) {
    try {
      res.status(201).json(await Recipe.update(req.body));
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
  
  //delete async function for CRUD route
  async function destroy(req, res) {
    try {
      res.status(200).json(await Recipe.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }