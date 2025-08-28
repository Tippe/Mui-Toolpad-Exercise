import * as React from "react";
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ChatCard from "./components/ChatCard";
import SessionTab from "./components/SessionTab";
import ActionTab from "./components/ActionTab";
import BrainTab from "./components/BrainTab";

export default function WorkspacePage() {
    const [tab, setTab] = React.useState(0);
    const [search, setSearch] = React.useState<string>("");

    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <ChatCard />
            </Grid>
            <Grid size={4}>
                <Card sx={{ borderRadius: 4 }}>
                    <Tabs
                        value={tab}
                        onChange={(_, newValue) => setTab(newValue)}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Chats" />
                        <Tab label="Actions" />
                        <Tab label="Brains" />
                    </Tabs>

                    <Stack direction="row" sx={{ mt: 2, px: 2 }}>
                        <TextField
                            placeholder="Zoek een Action"
                            size="small"
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton color="primary">
                            <Search />
                        </IconButton>
                    </Stack>
                    <SessionTab tab={tab} />
                    <ActionTab tab={tab} />
                    <BrainTab tab={tab} />
                </Card>
            </Grid>
        </Grid>
    );
}
