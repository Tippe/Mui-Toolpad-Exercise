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
    Grid,
    Divider,
} from "@mui/material";
import { Chat, Send } from "@mui/icons-material";

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
        <Drawer
            variant="persistent"
            anchor="right"
            open={true}
            sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRadius: 4,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    overflow: "hidden",
                    my: 2,
                    top: 80,
                    height: "calc(100% - 114px)",
                    border: 0,
                    boxShadow:`
                        0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                        0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                        0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                },
            }}
        >
            
            

            <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid
                    size={2}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Chat />
                </Grid>
                <Grid size={10}>
                    <Typography variant="h6">
                        Chat
                    </Typography>
                </Grid>
            </Grid>

            <Divider />

            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
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
                sx={{ display: "flex", gap: 1, p: 2 }}
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
        </Drawer>
    );
}
