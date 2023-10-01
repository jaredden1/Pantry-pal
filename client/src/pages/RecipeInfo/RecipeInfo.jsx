import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getRecipeDetails } from "../../utilities/SearchAPI/searchService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../utilities/Recipe/recipesService";
import { useAuth0 } from "@auth0/auth0-react"; 
import "./RecipeInfo.css";

export default function RecipeInfo() {
  const { loginWithRedirect } = useAuth0()
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  const { isAuthenticated, user } = useAuth0();
  console.log(user, "hello")  
  
  // State to track the alert display.
  const [showAlert, setShowAlert] = useState(false);

  async function fetchRecipeDetail() {
    console.log('I am here FIRST')
    try {
      const result = await getRecipeDetails(id);
      setRecipe(result.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  async function saveRecipe() {
    console.log("I AM HERE")
    if (!recipe) return;

    // Check authentication and set showAlert if user isn't authenticated.
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }

    const { image, title, summary } = recipe;
    const ingredients = recipe.extendedIngredients.map((ing) => [ing.original,ing.image]);
    const instructions = recipe.analyzedInstructions[0]?.steps.map((step) => step.step);

    await createRecipe({
      image,
      title,
      summary,
      ingredients,
      instructions,
      user: user.sub,
    });
    navigate("/recipes");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

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
