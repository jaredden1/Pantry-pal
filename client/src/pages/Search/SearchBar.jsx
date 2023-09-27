import { useState } from "react";
import { getRecipes } from "../../utilities/SearchAPI/searchService";
import "./SearchBar.css";

const initState = {
  ingredients: "",
};

export default function SearchBar({ setResults }) {
  const [newSearch, setNewSearch] = useState(initState);

  async function handleSubmit(e) {
    e.preventDefault();
    const results = await getRecipes(newSearch);
    console.log(results)
    if (results.id) {
      setResults(results);
    }
    setNewSearch(initState);
  }
  function handleChange(e) {
    const updatedQuery = { ...newSearch, [e.target.name]: e.target.value };
    setNewSearch(updatedQuery);
  }
  
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Enter ingredients separated by a comma."
          value={newSearch.ingredients}
          name="ingredients"
          onChange={handleChange}
          required
          className="search-input"
        />
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>
    </div>
  );
}
