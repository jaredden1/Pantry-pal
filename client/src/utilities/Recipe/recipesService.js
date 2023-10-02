import * as recipesApi from "./recipesApi";

//Retrieves a list of all recipes by calling the index method from the recipesApi
export async function getRecipes() {
  try {
    const data = await recipesApi.index();
    return data;
  } catch (err) {
    return err;
  }
}

//Creates a new recipe using the provided recipe data by calling the create method from the recipesApi
export async function createRecipe(RecipeData) {
  try {
    const data = await recipesApi.create(RecipeData);
    return data;
  } catch (err) {
    return err;
  }
}

//Fetches the details of a recipe with the specified ID by calling the show method from the recipesApi
export async function showRecipe(id) {
  try {
    const data = await recipesApi.show(id);
    return data;
  } catch (err) {
    return err;
  }
}

//Deletes a recipe with the specified ID by calling the destroy method from the recipesApi
export async function deleteRecipe(id) {
  try {
    const data = await recipesApi.destroy(id);
    return data;
  } catch (err) {
    return err;
  }
}
