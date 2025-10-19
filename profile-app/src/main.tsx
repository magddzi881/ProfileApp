import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { API, AUTH } from "./config";

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
    domain={AUTH.domain}
    clientId={AUTH.clientId}
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
