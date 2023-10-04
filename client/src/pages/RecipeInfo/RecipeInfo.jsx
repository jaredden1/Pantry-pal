import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getRecipeDetails } from "../../utilities/SearchAPI/searchService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../utilities/Recipe/recipesService";
import { useAuth0 } from "@auth0/auth0-react";
import "./RecipeInfo.css";

// RecipeInfo component definition
export default function RecipeInfo() {
  // Hooks and utilities for authentication
  const { loginWithRedirect } = useAuth0();
  
  // Getting the 'id' parameter from the URL using useParams hook
  const { id } = useParams();

  // State hooks
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  // Authentication state and user information
  const { isAuthenticated, user } = useAuth0();
  console.log(user, "hello");

  // State to track if the alert should be displayed (for user not authenticated)
  const [showAlert, setShowAlert] = useState(false);

  // Function to fetch the recipe details using the id
  async function fetchRecipeDetail() {
    console.log("I am here FIRST");
    try {
      const result = await getRecipeDetails(id);
      setRecipe(result.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  }

  // useEffect hook to fetch the recipe detail when the component mounts
  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  // Function to save a recipe
  async function saveRecipe() {
    console.log("I AM HERE");
    if (!recipe) return;

    // If the user is not authenticated, show an alert
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }

    // Extract necessary details from the fetched recipe
    const { image, title, summary } = recipe;
    const ingredients = recipe.extendedIngredients.map((ing) => [
      ing.original,
      ing.image,
    ]);
    const instructions = recipe.analyzedInstructions[0]?.steps.map(
      (step) => step.step
    );

    // Call the API to save the recipe
    await createRecipe({
      image,
      title,
      summary,
      ingredients,
      instructions,
      user: user.sub,
    });

    // Redirect user to the recipes page
    navigate("/recipes");
  }

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render alert for unauthenticated users trying to save a recipe
  if (showAlert) {
    return (
      <div className="alert">
        Please <Link onClick={loginWithRedirect}>Login</Link> to save recipes 🍲
      </div>
    );
  }

  return (
    <div className="recipeInfo">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />

      <div className="tabs">
        <button onClick={() => setActiveTab("summary")}>Summary</button>
        <button onClick={() => setActiveTab("ingredients")}>Ingredients</button>
        <button onClick={() => setActiveTab("instructions")}>Instructions</button>
        <button onClick={() => saveRecipe()}>Save ME!</button>
      </div>
      <br />
      <br />

      {activeTab === "summary" && (
        <div
          className="recipeSummary"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></div>
      )}

      {activeTab === "ingredients" &&
        recipe.extendedIngredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient">
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.name}
            />
            <p>{ingredient.original}</p>
          </div>
        ))}

      {activeTab === "instructions" &&
        recipe.analyzedInstructions[0].steps.map((step) => (
          <div key={step.number} className="instruction">
            {step.number}.{step.step}
          </div>
        ))}
    </div>
  );
}
