import React, { useState } from "react";
import {
    Drawer,
    Box,
    IconButton,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Divider,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet } from "react-router";
import { Close } from "@mui/icons-material";

const drawerWidth = 360;

export default function ChatDrawer() {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState([
        { id: 1, text: "Welkom bij de chat!" },
    ]);
    const [input, setInput] = useState("");

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { id: prev.length + 1, text: input }]);
        setInput("");
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Main content schuift mee naar links wanneer drawer open is */}

            {/* Jouw hoofdcontent hier */}
            <IconButton
                onClick={toggleDrawer}
                color="primary"
                aria-label="open chat"
                sx={{ position: "absolute", right: 8, top: 72 }}
            >
                <ChatIcon />
            </IconButton>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <Box
                    sx={{
                        height: "calc(100vh - 64px)", // 64px is header height
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        bgcolor: "background.paper",
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            mt: "64px",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6">Chat</Typography>
                        <IconButton
                            onClick={toggleDrawer}
                            aria-label="close chat"
                        >
                            <Close />
                        </IconButton>
                    </Stack>

                    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
                        <List>
                            {messages.map((msg) => (
                                <ListItem key={msg.id}>
                                    <ListItemText primary={msg.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        sx={{ display: "flex", gap: 1 }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Typ je bericht..."
                        />
                        <Button variant="contained" type="submit">
                            Verstuur
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
