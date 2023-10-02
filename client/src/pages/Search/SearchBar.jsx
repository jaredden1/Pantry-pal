import { useState } from "react";
import { getRecipes } from "../../utilities/SearchAPI/searchService";
import SearchResult from "./SearchResult";
import "./SearchBar.css";

// Initial state for the search input
const initState = {
  ingredients: "",
};

export default function SearchBar() {
  // State for the current search query and the search results
  const [newSearch, setNewSearch] = useState(initState);
  const [results, setResults] = useState([]);

  // Asynchronously fetch recipes based on the user's input
  async function handleSubmit(e) {
    e.preventDefault();
    const results = await getRecipes(newSearch);
    console.log(results);
    if (results.length) {
      console.log("im here");
      setResults(results);
    }
    // Reset the search input
    setNewSearch(initState);
  }

  // Update the newSearch state as the user types
  function handleChange(e) {
    const updatedQuery = { ...newSearch, [e.target.name]: e.target.value };
    setNewSearch(updatedQuery);
  }

  return (
    <div className="main-container">
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
      </div>
      <div className="searchResultContainer">
        {/* Map through the search results and display them */}
        {results.map((ingredients) => {
          return (
            <SearchResult key={ingredients.id} searchResult={ingredients} />
          );
        })}
      </div>
      {/* Display a welcome message when no search results are found */}
      {results.length === 0 && (
        <div className="welcome-text">
          Your ingredients. Our Recipes. <br /> Perfect match.
        </div>
      )}
    </div>
  );
}
