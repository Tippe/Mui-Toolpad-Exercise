import * as React from "react";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NAVIGATION } from "./routes";
import {
    Authentication,
    AuthProvider,
    AuthResponse,
    Session,
    SignInPage,
} from "@toolpad/core";
import Layout from "./layouts/DashboardLayout";
import { theme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./config/auth/authConfig";

const providers: AuthProvider[] = [
    { id: "github", name: "GitHub" },
    { id: "google", name: "Google" },
    { id: "facebook", name: "Facebook" },
    { id: "twitter", name: "Twitter" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "microsoft-entra-id", name: "Microsoft" },
];

const BRANDING = {
    title: "Personal Workspace",
};

export default function App() {
    const { instance } = useMsal();
    const [session, setSession] = React.useState<Session | null>();

    const signIn = async (provider: AuthProvider): Promise<AuthResponse> => {
        if (provider.id === "microsoft-entra-id") {
            try {
                const loginResp = await instance.loginPopup(loginRequest);
                const account = loginResp.account;

                const tokenResp = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account,
                });

                if (tokenResp?.accessToken) {
                    localStorage.setItem("accessToken", tokenResp.accessToken);
                }

                setSession({
                    user: {
                        name: "Tippe van Roosmalen",
                        email: "tippe.van.roosmalen@netflex.nl",
                        //image: "blob:https://developer.microsoft.com/f7929c2c-f648-41b5-b681-957a9750a3d0",
                    },
                });

                console.log("Je bent ingelogd!:");

                return {};
            } catch (e) {
                console.error("Microsoft login failed", e);
                return { error: "Provider not supported yet" };
            }
        }

        // For other providers, do nothing for now
        return { error: "Provider not supported yet" };
    };

    const authentication: Authentication = React.useMemo(() => {
        return {
            signIn: (provider?: AuthProvider) =>
                signIn(
                    provider ?? { id: "microsoft-entra-id", name: "Microsoft" }
                ),
            signOut: () => {
                setSession(null), localStorage.removeItem("accessToken");
            },
        };
    }, []);

    if (!session) {
        return <SignInPage signIn={signIn} providers={providers} />;
    }

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            authentication={authentication}
            session={session}
            theme={theme}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Layout />
            </LocalizationProvider>
        </ReactRouterAppProvider>
    );
}
