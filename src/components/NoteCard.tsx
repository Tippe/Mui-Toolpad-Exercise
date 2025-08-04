import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Notes } from "@mui/icons-material";

export default function NoteCard() {
    return (
        <DashboardCard
            title="Notities"
            subtitle="Test"
            category="file"
            height="calc(50vh - 236px)"
            icon={<Notes sx={{ width: 30, height: 30 }} />}
            actions={<Button variant="contained">Bekijk</Button>}
            front={
                <TextField
                    variant="outlined"
                    multiline
                    rows={14}
                    placeholder="Schrijf hier je notities"
                    fullWidth
                />
            }
        />
    );
}
