import { Link } from "react-router-dom";
import "./NavBar.css";

const headerImage = "https://i.imgur.com/pjfPXUn.png";

export default function Nav(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <img src={headerImage} className="headerImage" alt="Header" />
      </Link>
      <div className="page-links">
        <Link className="link" to="/recipes">
          <div className="linktext">My Recipes</div>
        </Link>
        <Link className="link" to="/about">
          <div className="linktext">About</div>
        </Link>
        <Link className="link" to="/login">
          <div className="linktext">User Login</div>
        </Link>
      </div>
    </nav>
  );
}