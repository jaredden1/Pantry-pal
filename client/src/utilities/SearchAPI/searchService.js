import * as searchAPI from "./searchApi";

//Retrieves a list of recipes based on the provided search criteria (RecipeData) by calling the fetchApiResults method from the searchAPI
export async function getRecipes(RecipeData) {
  try {
    const data = await searchAPI.fetchApiResults(RecipeData);
    return data;
  } catch (err) {
    return err;
  }
}

export async function getRecipeDetails(id) {
  try {
    const data = await searchAPI.fetchRecipeDetails(id);
    return data;
  } catch (err) {
    return err;
  }
}
