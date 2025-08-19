import * as React from "react";
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Grow,
    IconButton,
    InputBase,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography,
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

export default function ChatPage() {
    const [checked] = React.useState(true);
    const [question, setQuestion] = React.useState("");
    const [selectedBrains, setSelectedBrains] = React.useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const brains = [
        { label: "Dev", icon: <Code fontSize="small" /> },
        { label: "Finance", icon: <AccountBalance fontSize="small" /> },
        { label: "HR", icon: <People fontSize="small" /> },
        { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
        { label: "Sales", icon: <AttachMoney fontSize="small" /> },
        { label: "Support", icon: <HeadsetMic fontSize="small" /> },
    ];

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestion(value);
        setShowAutocomplete(value.endsWith("@"));
    };

    const handleSelectBrain = (brainLabel: string) => {
        setSelectedBrains((prev) =>
            prev.includes(brainLabel) ? prev : [...prev, brainLabel]
        );
        setQuestion(""); // reset na selectie
        setShowAutocomplete(false);
    };

    const handleDeleteBrain = (brainLabel: string) => {
        setSelectedBrains((prev) => prev.filter((b) => b !== brainLabel));
    };

    const handleSend = () => {
        if (!question.trim() && selectedBrains.length === 0) return;
        console.log("Verstuur:", { question, selectedBrains });
        setQuestion("");
        setSelectedBrains([]);
        setShowAutocomplete(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
            <Stack
                spacing={3}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "secondary",
                    flexGrow: 1,
                    overflow: "auto",
                    mt: { xs: 1, sm: 1, md: 0 },
                }}
            >
                <Typography variant="h6" sx={{ opacity: 0.7 }}>
                    🎉 Welkom!
                    <br />
                    Stel je eerste vraag om te beginnen.
                </Typography>
            </Stack>

            <Stack
                sx={{
                    position: "sticky",
                    bottom: 0,
                    py: 2,
                    gap: 1,
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
                                placeholder="Selecteer een Brain"
                            />
                        )}
                    />
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
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

                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        bottom: 0,
                        p: 1,
                    }}
                >
                    <InputBase
                        multiline
                        maxRows={5}
                        placeholder="Wat wil je vragen?"
                        value={question}
                        onChange={handleInputChange}
                        sx={{ ml: 1, flex: 1 }}
                    />
                    <Divider
                        orientation="vertical"
                        sx={{ height: 28, mr: 1 }}
                    />
                    <IconButton
                        aria-label="Send"
                        onClick={handleSend}
                        color="primary"
                        sx={{ p: 1 }}
                    >
                        <Send />
                    </IconButton>
                </Paper>
            </Stack>
        </Box>
    );
}
