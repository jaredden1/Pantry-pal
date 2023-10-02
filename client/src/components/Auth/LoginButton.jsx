import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="btn" onClick={() => loginWithRedirect()}>
      <span className="btn-content">Login</span>
    </div>
  );
}
