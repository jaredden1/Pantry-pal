import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { deleteRecipe } from "../../utilities/Recipe/recipesService";
import { v4 as uuidv4 } from "uuid";
import "./MyRecipes.css";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
  const [contentToShow, setContentToShow] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        const userRecipes = data.filter((recipe) => recipe?.user === user?.sub);
        setRecipes(userRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, [user]);

  async function handleDelete(id) {
    try {
      await deleteRecipe(id).then(navigate(0));
    } catch (error) {
      console.log(error);
    }
  }

  function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  if (!isAuthenticated) {
    return <Navigate to="/recipes" />;
  }

  if (auth0Loading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>Welcome {user?.name}</h2>
        <br />
      </div>
      <div className="myRecipe-container">
        {recipes.map((recipe) => (
          <div
            key={uuidv4()}
            className="myRecipe-searchResult"
            style={{
              display:
                activeRecipe && activeRecipe !== recipe._id ? "none" : "block",
            }}
          >
            <h2 className="myRecipe-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />

            <button
              className="myRecipe-deleteButton"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(recipe._id);
              }}
              aria-label={`Delete ${recipe.title}`}
            />

            <button
              className="myRecipe-expandButton"
              onClick={() => {
                setActiveRecipe(
                  activeRecipe === recipe._id ? null : recipe._id
                );
              }}
              aria-label={`Expand details for ${recipe.title}`}
            >
              <span
                className={
                  activeRecipe === recipe._id ? "caret rotated" : "caret"
                }
              >
                ▼
              </span>
            </button>

            {activeRecipe === recipe._id && (
              <div className="myRecipe-details">
                <button
                  className="myRecipe-button myRecipe-summaryButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContentToShow("summary");
                  }}
                >
                  Summary
                </button>

                <button
                  className="myRecipe-button myRecipe-ingredientButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContentToShow("ingredients");
                  }}
                >
                  Ingredients
                </button>
                <button
                  className="myRecipe-button myRecipe-instructionButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContentToShow("instructions");
                  }}
                >
                  Instructions
                </button>
                <br />
                <br />
                {contentToShow === "summary" && (
                  <p>{stripHtml(recipe.summary)}</p>
                )}
                {contentToShow === "ingredients" && (
                  <>
                    <br />
                    Ingredients:
                    {recipe.ingredients.map((ingredient) => (
                      <div key={uuidv4()} className="myRecipe-ingredient">
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient[1]}`}
                          alt={ingredient[0]}
                        />
                        <p>{ingredient[0]}</p>
                      </div>
                    ))}
                  </>
                )}
                {contentToShow === "instructions" && (
                  <>
                    <br />
                    Instructions:
                    {recipe.instructions.map((instruction, index) => (
                      <div key={uuidv4()} className="myRecipe-instruction">
                        {index + 1}. {instruction}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
