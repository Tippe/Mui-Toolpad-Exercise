import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton, TextField } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Notes, Visibility } from "@mui/icons-material";

export default function NoteCard() {
    return (
        <DashboardCard
            title="Notities"
            subtitle="Test"
            category="file"
            height={400}
            icon={<Notes sx={{ fontSize: 30 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
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
