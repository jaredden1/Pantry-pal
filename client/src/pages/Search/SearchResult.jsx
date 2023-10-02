import { Link } from "react-router-dom";
import "./SearchResult.css";

export default function SearchResult({ searchResult }) {
  if (!searchResult.image) {
    return null;
  }

  return (
    <div className="searchResult">
      <Link to={`/recipe/${searchResult.id}`}>
        <h2>{searchResult.title}</h2>
        <img src={searchResult.image} alt={searchResult.title} />
      </Link>
    </div>
  );
}

