import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import DevelopmentBrain from "../components/Brains/DevBrain";
import HRBrain from "../components/Brains/HrBrain";
import LogisticsBrain from "../components/Brains/LogisticsBrain";
import SalesBrain from "../components/Brains/SalesBrain";
import SupportBrain from "../components/Brains/SupportBrain";
import FinanceBrain from "../components/Brains/FinanceBrain";
import { connectToBrainsHub } from "../utils/brainsSignalR";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";

export default function BrainsPage() {
    const [brains, setBrains] = React.useState<string[]>([]);


    const token = "PUT ACCESSTOKEN HERE";

    
    const connection = connectToBrainsHub(
        "https://bd96wm7n-7045.euw.devtunnels.ms/ChatHub", // SignalR hub URL
        token,
    );

    React.useEffect(() => {
        if (!connection) return;

        connection.on("assistant", (brainsList: string[]) => {
            console.log("📥 Received assistants:", brainsList);
            setBrains(brainsList);
        });

        // Cleanup when component unmounts
        return () => {
            connection.off("GetAssistants");
            connection.stop();
        };
    }, [connection]);

    const askForBrains = async () => {
        if (!connection) return;
        try {
            console.log("📤 Asking server for Brains...");
            await connection.invoke("GetAssitants");
        } catch (e) {
            console.error("❌ Failed to invoke GetAssistants:", e);
        }
    };

    const brainCards = [
        DevelopmentBrain,
        HRBrain,
        LogisticsBrain,
        SalesBrain,
        SupportBrain,
        FinanceBrain,
    ];
    
    return (
        <>
            <Typography variant="h4" sx={{ pb: 2 }}>
                Selecteer een Brain en stel een vraag ...
            </Typography>
            <Grid container columnSpacing={3} rowSpacing={5}>
                {brainCards.map((BrainComponent, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}
                        minWidth={320}
                    >
                        <BrainComponent />
                    </Grid>
                ))}
            </Grid>
            <Grid container>
                <Grid size={12}>
                    <Typography variant="h4">Live Brain Stream</Typography>
                    <Button onClick={askForBrains}>Get Brains</Button>
                    <Typography component="pre">{brains}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

