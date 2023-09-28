import { useParams } from "react-router";
import { getRecipeDetails } from "../../utilities/SearchAPI/searchService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../utilities/Recipe/recipesService";
import "./RecipeInfo.css";

export default function RecipeInfo() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  async function fetchRecipeDetail() {
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
    if (!recipe) return;

    const { image, title, summary } = recipe;
    const ingredients = recipe.extendedIngredients.map((ing) => ing.original);
    const instructions = recipe.analyzedInstructions[0]?.steps.map((step) => step.step);

    await createRecipe({
      image,
      title,
      summary,
      ingredients,
      instructions,
    });
    navigate("/recipes");
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="recipeInfo">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />

      <div className="tabs">
        <button onClick={() => setActiveTab("summary")}>Summary</button>
        <button onClick={() => setActiveTab("ingredients")}>Ingredients</button>
        <button onClick={() => setActiveTab("instructions")}>Instructions</button>
        <button onClick={() => saveRecipe("save")}>Save ME!</button>
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
