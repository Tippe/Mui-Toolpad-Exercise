import * as React from "react";
import { Grid, Typography } from "@mui/material";
import DevelopmentBrain from "../components/Brains/DevBrain";
import HRBrain from "../components/Brains/HrBrain";
import LogisticsBrain from "../components/Brains/LogisticsBrain";
import SalesBrain from "../components/Brains/SalesBrain";
import SupportBrain from "../components/Brains/SupportBrain";
import FinanceBrain from "../components/Brains/FinanceBrain";
import { connectToBrainsHub } from "../utils/brainsSignalR";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";

export default function BrainsPage() {
    const [streamText, setStreamText] = React.useState("");

    const token = "test";

    React.useEffect(() => {
        const connection = connectToBrainsHub(
            "https://b4bpxbq1-5000.euw.devtunnels.ms/ChatHub", // SignalR hub URL
            token,
        );

        return () => {
            connection.stop();
        };
    }, []);

    const brains = [
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
                {brains.map((BrainComponent, index) => (
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
                    <Typography component="pre">Test<pre>{streamText}</pre></Typography>
                </Grid>
            </Grid>
        </>
    );
}

