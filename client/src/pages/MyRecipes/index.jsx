import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../utilities/Recipe/recipesService";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id) {
    try {
      const deleteResponse = await deleteRecipe(id).then(navigate(0));
    } catch (error) {
      console.log(error);
    }
  }

  function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="searchResult">
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <button
            className="delete button"
            onClick={() => {
              handleDelete(recipe._id);
            }}
          >
            Remove
          </button>
          <p>{stripHtml(recipe.summary)}</p>
          <br />
          <p>
            Ingredients:
            {recipe.ingredients.map((ingredient) => (
              <div>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient[1]}`}
                  alt={ingredient[0]}
                />
                <p>{ingredient[0]}</p>
              </div>
            ))}
          </p>
          <br />
          <p>
            Instructions:
            {recipe.instructions.map((instruction, index) => (
              <div>
                <p>
                  {index + 1} {instruction}
                </p>
              </div>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
