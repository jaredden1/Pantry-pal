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

  // Hooks and utilities for authentication
  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
  console.log(user, "this is User");

  // useEffect to fetch the recipes for the authenticated user
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        // Filter recipes that belong to the current authenticated user
        const userRecipes = data.filter((recipe) => recipe?.user === user?.sub);
        setRecipes(userRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, [user]);

  // Handler function to delete a specific recipe
  async function handleDelete(id) {
    try {
      const deleteResponse = await deleteRecipe(id).then(navigate(0));
    } catch (error) {
      console.log(error);
    }
  }

  // Helper function to strip HTML tags from a given string
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

  // Render user's profile and their associated recipes
  return (
    <div>
      <div className="MyRecipes-userProfile">
        <img src={user?.picture} alt={""} />
        <h2>Welcome {user?.name}</h2>
        <br />
      </div>
      {recipes.map((recipe) => (
        <div key={uuidv4()} className="MyRecipes-searchResult">
          <img src={recipe.image} alt={recipe.title} />
          <button
            className="MyRecipes-deleteButton"
            onClick={() => handleDelete(recipe._id)}
          >
            X
          </button>
          <p>{stripHtml(recipe.summary)}</p>
          <br />
          Ingredients:
          {recipe.ingredients.map((ingredient) => (
            <div key={uuidv4()}>
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient[1]}`}
                alt={ingredient[0]}
              />
              <p>{ingredient[0]}</p>
            </div>
          ))}
          <br />
          Instructions:
          {recipe.instructions.map((instruction, index) => (
            <div key={uuidv4()}>
              {index + 1} {instruction}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
