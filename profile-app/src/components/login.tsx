import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRedirect({
      authorizationParams: {
        login_hint: email,
      },
    });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p className="login-info">
        Log in with your email to access all features. Auth0 will handle the authentication process.
      </p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};
