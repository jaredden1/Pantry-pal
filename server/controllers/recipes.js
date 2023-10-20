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
  console.log("index method triggered");
  try {
    res.status(200).json(await Recipe.find());
  } catch (error) {
    console.log("Error in index method:", error);
    res.status(400).json({ error: error.message });
  }
}

//show async function for CRUD route
async function show(req, res) {
  console.log("show method triggered with id:", req.params.id);
  try {
    res.status(200).json(await Recipe.findById(req.params.id));
  } catch (error) {
    console.log("Error in show method:", error);
    res.status(400).json({ error: error.message });
  }
}

//create async function for CRUD route
async function create(req, res) {
  console.log("create method triggered with body:", req.body);
  try {
    console.log(req.body);
    res.status(201).json(await Recipe.create(req.body));
  } catch (error) {
    console.log("Error in create method:", error);
    res.status(400).json({ error: error.message });
  }
}

//update async function for CRUD route
async function update(req, res) {
  console.log("update method triggered with body:", req.body);
  try {
    res.status(201).json(await Recipe.update(req.body));
  } catch (error) {
    console.log("Error in update method:", error);
    res.status(400).json({ error: error.message });
  }
}

//delete async function for CRUD route
async function destroy(req, res) {
  console.log("delete method triggered with id:", req.params.id);
  try {
    res.status(200).json(await Recipe.findByIdAndDelete(req.params.id));
  } catch (error) {
    console.log("Error in delete method:", error);
    res.status(400).json({ error: error.message });
  }
}
