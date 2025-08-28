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
import { Stack, Typography } from "@mui/material";
import { getConnection } from "./utils/signalR";
import { Settings } from "@mui/icons-material";

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

                        // Start SignalR Connection
                        console.log("🟢 About to connect to SignalR");

                        getConnection(
                            "https://signalr.local:5101/ChatHub",
                            tokenResp.accessToken
                        );
                    }
                } catch (e) {
                    console.error("❌ acquireTokenSilent failed:", e);
                }
            } else {
                console.log("⚠️ No accounts found, user is not logged in");
            }

            setLoading(false);
            console.log("🔹 Finished session restore");
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

                // Start SignalR Connection
                const token = localStorage.getItem("accessToken");
                if (!token) throw new Error(`No token given, \n ${token}`);
                console.log("🟢 About to connect to SignalR with token");

                getConnection("https://signalr.local:5101/ChatHub", token);
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
        return (
            <Stack
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    mt: 15,
                }}
            >
                <Settings
                    sx={{
                        fontSize: 300,
                        animation: "spinVary 5s infinite",
                        "@keyframes spinVary": {
                            "100%": { transform: "rotate(360deg)" },
                        },
                        animationTimingFunction: "linear",
                    }}
                />
                <Typography variant="h2" sx={{ fontWeight: 400 }}>
                    Loading . . .
                </Typography>
            </Stack>
        );
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
