import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Fab,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    SpeedDialIcon,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    ContentCopy,
    Mic,
    Send,
    Image,
    ExpandMore,
    Repeat,
    Delete,
    Fingerprint,
    Hardware,
    EmojiObjects,
} from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: "id",
        headerName: "ID",
        //width: 20,
    },
    {
        field: "icon",
        headerName: "Icoon",
        //width: 50,
        renderCell: (params) => params.value,
        editable: false,
    },
    {
        field: "name",
        headerName: "Naam",
        //width: 100,
        editable: true,
    },
];

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
            height="calc(50vh - 236px)"
            icon={<EmojiObjects sx={{ width: 30, height: 30 }} />}
            actions={
                <Button href="/brains" variant="contained">
                    Bekijk
                </Button>
            }
            front={
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={30}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />
            }
        />
    );
}
