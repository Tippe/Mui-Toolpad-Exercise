import * as React from "react";
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Checklist, Close, Visibility } from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

export default function ToDoCard({ height }: { height?: number | string }) {
    const [newTask, setNewTask] = React.useState("");
    const [tasks, setTasks] = React.useState([
        "Review and approve the new marketing campaign draft",
        "Update product inventory for August sales",
        "Follow up with supplier regarding delayed shipment",
        "Prepare presentation slides for Monday's team meeting",
        "Respond to customer feedback from the support portal",
    ]);
    
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks((prev) => [...prev, newTask]);
            setNewTask("");
        }
    };

    const handleRemoveTask = (index: number) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <DashboardCard
            title="To Do"
            subtitle="Suggestions"
            height={height}
            icon={<Checklist sx={{ fontSize: 30 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {tasks.map((task, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    borderRadius: 2,
                                    padding: 0.5,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                elevation={0}
                                variant="outlined"
                            >
                                <Checkbox edge="start" />
                                <ListItemText primary={task} />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveTask(index)}
                                    >
                                    <Close fontSize="small" />
                                </IconButton>
                            </Paper>
                        ))}
                    </List>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                    >
                        Your remaining notes ✨
                    </Typography>
                </Box>
            }
        />
    );
}
