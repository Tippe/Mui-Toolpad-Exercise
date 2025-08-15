import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import DashboardPage from "./pages";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import ActionPage from "./pages/action";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/auth/authConfig";
import DataBronPage from "./pages/databronnen";

const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                path: "",
                Component: DashboardPage,
            },
            {
                path: "chat",
                Component: ChatPage,
            },
            {
                path: "",
                children: [
                    {
                        path: "profile",
                        Component: ProfilePage,
                    },
                ],
            },
            {
                path: "settings",
                Component: SettingsPage,
            },
            {
                path: "action",
                Component: ActionPage,
            },
            {
                path: "databronnen",
                Component: DataBronPage,
            },
        ],
    },
]);

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <RouterProvider router={router} />
        </MsalProvider>
    </React.StrictMode>
);
