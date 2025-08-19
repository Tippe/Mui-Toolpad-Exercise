import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
    EmojiObjects,
    AttachMoney,
    People,
    Code,
    AccountBalance,
    LocalShipping,
    HeadsetMic,
} from "@mui/icons-material";
import DashboardCard from "../../layouts/DashboardCard";

const rows = [
    { label: "Dev", icon: <Code fontSize="small" /> },
    { label: "Finance", icon: <AccountBalance fontSize="small" /> },
    { label: "HR", icon: <People fontSize="small" /> },
    { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
    { label: "Sales", icon: <AttachMoney fontSize="small" /> },
    { label: "Support", icon: <HeadsetMic fontSize="small" /> },
];

export default function BrainCard({ height }: { height?: number | string }) {
    return (
        <DashboardCard
            title="Databronnen"
            subtitle="Informational vaults"
            height={height}
            icon={<EmojiObjects sx={{ fontSize: 30 }} />}
            front={
                <List dense>
                    {rows.map((row) => (
                        <ListItem>
                            <ListItemIcon>{row.icon}</ListItemIcon>
                            <ListItemText primary={row.label} />
                        </ListItem>
                    ))}
                </List>
            }
        />
    );
}
