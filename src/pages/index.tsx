import * as React from "react";
import { Box, Grid, Grow, Stack, Zoom } from "@mui/material";
import ChatCard from "../components/ChatCard";
import NotificationCard from "../components/NotificationCard";
import BrainCard from "../components/BrainCard";
import BuddyCard from "../components/BuddyCard";
import ToDoCard from "../components/ToDoCard";
import SettingsCard from "../components/SettingsCard";
import NoteCard from "../components/NoteCard";

export default function DashboardPage() {
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setChecked(true);
        }, 200); // korte vertraging voor een smooth effect
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{ pt: 0, mt: 0 }}>
                <Grow
                    in={checked}
                    style={{
                        transitionDelay: checked ? "0ms" : "0ms",
                    }}
                >
                    <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                        <Stack spacing={2}>
                            <NotificationCard />
                            <SettingsCard />
                        </Stack>
                    </Grid>
                </Grow>
                <Grow
                    in={checked}
                    style={{
                        transitionDelay: checked ? "100ms" : "0ms",
                    }}
                >
                    <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                        <Stack spacing={2}>
                            <BrainCard />
                            <BuddyCard />
                        </Stack>
                    </Grid>
                </Grow>
                <Grow
                    in={checked}
                    style={{
                        transitionDelay: checked ? "200ms" : "0ms",
                    }}
                >
                    <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                        <Stack spacing={2}>
                            <ToDoCard />
                            <NoteCard />
                        </Stack>
                    </Grid>
                </Grow>
                <Grow
                    in={checked}
                    style={{
                        transitionDelay: checked ? "300ms" : "0ms",
                    }}
                >
                    <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                        <ChatCard />
                    </Grid>
                </Grow>
            </Grid>
        </>
    );
}
