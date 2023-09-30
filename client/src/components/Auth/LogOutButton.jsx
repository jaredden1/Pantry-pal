import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function LogoutButton(){
    const { logout } = useAuth0()

    return (<Link onClick={()=>logout()}>Logout</Link>)
}
