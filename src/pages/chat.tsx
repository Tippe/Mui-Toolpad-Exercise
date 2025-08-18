import * as React from "react";
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Chip,
    Grid,
    Grow,
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
        <Box>
            <Grid container spacing={1}>
                <Grid size="grow"></Grid>
                <Grow in={checked}>
                    <Grid
                        size={{
                            xs: 12,
                            xl: 10,
                        }}
                    >
                        <Stack
                            spacing={3}
                            sx={{
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    height: 1,
                                    color: "secondary",
                                }}
                            >
                                <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                    🎉 Welkom!
                                    <br />
                                    Stel je eerste vraag om te beginnen.
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grow>
                <Grid size="grow"></Grid>

                <Grow
                    in={checked}
                    style={{ transformOrigin: "0 0 1" }}
                    {...(checked ? { timeout: 750 } : {})}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            position: "fixed",
                            justifyContent: "center",
                            width: 0.5,
                            bottom: 0,
                            flexDirection: "column",
                            gap: 1,
                            alignItems: "stretch",
                            pb: 2,
                        }}
                    >
                        {showAutocomplete && (
                            <Autocomplete
                                options={brains
                                    .map((b) => b.label)
                                    .filter(
                                        (label) =>
                                            !selectedBrains.includes(label)
                                    )}
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
                                const brainData = brains.find(
                                    (b) => b.label === brain
                                );
                                return (
                                    <Chip
                                        key={brain}
                                        label={brain}
                                        icon={brainData?.icon}
                                        onDelete={() =>
                                            handleDeleteBrain(brain)
                                        }
                                    />
                                );
                            })}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                fullWidth
                                multiline
                                maxRows={5}
                                variant="outlined"
                                size="small"
                                placeholder="Wat wil je vragen?"
                                value={question}
                                onChange={handleInputChange}
                            />
                            <Button
                                variant="contained"
                                size="medium"
                                aria-label="Send"
                                onClick={handleSend}
                                sx={{
                                    px: { xs: 1, sm: 2, md: 3 },
                                    flexShrink: 0,
                                    minWidth: { xs: 36, sm: 44 },
                                }}
                            >
                                <Send />
                            </Button>
                        </Box>
                    </Toolbar>
                </Grow>
            </Grid>
        </Box>
    );
}
