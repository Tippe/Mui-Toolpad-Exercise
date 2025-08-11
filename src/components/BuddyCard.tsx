import * as React from "react";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
} from "@mui/material";
import DashboardCard from "../layouts/DashboardCard";
import { Hail, Visibility } from "@mui/icons-material";
import { buddysDataSource } from "../pages/buddys"; // Adjust this import to match your structure
import { Buddy } from "../pages/buddys";

export default function BuddyCard({ height }: { height?: number | string }) {
    const [buddys, setBuddys] = React.useState<Buddy[]>([]);

    React.useEffect(() => {
        const loadBuddys = async () => {
            try {
                const response = await (buddysDataSource.getMany as Function)({
                    paginationModel: { page: 0, pageSize: 5 },
                    filterModel: { items: [] },
                    sortModel: [],
                });
                setBuddys(response.items);
            } catch (err) {
                console.error("Failed to load buddies", err);
            }
        };

        loadBuddys();
    }, []);

    return (
        <DashboardCard
            title="Buddy's"
            subtitle="Test"
            category="socialmedia"
            height={height}
            icon={<Hail sx={{ fontSize: 30 }} />}
            actions={
                <IconButton href="/buddys">
                    <Visibility />
                </IconButton>
            }
            front={
                <List dense>
                    {buddys.map((buddy, index) => (
                        <React.Fragment key={buddy.id}>
                            {index !== 0 && (
                                <Divider sx={{ width: "100%", mb: 1 }} />
                            )}
                            <ListItem
                                key={buddy.id}
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    {buddy.name} - {buddy.role}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {buddy.description}
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {buddy.skills.map((skill) => (
                                        <Chip
                                            key={skill}
                                            size="small"
                                            label={skill}
                                        />
                                    ))}
                                </Box>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            }
        />
    );
}
