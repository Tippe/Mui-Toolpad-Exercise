import * as React from "react";
import {
    Drawer,
    Box,
    IconButton,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Stack,
} from "@mui/material";
import { Send } from "@mui/icons-material";

const drawerWidth = 320;

export default function ChatDrawer() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Welkom bij de chat!" },
    ]);
    const [input, setInput] = React.useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { id: prev.length + 1, text: input }]);
        setInput("");
    };

    return (
        <Box sx={{ display: "flex" }}>
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
                open={true}
            >
                <Box
                    sx={{
                        height: "100vh",
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
                        <IconButton color="primary" type="submit">
                            <Send />
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
