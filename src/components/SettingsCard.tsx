import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Settings } from "@mui/icons-material";

export default function SettingsCard() {
    return (
        <DashboardCard
            title="Instellingen"
            subtitle="Test"
            category="texteditor"
            height="calc(50vh - 236px)"
            icon={<Settings sx={{ width: 30, height: 30 }} />}
            actions={<Button variant="contained">Bekijk</Button>}
            front={<Typography>Hier komt dynamische content</Typography>}
        />
    );
}
