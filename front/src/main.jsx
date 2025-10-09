import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import keycloak from "./keycloak";

keycloak
    .init({ onLoad: "login-required", pkceMethod: "S256" })
    .then((authenticated) => {
        if (!authenticated) {
            keycloak.login();
        } else {
            ReactDOM.createRoot(document.getElementById("root")).render(
                <React.StrictMode>
                    <App keycloak={keycloak} />
                </React.StrictMode>
            );
        }
    })
    .catch((err) => console.error("Keycloak init error", err));
