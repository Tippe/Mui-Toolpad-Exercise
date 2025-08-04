import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation, Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
    AuthResponse,
    SignInPage,
    type AuthProvider,
} from "@toolpad/core/SignInPage";
import { Account } from "@toolpad/core";
import CustomMenu from "./layouts/custom-menu";
import {
    Add,
    Chat,
    Contacts,
    EmojiObjects,
    Extension,
    Folder,
    Hail,
    Hardware,
    Person,
    Repeat,
    Settings,
    SwitchAccount,
} from "@mui/icons-material";
import { Box, Fade } from "@mui/material";

const demoSession = {
    user: {
        name: "Tippe van Roosmalen",
        email: "tippe.van.roosmalen@netflex.nl",
        image: "blob:https://developer.microsoft.com/f7929c2c-f648-41b5-b681-957a9750a3d0",
    },
};

const NAVIGATION: Navigation = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
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
        //segment: "profile",
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

const BRANDING = {
    title: "Personal Workspace",
};

const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
    provider
) => {
    // preview-start
    const promise = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve({ error: "This is a fake error" });
        }, 500);
    });
    // preview-end
    return promise;
};

export default function App() {
    const [session, setSession] = React.useState<Session | null>(demoSession);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession(demoSession);
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout
                slots={{
                    toolbarAccount: () => (
                        <Account slots={{ popoverContent: CustomMenu }} />
                    ),
                }}
            >
                <PageContainer title="" breadcrumbs={[]} maxWidth={false}>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
            {/* <SignInPage
                providers={[{ id: "microsoft-entra-id", name: "Microsoft" }]}
                signIn={signIn}
            /> */}
        </ReactRouterAppProvider>
    );
}
