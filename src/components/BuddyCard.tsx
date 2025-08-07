import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Hail } from "@mui/icons-material";

export default function BuddyCard() {
    return (
        <DashboardCard
            title="Buddy's"
            subtitle="Test"
            category="socialmedia"
            height={400}
            icon={<Hail sx={{ width: 30, height: 30 }} />}
            actions={<Button variant="contained">Bekijk</Button>}
            front={<Typography>Hier komt dynamische content</Typography>}
        />
    );
}
