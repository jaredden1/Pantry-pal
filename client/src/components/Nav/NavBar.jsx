import { Link } from "react-router-dom";
import "./NavBar.css";

const headerImage = "";

export default function Nav(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <img src={headerImage} className="headerImage" alt="Header" />
      </Link>
      <div className="page-links">
        <Link className="link" to="/recipes">
          <div className="linktext">Recipes</div>
        </Link>
        <Link className="link" to="/about">
          <div className="linktext">About</div>
        </Link>
      </div>
    </nav>
  );
}