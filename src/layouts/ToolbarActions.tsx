import * as React from "react";
import { ThemeSwitcher } from "@toolpad/core";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    Stack,
    Typography,
} from "@mui/material";
import {
    CheckCircle,
    Email,
    Notifications,
    Warning,
} from "@mui/icons-material";

export default function ToolbarActions() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Mock notifications
    const notifications = {
        Microsoft: [
            {
                icon: <Email color="primary" fontSize="small" />,
                text: "Email ontvangen",
            },
            {
                icon: <Warning color="error" fontSize="small" />,
                text: "Email niet verzonden",
            },
        ],
        Systeem: [
            {
                icon: <Warning color="warning" fontSize="small" />,
                text: "Server load hoog",
            },
            {
                icon: <CheckCircle color="success" fontSize="small" />,
                text: "Backup voltooid",
            },
        ],
        Overig: [
            {
                icon: <CheckCircle color="info" fontSize="small" />,
                text: "Nieuwe blogpost beschikbaar",
            },
        ],
    };

    const totalCount =
        notifications.Microsoft.length +
        notifications.Systeem.length +
        notifications.Overig.length;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack direction="row" spacing={1}>
            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ overflowY: "auto" }}
                PaperProps={{
                    sx: {
                        "& .MuiMenu-list": {
                            paddingTop: 0,
                            paddingBottom: 0,
                        },
                    },
                }}
            >
                {/* Header with badge */}
                <Stack
                    direction="row"
                    sx={{
                        px: 2,
                        py: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography sx={{ fontWeight: "bold" }}>
                        Notifications
                    </Typography>
                    <Badge badgeContent={totalCount} color="primary" />
                </Stack>
                <Divider />

                {/* Microsoft */}
                <Accordion disableGutters>
                    <AccordionSummary>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: "100%" }}
                        >
                            <Typography>Microsoft</Typography>
                            <Badge
                                badgeContent={notifications.Microsoft.length}
                                color="primary"
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {notifications.Microsoft.map((n, i) => (
                                <ListItem key={i}>
                                    <ListItemIcon>{n.icon}</ListItemIcon>
                                    <ListItemText primary={n.text} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Systeem */}
                <Accordion disableGutters>
                    <AccordionSummary>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: "100%" }}
                        >
                            <Typography>Systeem</Typography>
                            <Badge
                                badgeContent={notifications.Systeem.length}
                                color="primary"
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {notifications.Systeem.map((n, i) => (
                                <ListItem key={i}>
                                    <ListItemIcon>{n.icon}</ListItemIcon>
                                    <ListItemText primary={n.text} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Overig */}
                <Accordion disableGutters>
                    <AccordionSummary>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: "100%" }}
                        >
                            <Typography>Overig</Typography>
                            <Badge
                                badgeContent={notifications.Overig.length}
                                color="primary"
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {notifications.Overig.map((n, i) => (
                                <ListItem key={i}>
                                    <ListItemIcon>{n.icon}</ListItemIcon>
                                    <ListItemText primary={n.text} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Menu>

            {/* Notification icon in toolbar */}
            <IconButton onClick={handleClick}>
                <Badge badgeContent={totalCount} color="primary">
                    <Notifications />
                </Badge>
            </IconButton>

            <ThemeSwitcher />
        </Stack>
    );
}
