import * as React from "react";
import { TextField } from "@mui/material";
import DashboardCard from "../../layouts/DashboardCard";
import { Notes } from "@mui/icons-material";

export default function NoteCard({ height }: { height?: number | string }) {
    return (
        <DashboardCard
            title="Notities"
            subtitle="Write notes"
            height={height}
            icon={<Notes sx={{ fontSize: 30 }} />}
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
