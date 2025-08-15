import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

/**
 * Checkt of de gebruiker is ingelogd en pakt de accessToken voor een 'Silent Login'
 */
export function useSilentToken() {
    const { instance } = useMsal();

    useEffect(() => {
        const trySilentLogin = async () => {
            const accounts = instance.getAllAccounts();

            if (accounts.length > 0) {
                instance.setActiveAccount(accounts[0]);
                try {
                    const response = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0],
                    });
                    localStorage.setItem("accessToken", response.accessToken);
                    console.log("✅ Silent login gelukt!");
                } catch (e) {
                    console.error("❌ acquireTokenSilent error:", e);
                }
            } else {
                console.warn("Geen accounts bekend, gebruiker is niet ingelogd.");
            }
        };

        trySilentLogin();
    }, [instance]);
}