import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { API } from "../config";

interface TokenPayload {
  [key: string]: any;
}

export const useCallWithToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callWithToken = async <T,>(fn: (token: string) => Promise<T>): Promise<T> => {
    const token = await getAccessTokenSilently({
      authorizationParams: { audience: API.audience },
    });
    return fn(token);
  };

  const getRoles = async (): Promise<string[]> => {
    const token = await getAccessTokenSilently({
      authorizationParams: { audience: API.audience },
    });
    const decoded = jwtDecode<TokenPayload>(token);
    const roles = decoded[API.roles()] as string[] | undefined;
    return roles || [];
  };

  const isAdmin = async (): Promise<boolean> => {
    const roles = await getRoles();
    return roles.includes("admin");
  };

  return { callWithToken, getRoles, isAdmin };
};
