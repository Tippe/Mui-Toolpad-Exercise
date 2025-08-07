import * as React from "react";
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Checklist, Visibility } from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

export default function ToDoCard() {
    return (
        <DashboardCard
            title="To Do"
            subtitle="Test"
            category="texteditor"
            height={400}
            icon={<Checklist sx={{ fontSize: 35 }} />}
            actions={
                <IconButton>
                    <Visibility />
                </IconButton>
            }
            front={
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox edge="start" />
                        </ListItemIcon>
                        <ListItemText primary={`Create Dashboard`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox edge="start" />
                        </ListItemIcon>
                        <ListItemText primary={`Add Cards`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox edge="start" />
                        </ListItemIcon>
                        <ListItemText primary={`Add Animations`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox edge="start" />
                        </ListItemIcon>
                        <ListItemText
                            primary={`Provide enterprise-grade Styling`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox edge="start" />
                        </ListItemIcon>
                        <ListItemText primary={`Improve Mock Data`} />
                    </ListItem>
                </List>
            }
        />
    );
}
