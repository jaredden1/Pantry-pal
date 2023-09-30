import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogOutButton";
import "./NavBar.css";

const headerImage = "https://i.imgur.com/pjfPXUn.png";

export default function Nav(props) {
  const { isLoading, isAuthenticated, user } = useAuth0();
  console.log("User", user)
  console.log("Loading:", isLoading );
  console.log("Auth:", isAuthenticated);


  return (
    <nav className="nav">
      <Link to="/">
        <img src={headerImage} className="headerImage" alt="Header" />
      </Link>
      <div className="page-links">
        <Link className="link" to="/about">
          <div className="linktext">About</div>
        </Link>

        {!isLoading ? (<>
          <div className="page-links">
             {isAuthenticated ? <><Link to="/recipes">My Recipes</Link><LogoutButton /></>
             :
             <LoginButton /> }
          </div>
          </>) : null }
      </div>
    </nav>
  );
}
