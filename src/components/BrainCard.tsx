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
    Height,
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

export default function BrainCard({ height }: { height?: number | string }) {
    return (
        <DashboardCard
            title="Brains"
            subtitle="Test"
            category="file"
            height={height}
            icon={<EmojiObjects sx={{ fontSize: 30 }} />}
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
