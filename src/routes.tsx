import type { Navigation } from "@toolpad/core/AppProvider";
import {
    Add,
    Chat,
    Dashboard,
    EmojiObjects,
    Extension,
    Hail,
    Hardware,
    Person,
    Repeat,
    School,
    Settings,
    SwitchAccount,
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
        segment: "databronnen",
        title: "Databronnen",
        icon: <School />,
    },
    {
        segment: "action",
        title: "Actions",
        icon: <Repeat />,
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
