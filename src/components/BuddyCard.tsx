import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Hail, Visibility } from "@mui/icons-material";

export default function BuddyCard() {
    return (
        <DashboardCard
            title="Buddy's"
            subtitle="Test"
            category="socialmedia"
            height={400}
            icon={<Hail sx={{ fontSize: 35 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={<Typography>Hier komt dynamische content</Typography>}
        />
    );
}
