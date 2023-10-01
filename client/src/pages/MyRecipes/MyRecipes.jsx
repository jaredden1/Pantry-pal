import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { deleteRecipe } from "../../utilities/Recipe/recipesService";
import { v4 as uuidv4} from "uuid"
import "./MyRecipe.css";


export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
console.log(user, "this is User")
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
      const deleteResponse = await deleteRecipe(id).then(navigate(0));
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
      <img src={user?.picture} alt={""} />
        <h2>Welcome {user?.name}</h2>
        <br />
      </div>
      {recipes.map((recipe) => (
        <div key={uuidv4()} className="searchResult">
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
