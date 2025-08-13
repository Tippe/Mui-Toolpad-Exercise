import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import DashboardCard from "../../layouts/DashboardCard";
import { Settings, Visibility } from "@mui/icons-material";

export default function SettingsCard({ height }: { height?: number | string }) {
    return (
        <DashboardCard
            title="Instellingen"
            subtitle="Quick settings"
            height={height}
            icon={<Settings sx={{ fontSize: 30 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={<Typography>Hier komt dynamische content</Typography>}
        />
    );
}
