import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { API } from "./config";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = createRoot(container);

const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || "/furnitures"
  );
};

root.render(
  <Auth0Provider
    domain="dev-mcymrcydcldznktj.us.auth0.com"
    clientId="0BIH1jmbf3jhN2nYaSYBliP6IF1aV6EJ"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: API.audience,
    }}
    onRedirectCallback={onRedirectCallback}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>
);
