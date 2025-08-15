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
    AttachMoney,
    Balance,
    Chat,
    People,
    Send,
    Web,
} from "@mui/icons-material";

const drawerWidth = 320;

const brains = [
    { label: "GPT", icon: <Web fontSize="small" /> },
    { label: "Sales", icon: <AttachMoney fontSize="small" /> },
    { label: "Legal", icon: <Balance fontSize="small" /> },
    { label: "Human Resources", icon: <People fontSize="small" /> },
];

export default function ChatDrawer() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Welkom bij de chat!", brains: [] as string[] },
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

            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <List>
                    {messages.map((msg) => (
                        <ListItem key={msg.id}>
                            <ListItemText
                                primary={msg.text || "(geen tekst)"}
                                secondary={
                                    msg.brains.length > 0
                                        ? msg.brains.join(", ")
                                        : undefined
                                }
                            />
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
                sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}
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
                                <li {...props}>
                                    {brain?.icon}
                                    <span style={{ marginLeft: 8 }}>
                                        {option}
                                    </span>
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Selecteer een Databron"
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
        </Drawer>
    );
}
