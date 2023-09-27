import { useState } from "react";
import { getRecipes } from "../../utilities/SearchAPI/searchService";
import SearchResult from "./SearchResult";
import "./SearchBar.css";

const initState = {
  ingredients: "",
};

export default function SearchBar() {
  const [newSearch, setNewSearch] = useState(initState);
  const [results, setResults] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const results = await getRecipes(newSearch);
    console.log(results);
    if (results.length) {
      console.log("im here");
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
          placeholder="Enter ingredients separated by commas (i.e bread, eggs)"
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
      <div>
        {results.map((ingredients) => {
          return (
            <SearchResult key={ingredients.id} searchResult={ingredients} />
          );
        })}
      </div>
    </div>
  );
}
