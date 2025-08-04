import * as React from "react";
import { useDialogs } from "@toolpad/core";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import {
    Error,
    Info,
    Notifications,
    TaskAlt,
    Warning,
} from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";
import { AnimatedDialog } from "../layouts/AnimatedDialog";

const alertsCategories = {
    Emails: [
        { severity: "success", text: "Email ontvangen", variant: "standard" },
        { severity: "error", text: "Email niet verzonden", variant: "filled" },
        {
            severity: "success",
            text: "Bijlage succesvol gedownload",
            variant: "outlined",
        },
        {
            severity: "warning",
            text: "Email server reageert traag",
            variant: "standard",
        },
        {
            severity: "info",
            text: "Nieuw contact toegevoegd via email",
            variant: "standard",
        },
        {
            severity: "error",
            text: "Spamfilter blokkeerde legitiem bericht",
            variant: "outlined",
        },
        {
            severity: "success",
            text: "Emailarchief gesynchroniseerd",
            variant: "filled",
        },
    ],
    Teams: [
        { severity: "info", text: "Nieuw Teams bericht", variant: "outlined" },
        {
            severity: "warning",
            text: "Teams notificatie vertraging",
            variant: "standard",
        },
        {
            severity: "success",
            text: "Teamvergadering gepland",
            variant: "filled",
        },
        {
            severity: "error",
            text: "Kan Teams server niet bereiken",
            variant: "standard",
        },
        {
            severity: "info",
            text: "Nieuw kanaal aangemaakt",
            variant: "standard",
        },
        {
            severity: "success",
            text: "Teams status bijgewerkt",
            variant: "outlined",
        },
    ],
    Systeem: [
        { severity: "error", text: "Brain is offline", variant: "standard" },
        {
            severity: "success",
            text: "Systeem update voltooid",
            variant: "filled",
        },
        {
            severity: "warning",
            text: "Opslagcapaciteit bijna vol",
            variant: "standard",
        },
        {
            severity: "error",
            text: "Database connectie verloren",
            variant: "filled",
        },
        { severity: "info", text: "Back-up voltooid", variant: "outlined" },
        {
            severity: "success",
            text: "Nieuwe module geïnstalleerd",
            variant: "standard",
        },
        {
            severity: "warning",
            text: "Netwerk latency verhoogd",
            variant: "outlined",
        },
    ],
    Overig: [
        {
            severity: "info",
            text: "Er zijn geen nieuwe meldingen",
            variant: "standard",
        },
        {
            severity: "warning",
            text: "Onbekend apparaat gedetecteerd",
            variant: "outlined",
        },
        {
            severity: "success",
            text: "Nieuwe gebruiker geregistreerd",
            variant: "filled",
        },
        {
            severity: "info",
            text: "Beveiligingslogboek bijgewerkt",
            variant: "standard",
        },
        {
            severity: "error",
            text: "Fout bij het laden van dashboard",
            variant: "filled",
        },
    ],
};

const categories = Object.entries(alertsCategories);

export default function NotificationCard() {
    const dialogs = useDialogs();

    const handleOpen = async () => {
        await dialogs.open(({ open, onClose }) => (
            <AnimatedDialog
                open={open}
                close={onClose}
                title="Notificaties"
                category="start"
                subtitle="Hier komen alle notificaties en melden te zien"
                icon={<Notifications sx={{ width: 30, height: 30 }} />}
                items={categories}
                renderItem={([categoryName, items]) => (
                    <Grid
                        size={{ sm: 12, md: 6, lg: 3 }}
                        sx={{ mb: 1, height: "100%" }}
                    >
                        <Paper elevation={2} sx={{ p: 2, height: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {categoryName}
                            </Typography>
                            <Stack direction="column" flexWrap="wrap" gap={1}>
                                {items.map((item, idx) => (
                                    <Alert
                                        key={idx}
                                        severity={item.severity as any}
                                        variant={item.variant as any}
                                        sx={{ minWidth: 200 }}
                                    >
                                        {item.text}
                                    </Alert>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                )}
            />
        ));
    };

    const allAlerts = Object.values(alertsCategories).flat();

    return (
        <DashboardCard
            title="Notificaties"
            subtitle="Hier komen alle notificaties"
            category="start"
            height={400}
            icon={<Notifications sx={{ width: 30, height: 30 }} />}
            actions={
                <Button variant="contained" onClick={handleOpen}>
                    Bekijk
                </Button>
            }
            front={
                <Stack gap={2} sx={{ width: 1 }}>
                    {allAlerts.map((item, idx) => (
                        <Alert
                            key={idx}
                            severity={item.severity as any}
                            variant={item.variant as any}
                            sx={{ minWidth: 200 }}
                        >
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            back={
                <Grid container>
                    <List
                        sx={{ width: 1 }}
                        subheader={
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                            >
                                Show
                            </ListSubheader>
                        }
                    >
                        <ListItem>
                            <ListItemIcon>
                                <Error color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Error Message" />
                            <Switch edge="end" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Warning color="warning" />
                            </ListItemIcon>
                            <ListItemText primary="Warning Message" />
                            <Switch edge="end" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <TaskAlt color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Success Message" />
                            <Switch edge="end" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Info color="info" />
                            </ListItemIcon>
                            <ListItemText primary="Info Message" />
                            <Switch edge="end" />
                        </ListItem>
                    </List>
                </Grid>
            }
        />
    );
}
