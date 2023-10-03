import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { deleteRecipe } from "../../utilities/Recipe/recipesService";
import { v4 as uuidv4 } from "uuid";
import "./MyRecipe.css";

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
        <img src={user?.picture} alt="" />
        <h2>Welcome {user?.name}</h2>
        <br />
      </div>

      {recipes.map((recipe) => (
        <div
          key={uuidv4()}
          className="myRecipe-searchResult"
          style={{
            display:
              activeRecipe && activeRecipe !== recipe._id ? "none" : "block",
          }}
        >
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />

          {/* Delete button */}
          <button
            className="myRecipe-deleteButton"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(recipe._id);
            }}
          >
            X
          </button>

          {/* Expand/Collapse button */}
          <button
            onClick={() => {
              if (activeRecipe === recipe._id) {
                setActiveRecipe(null);
              } else {
                setActiveRecipe(recipe._id);
              }
            }}
          >
            Expand/Collapse
          </button>

          {activeRecipe === recipe._id && (
            <div className="myRecipe-details">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContentToShow("summary");
                }}
              >
                Summary
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContentToShow("ingredients");
                }}
              >
                Ingredients
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContentToShow("instructions");
                }}
              >
                Instructions
              </button>

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
  );
}