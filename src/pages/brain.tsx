import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import DevelopmentBrain from "../components/Brains/DevBrain";
import HRBrain from "../components/Brains/HrBrain";
import LogisticsBrain from "../components/Brains/LogisticsBrain";
import SalesBrain from "../components/Brains/SalesBrain";
import SupportBrain from "../components/Brains/SupportBrain";
import FinanceBrain from "../components/Brains/FinanceBrain";
import { getConnection } from "../utils/signalR";
import BrainLayout from "../layouts/BrainLayout";
import { Psychology } from "@mui/icons-material";

export default function BrainPage() {
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
                            icon={<Psychology sx={{ fontSize: 35 }} />}
                            height={200}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
