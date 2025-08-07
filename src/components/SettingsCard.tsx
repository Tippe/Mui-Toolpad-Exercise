import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Settings, Visibility } from "@mui/icons-material";

export default function SettingsCard() {
    return (
        <DashboardCard
            title="Instellingen"
            subtitle="Test"
            category="texteditor"
            height={600}
            icon={<Settings sx={{ fontSize: 35 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={<Typography>Hier komt dynamische content</Typography>}
        />
    );
}
