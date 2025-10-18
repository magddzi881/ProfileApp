import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  "https://my-api.profileapp/roles"?: string[];
}

export const useCallWithToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callWithToken = async <T,>(fn: (token: string) => Promise<T>): Promise<T> => {
    const token = await getAccessTokenSilently({
      authorizationParams: { audience: "https://my-api.profileapp" },
    });
    return fn(token);
  };

  const getRoles = async (): Promise<string[]> => {
    const token = await getAccessTokenSilently({
      authorizationParams: { audience: "https://my-api.profileapp" },
    });
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded["https://my-api.profileapp/roles"] || [];
  };

  const isAdmin = async (): Promise<boolean> => {
    const roles = await getRoles();
    return roles.includes("admin");
  };

  return { callWithToken, getRoles, isAdmin };
};
