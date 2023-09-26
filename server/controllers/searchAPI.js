const axios = require("axios");
const API_KEY = process.env.API_KEY;

module.exports = {
  search,
};

// Search function for API
async function search(req, res) {
  const ingredients = req.body.ingredients;
  const apiKey = API_KEY;
  const number = 5; // Set your desired number of recipes here
  const limitLicense = true;
  const ranking = 2;
  const ignorePantry = true;

  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/findByIngredients",
    params: {
      apiKey,
      ingredients,
      number,
      limitLicense,
      ranking,
      ignorePantry,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}