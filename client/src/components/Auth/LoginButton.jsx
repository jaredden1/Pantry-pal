import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./LoginButton.css";

export default function LoginButton(){
    const { loginWithRedirect } = useAuth0()

    return (<Link onClick={()=>loginWithRedirect()}>Login</Link>)
    
}
