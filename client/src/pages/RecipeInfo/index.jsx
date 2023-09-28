import { useParams } from "react-router";
import { getRecipeDetails } from "../../utilities/SearchAPI/searchService";
import { useEffect, useState } from "react";
import './RecipeInfo.css'; // import the CSS file

export default function RecipeInfo() {
   const { id } = useParams();
   const [recipe, setRecipe] = useState(null);  
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState('summary'); // default active tab

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

   return loading ? (
    <div>Loading...</div>
    ) : (
        <div className="recipeInfo">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            
            <div className="tabs">
                <button onClick={() => setActiveTab('summary')}>Summary</button>
                <button onClick={() => setActiveTab('ingredients')}>Ingredients</button>
                <button onClick={() => setActiveTab('instructions')}>Instructions</button>
            </div>

            {activeTab === 'summary' && (
                <div 
                    className="recipeSummary" 
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                ></div>
            )}

            {activeTab === 'ingredients' && recipe.extendedIngredients.map(ingredient => (
                <div key={ingredient.id} className="ingredient">
                    <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name} />
                    <p>{ingredient.original}</p>
                </div>
            ))}

            {activeTab === 'instructions' && recipe.analyzedInstructions[0].steps.map(step => (
                <div key={step.number} className="instruction">
                    {step.number}.
                    {step.step}
                </div>
            ))}
        </div>
    );
}

