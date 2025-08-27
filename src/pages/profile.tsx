import * as React from "react";
import Typography from "@mui/material/Typography";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Fade,
    Grid,
    Slide,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import { Business, CalendarMonth, Place } from "@mui/icons-material";
import TabPanel from "../components/TabPanel";

export default function ProfilePage() {
    const [tab, setTab] = React.useState(0);

    return (
        <Grid container>
            <Grid size={12}>
                <Card
                    sx={{
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="column"
                            sx={{ alignItems: "center", gap: 2 }}
                        >
                            <Avatar sx={{ width: 100, height: 100 }} />
                            <Typography variant="h6">
                                Tippe van Roosmalen
                            </Typography>
                            <Stack
                                direction="row"
                                sx={{
                                    gap: 5,
                                    alignItems: "center",
                                    color: "text.secondary",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    sx={{ gap: 1, alignItems: "center" }}
                                >
                                    <Business />
                                    <Typography variant="subtitle2">
                                        Software Developer
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    sx={{ gap: 1, alignItems: "center" }}
                                >
                                    <Place />
                                    <Typography variant="subtitle2">
                                        Breda
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    sx={{ gap: 1, alignItems: "center" }}
                                >
                                    <CalendarMonth />
                                    <Typography variant="subtitle2">
                                        Sinds 1 April 2025
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Tabs
                            value={tab}
                            onChange={(_, newValue) => setTab(newValue)}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Overzicht" />
                            <Tab label="Documenten" />
                            <Tab label="Activiteit" />
                        </Tabs>
                    </Box>
                </Card>

                <TabPanel value={tab} index={0}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography>Test</Typography>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={tab} index={1}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography>Test 2</Typography>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={tab} index={2}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography>Test 3</Typography>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Grid>
        </Grid>
    );
}
