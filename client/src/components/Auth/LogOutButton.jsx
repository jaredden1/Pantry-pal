import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <div className="btn" onClick={() => logout()}>
            <span className="btn-content">Logout</span>
        </div>
    );
}
