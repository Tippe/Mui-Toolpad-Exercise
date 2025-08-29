import type { Navigation } from "@toolpad/core/AppProvider";
import {
    Add,
    Bolt,
    Chat,
    Extension,
    Hail,
    Person,
    Psychology,
    Settings,
    Workspaces,
} from "@mui/icons-material";

export const NAVIGATION: Navigation = [
    {
        title: "Workspace",
        icon: <Workspaces />,
    },
    {
        segment: "action",
        title: "Action Catalog",
        icon: <Bolt />,
    },
    {
        kind: "header",
        title: "Main items",
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
