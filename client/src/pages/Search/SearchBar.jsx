import "./SearchBar.css";

export default function SearchBar() {
  async function handleSubmit() {
    alert("test");
  }
      
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input className="search-input" type="text" placeholder="Enter Your Ingredients" required />
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>
    </div>
  );
}
