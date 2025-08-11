import * as React from "react";
import { useDialogs } from "@toolpad/core";
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import {
    Delete,
    Domain,
    Error,
    Folder,
    Info,
    Microsoft,
    MiscellaneousServices,
    Notifications,
    TaskAlt,
    Visibility,
    Warning,
} from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";
import { AnimatedDialog } from "../layouts/AnimatedDialog";

const alertsCategories = {
    Microsoft: [
        { severity: "success", text: "Email ontvangen", variant: "standard" },
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
        { severity: "info", text: "Nieuw Teams bericht", variant: "outlined" },
        {
            severity: "warning",
            text: "Teams notificatie vertraging",
            variant: "standard",
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
            severity: "warning",
            text: "Opslagcapaciteit bijna vol",
            variant: "standard",
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
            severity: "info",
            text: "Beveiligingslogboek bijgewerkt",
            variant: "standard",
        },
    ],
};

const categories = Object.entries(alertsCategories);

export default function NotificationCard({
    height,
}: {
    height?: number | string;
}) {
    const dialogs = useDialogs();

    const handleOpen = async () => {
        await dialogs.open(({ open, onClose }) => (
            <AnimatedDialog
                open={open}
                close={onClose}
                title="Notificaties"
                category="start"
                subtitle="Hier komen alle notificaties en melden te zien"
                icon={<Notifications sx={{ fontSize: 30 }} />}
                items={categories}
                renderItem={([categoryName, items]) => (
                    <Grid
                        size={{ sm: 12, md: 6, lg: 4 }}
                        sx={{ height: "100%" }}
                    >
                        <Paper sx={{ p: 2, height: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {categoryName}
                            </Typography>
                            <Stack
                                direction="column"
                                flexWrap="wrap"
                                spacing={1}
                            >
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
    const totalAlerts = Object.values(alertsCategories).flat().length;

    return (
        <DashboardCard
            title="Notificaties"
            subtitle="notificaties"
            category="start"
            height={height}
            icon={
                <Badge badgeContent={totalAlerts} color="info">
                    <Notifications sx={{ fontSize: 30 }} />
                </Badge>
            }
            actions={
                <IconButton onClick={handleOpen}>
                    <Visibility />
                </IconButton>
            }
            front={
                <List>
                    {categories.map(([categoryName, alerts]) => (
                        <ListItem
                            secondaryAction={
                                <Badge
                                    badgeContent={alerts.length}
                                    color="info"
                                />
                            }
                        >
                            <ListItemText primary={categoryName} />
                        </ListItem>
                    ))}
                </List>
            }
            back={
                <Grid container>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Microsoft />
                            </ListItemIcon>
                            <ListItemText primary="Microsoft Berichten" />
                            <Switch edge="end" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Domain />
                            </ListItemIcon>
                            <ListItemText primary="Systeem Berichten" />
                            <Switch edge="end" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MiscellaneousServices />
                            </ListItemIcon>
                            <ListItemText primary="Overige Berichten" />
                            <Switch edge="end" />
                        </ListItem>
                    </List>
                </Grid>
            }
        />
    );
}
