import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton, TextField } from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { CalendarViewDay, Notes, Visibility } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers";

export default function AgendaCard({ height }: { height?: number | string }) {
    return (
        <DashboardCard
            title="Agenda"
            subtitle="See your day"
            height={height}
            icon={<CalendarViewDay sx={{ fontSize: 30 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={
                <DateCalendar />
            }
        />
    );
}
