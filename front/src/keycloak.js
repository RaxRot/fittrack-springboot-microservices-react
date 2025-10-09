import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8181", // твой Keycloak
    realm: "fitness-oath2",
    clientId: "oath2-pkce-client",
});

export default keycloak;
