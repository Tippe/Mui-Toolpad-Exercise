import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import DevelopmentBrain from "../components/Brains/DevBrain";
import HRBrain from "../components/Brains/HrBrain";
import LogisticsBrain from "../components/Brains/LogisticsBrain";
import SalesBrain from "../components/Brains/SalesBrain";
import SupportBrain from "../components/Brains/SupportBrain";
import FinanceBrain from "../components/Brains/FinanceBrain";
import { getBrainsConnection } from "../utils/brainsSignalR";
import BrainLayout from "../layouts/BrainLayout";
import { MenuBook, School } from "@mui/icons-material";

type Brain = {
    id: string;
    name: string;
    description: string;
    instructions: string;
    model: string;
    created_at: number;
    file_ids: string[];
};

export default function DataBronPage() {
    const [brains, setBrains] = React.useState<Brain[]>([]);

    React.useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log("AccessToken:", token);
        if (!token) throw new Error(`No token given, \n ${token}`);

        const connection = getBrainsConnection(
            "https://bd96wm7n-7045.euw.devtunnels.ms/ChatHub",
            token
        );

        const handleReceiveBrains = (brainsList: Brain[]) => {
            console.log("📥 Received brains:", brainsList);
            setBrains(brainsList);
        };

        connection.on("ReceiveBrains", handleReceiveBrains);

        return () => {
            connection.off("ReceiveBrains", handleReceiveBrains);
        };
    }, []);

    const askForBrains = async () => {
        const token = localStorage.getItem("accessToken");
        console.log("AccessToken:", token);
        if (!token) return;

        const connection = getBrainsConnection(
            "https://bd96wm7n-7045.euw.devtunnels.ms/ChatHub",
            token
        );

        try {
            console.log("📤 Asking server for Brains...");
            await connection.invoke("GetBrains");
        } catch (e) {
            console.error("❌ Failed to invoke GetBrains:", e);
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
            <Button onClick={askForBrains}>Get Brains</Button>

            <Grid container columnSpacing={3} rowSpacing={5}>
                {brains.map((brain: any, idx: number) => (
                    <Grid
                        key={idx}
                        size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}
                        minWidth={320}
                    >
                        <BrainLayout
                            title={brain.name}
                            front={brain.description}
                            back={brain.description}
                            icon={<School sx={{ fontSize: 35 }} />}
                            height={300}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
