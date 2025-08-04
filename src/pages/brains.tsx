import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Divider, Grid } from "@mui/material";
import { Fingerprint, Hardware } from "@mui/icons-material";

export default function BrainsPage() {
    return (
        <Grid container spacing={5}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid
                            size={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Fingerprint sx={{ fontSize: 50 }} />
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="h6">Identity</Typography>
                            <Typography>
                                Text about the Identity brain.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid
                            size={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Hardware sx={{ fontSize: 50 }} />
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="h6">Builder</Typography>
                            <Typography>
                                Text about the Identity brain.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
