import * as React from "react";
import {
    Autocomplete,
    Box,
    Card,
    Chip,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { ChatBubble } from "../../../components/ChatBubble";
import {
    AccountBalance,
    AttachMoney,
    Code,
    HeadsetMic,
    LocalShipping,
    People,
    Send,
} from "@mui/icons-material";
import { ChatMessage } from "../../../models/ChatMessage";
import { getConnection } from "../../../utils/signalR";
import { AskLLMSimpleResponse } from "../../../models/ChatRequest";

const brains = [
    { label: "Dev", icon: <Code fontSize="small" /> },
    { label: "Finance", icon: <AccountBalance fontSize="small" /> },
    { label: "HR", icon: <People fontSize="small" /> },
    { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
    { label: "Sales", icon: <AttachMoney fontSize="small" /> },
    { label: "Support", icon: <HeadsetMic fontSize="small" /> },
];

export default function ChatCard() {
    const [question, setQuestion] = React.useState("");
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [selectedBrains, setSelectedBrains] = React.useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const connectionRef = React.useRef<any>(null);

    React.useEffect(() => {
        const connection = getConnection(
            "https://signalr.local:5101/ChatHub",
            localStorage.getItem("accessToken")!
        );
        connectionRef.current = connection;

        const handleReceiveMessage = (message: AskLLMSimpleResponse) => {
            console.log("Message Received:", message);

            const text = message.response;

            const reply: ChatMessage = {
                id: (Date.now() + Math.random()).toString(),
                from: "assistant",
                text,
            };

            setMessages((prev) => [...prev, reply]);
        };

        connection.on("AskLLMSimpleResponse", handleReceiveMessage);

        // Clean up listener when component unmounts
        return () => {
            connection.off("AskLLMSimpleResponse", handleReceiveMessage);
        };
    }, []);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!question.trim() && selectedBrains.length === 0) return;

        const userMessage: ChatMessage = {
            id: (Date.now() + Math.random()).toString(),
            from: "user",
            text: question,
        };
        setMessages((prev) => [...prev, userMessage]);

        connectionRef.current?.invoke("AskLLM", {
            prompt: question,
        });

        console.log("Sent:", question);

        setQuestion("");
        setSelectedBrains([]);
        setShowAutocomplete(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestion(value);
        setShowAutocomplete(value.endsWith("@"));
    };

    const handleSelectBrain = (brainLabel: string) => {
        setSelectedBrains((prev) =>
            prev.includes(brainLabel) ? prev : [...prev, brainLabel]
        );
        setQuestion("");
        setShowAutocomplete(false);
    };

    const handleDeleteBrain = (brainLabel: string) => {
        setSelectedBrains((prev) => prev.filter((b) => b !== brainLabel));
    };

    return (
        <Card sx={{ borderRadius: 4, p: 2 }}>
            {/* CHAT AREA */}
            <Box
                sx={{ height: "83vh", overflow: "auto", mb: 1 }}
                ref={scrollRef}
            >
                {messages.length === 0 ? (
                    // Welkom alleen tonen als er geen berichten zijn
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            color: "secondary",
                            flexGrow: 1,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" sx={{ opacity: 0.7 }}>
                            🎉 Welkom!
                            <br />
                            Stel je eerste vraag om te beginnen.
                        </Typography>
                    </Stack>
                ) : (
                    <>
                        {messages.map((m) => (
                            <ChatBubble key={m.id} message={m} />
                        ))}
                    </>
                )}
            </Box>

            <Stack
                sx={{
                    position: "sticky",
                    bottom: 0,
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

                <Stack direction="row">
                    <TextField
                        size="small"
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
                </Stack>
            </Stack>
        </Card>
    );
}
