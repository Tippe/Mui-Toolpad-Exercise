import { Configuration } from "@azure/msal-browser";

const isLocalhost = window.location.hostname === "localhost";
/**
 * Configuratie voor authenticatie
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: "610c549d-5660-4562-877b-0fc341465680",
        //authority: "https://login.microsoftonline.com/organizations",
        postLogoutRedirectUri: "https://localhost:5173",
        redirectUri: "https://localhost:5173" ,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: [
        'User.Read'
      ],
};