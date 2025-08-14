import * as React from "react";
import { Grid, Typography } from "@mui/material";
import DevelopmentBrain from "../components/Brains/DevBrain";
import HRBrain from "../components/Brains/HrBrain";
import LogisticsBrain from "../components/Brains/LogisticsBrain";
import SalesBrain from "../components/Brains/SalesBrain";
import SupportBrain from "../components/Brains/SupportBrain";
import FinanceBrain from "../components/Brains/FinanceBrain";

export default function BrainsPage() {
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
        </>
    );
}
