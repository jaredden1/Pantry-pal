import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createRecipe } from "../../utilities/Recipe/recipesService";

export default function SearchResult({ searchResult }) {
  // const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   setTitle(searchResult.title);
  //   setImage(searchResult.image);
  // }, [searchResult]);

  async function saveRecipe() {
    await createRecipe({
      // title,
      // image,
    });

    navigate("/");
  }

  return (
    <div className="searchResult">
      <Link to={`/recipe/${searchResult.id}`}>
      <h2>{searchResult.title}</h2>
      <img src={searchResult.image} alt={searchResult.title} />
      </ Link> 
    </div>
  );
}
