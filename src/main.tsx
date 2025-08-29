import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/auth/authConfig";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import BuddyPage from "./pages/buddys";
import BrainPage from "./pages/brain";
import WorkspacePage from "./pages/workspace";
import ActionCatalogPage from "./pages/actionCatalog";

const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                path: "",
                Component: WorkspacePage,
            },
            {
                path: "action",
                Component: ActionCatalogPage,
            },
            {
                path: "profile",
                Component: ProfilePage,
            },
            {
                path: "settings",
                Component: SettingsPage,
            },
            {
                path: "brain",
                Component: BrainPage,
            },
            {
                path: "/addition",
                children: [
                    {
                        path: "buddys",
                        Component: BuddyPage,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <RouterProvider router={router} />
        </MsalProvider>
    </React.StrictMode>
);
