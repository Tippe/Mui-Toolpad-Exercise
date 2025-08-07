import * as React from "react";
import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Checklist } from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

export default function ToDoCard() {
    return (
        <DashboardCard
            title="To Do"
            subtitle="Test"
            category="texteditor"
            height={400}
            icon={<Checklist sx={{ width: 30, height: 30 }} />}
            actions={<Button variant="contained">Bekijk</Button>}
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
