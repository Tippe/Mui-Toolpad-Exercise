import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import DashboardPage from "./pages";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import BrainsPage from "./pages/brains";
import BuddyPage from "./pages/buddys";

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
                path: "buddys/*",
                Component: BuddyPage,
            },
            {
                path: "brains",
                Component: BrainsPage,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
