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
        children: [
            {
                segment: "profile",
                title: "Persona's",
                icon: <SwitchAccount />,
            },
        ],
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
        segment: "buddy",
        title: "Buddy's",
        icon: <Hail />,
    },
    {
        segment: "brains",
        title: "Brains",
        icon: <EmojiObjects />,
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
                segment: "tools",
                title: "Tools",
                icon: <Hardware />,
            },
            {
                segment: "connector",
                title: "Connectors",
                icon: <Extension />,
            },
        ],
    },
];
