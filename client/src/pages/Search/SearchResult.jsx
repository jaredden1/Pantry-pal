import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../utilities/Recipe/recipesService";

export default function SearchResult({ searchResult }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(searchResult.title);
    setImage(searchResult.image);
  }, [searchResult]);

  async function saveRecipe() {
    await createRecipe({
      title,
      image,
    });

    navigate("/");
  }

  return (
    <div className="searchResult">
      <h2>{title}</h2>
      <img src={image} alt={title} />
    </div>
  );
}
