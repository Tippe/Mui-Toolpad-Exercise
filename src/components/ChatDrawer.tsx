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
    Grid,
    Divider,
    Autocomplete,
    Chip,
} from "@mui/material";
import {
    AccountBalance,
    AttachMoney,
    Chat,
    Code,
    HeadsetMic,
    LocalShipping,
    People,
    Send,
} from "@mui/icons-material";
import Droppable from "./Interactive/Droppable";
import { ChatBubble, ChatMessage } from "./ChatBubble";

const drawerWidth = 640;

const brains = [
    { label: "Dev", icon: <Code fontSize="small" /> },
    { label: "Finance", icon: <AccountBalance fontSize="small" /> },
    { label: "HR", icon: <People fontSize="small" /> },
    { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
    { label: "Sales", icon: <AttachMoney fontSize="small" /> },
    { label: "Support", icon: <HeadsetMic fontSize="small" /> },
];

export default function ChatDrawer() {
    const [messages, setMessages] = React.useState<ChatMessage[]>([
        { id: 1, text: "Welkom bij de chat!", from: "ai" },
        { id: 2, text: "Hi! Hoe werkt dit?", from: "user" },
        { id: 3, text: "Je kunt acties draggen naar hier en vragen stellen.", from: "ai" },
        { id: 4, text: "Ah, duidelijk!", from: "user" },
    ]);
    const [message, setMessage] = React.useState("");
    const [selectedBrains, setSelectedBrains] = React.useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);

    const sendMessage = () => {
        if (!message.trim() && selectedBrains.length === 0) return;
        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                text: message,
                from: "user",
                brains: selectedBrains,
            },
        ]);
        setMessage("");
        setSelectedBrains([]);
        setShowAutocomplete(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMessage(value);
        setShowAutocomplete(value.endsWith("@"));
    };

    const handleSelectBrain = (brainLabel: string) => {
        setSelectedBrains((prev) =>
            prev.includes(brainLabel) ? prev : [...prev, brainLabel]
        );
        setMessage(""); // reset text after selecting
        setShowAutocomplete(false);
    };

    const handleDeleteBrain = (brainLabel: string) => {
        setSelectedBrains((prev) => prev.filter((b) => b !== brainLabel));
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
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    my: 2,
                    top: 80,
                    right: 24,
                    height: "calc(100% - 114px)",
                    border: 0,
                    boxShadow: `
                        0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                        0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                        0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                },
            }}
        >
            <Grid container spacing={3} sx={{ p: 2 }}>
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
                    <Typography variant="h6">Chat</Typography>
                    <Typography variant="caption">
                        Ask questions to AI
                    </Typography>
                </Grid>
            </Grid>

            <Divider />



            <Droppable id="chat-drawer" highlightOnHover>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    height: "100%",
                    p: 2,
                }}>
                    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}
                    </Box>

                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        {showAutocomplete && (
                            <Autocomplete
                                options={brains
                                    .map((b) => b.label)
                                    .filter((label) => !selectedBrains.includes(label))}
                                size="small"
                                autoHighlight
                                open
                                onChange={(e, value) => {
                                    if (value) handleSelectBrain(value);
                                }}
                                renderOption={(props, option) => {
                                    const brain = brains.find(
                                        (b) => b.label === option
                                    );
                                    return (
                                        <ListItem {...props}>
                                            {brain?.icon}
                                            <ListItemText style={{ marginLeft: 8 }}>
                                                {option}
                                            </ListItemText>
                                        </ListItem>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Selecteer een Brain"
                                    />
                                )}
                            />
                        )}

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedBrains.map((brain) => {
                                const brainData = brains.find((b) => b.label === brain);
                                return (
                                    <Chip
                                        key={brain}
                                        label={brain}
                                        icon={brainData?.icon}
                                        onDelete={() => handleDeleteBrain(brain)}
                                    />
                                );
                            })}
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={message}
                                onChange={handleInputChange}
                                placeholder="Typ je bericht..."
                            />
                            <IconButton color="primary" type="submit">
                                <Send />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Droppable>
        </Drawer >
    );
}
