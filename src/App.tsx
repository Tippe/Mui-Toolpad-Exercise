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
import { Box } from "@mui/material";

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
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const tryRestoreSession = async () => {
            await instance.initialize();

            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                const account = accounts[0];
                instance.setActiveAccount(account);

                try {
                    const tokenResp = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account,
                    });

                    if (tokenResp?.accessToken) {
                        localStorage.setItem(
                            "accessToken",
                            tokenResp.accessToken
                        );

                        setSession({
                            user: {
                                name: account.name || "User",
                                email: account.username,
                            },
                        });
                        console.log("✅ Session state set");
                    }
                } catch (e) {
                    console.error("❌ acquireTokenSilent failed:", e);
                }
            } else {
                console.log("⚠️ No accounts found, user is not logged in");
            }

            setLoading(false);
            console.log("🔹 Finished session restore, loading set to false");
        };

        tryRestoreSession();
    }, [instance]);

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
                        name: account?.name || "User",
                        email: account?.username,
                    },
                });

                console.log("✅ Je bent ingelogd!");
                return {};
            } catch (e) {
                console.error("❌ Microsoft login failed", e);
                return { error: "Login mislukt" };
            }
        }

        return { error: "Provider not supported yet" };
    };

    const authentication: Authentication = React.useMemo(() => {
        return {
            signIn: (provider?: AuthProvider) =>
                signIn(
                    provider ?? { id: "microsoft-entra-id", name: "Microsoft" }
                ),
            signOut: () => {
                setSession(null);
                //localStorage.removeItem("accessToken");
                instance.logoutPopup(); // Optional
            },
        };
    }, [instance]);

    if (loading) {
        return <Box>Bezig met sessie herstellen...</Box>;
    }

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
