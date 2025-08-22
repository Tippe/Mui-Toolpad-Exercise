import type { Navigation } from "@toolpad/core/AppProvider";
import {
    Add,
    Biotech,
    Bolt,
    Chat,
    Dashboard,
    Extension,
    Hail,
    Person,
    Psychology,
    Repeat,
    RocketLaunch,
    Settings,
} from "@mui/icons-material";

export const NAVIGATION: Navigation = [
    {
        title: "Dashboard",
        icon: <Dashboard />,
    },
    {
        kind: "header",
        title: "Main items",
    },
    {
        segment: "chat",
        title: "Chat",
        icon: <Chat />,
    },
    {
        segment: "profile",
        title: "Profiel",
        icon: <Person />,
    },
    {
        segment: "settings",
        title: "Instellingen",
        icon: <Settings />,
    },
    {
        kind: "header",
        title: "Advanced",
    },
    {
        segment: "brain",
        title: "Brains",
        icon: <Psychology />,
    },
    {
        segment: "action",
        title: "Action Catalog",
        icon: <Bolt />,
    },
    { kind: "divider" },
    {
        segment: "addition",
        title: "Additional",
        icon: <Add />,
        children: [
            {
                segment: "buddys",
                title: "Buddy's",
                icon: <Hail />,
            },
            {
                segment: "connector",
                title: "Connectors",
                icon: <Extension />,
            },
        ],
    },
];
