
export default function SearchBar() {
  async function handleSubmit() {}

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Your Ingredients" required />
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>
    </div>
  );
}
