import * as React from "react";
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Fingerprint,
    Hardware,
    EmojiObjects,
    Visibility,
} from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

const rows = [
    {
        id: 1,
        icon: <Fingerprint />,
        name: "Identity",
    },
    {
        id: 2,
        icon: <Hardware />,
        name: "Builder",
    },
];

export default function BrainCard() {
    return (
        <DashboardCard
            title="Brains"
            subtitle="Test"
            category="file"
            height={400}
            icon={<EmojiObjects sx={{ fontSize: 35 }} />}
            actions={
                <IconButton href="./brains">
                    <Visibility />
                </IconButton>
            }
            front={
                <List dense>
                    {rows.map((row) => (
                        <ListItem key={row.id}>
                            <ListItemIcon>{row.icon}</ListItemIcon>
                            <ListItemText primary={row.name} />
                        </ListItem>
                    ))}
                </List>
            }
        />
    );
}
