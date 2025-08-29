import * as React from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Collapse,
    IconButton,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { ChatBubble } from "../../../components/ChatBubble";
import {
    AccountBalance,
    AttachMoney,
    Close,
    Code,
    HeadsetMic,
    LocalShipping,
    People,
    Send,
} from "@mui/icons-material";
import { ChatMessage } from "../../../models/ChatMessage";
import { getConnection } from "../../../utils/signalR";
import { AskLLMSimpleResponse } from "../../../models/ChatRequest";
import Droppable from "../../../components/Interactive/Droppable";

const brains = [
    { label: "Dev", icon: <Code fontSize="small" /> },
    { label: "Finance", icon: <AccountBalance fontSize="small" /> },
    { label: "HR", icon: <People fontSize="small" /> },
    { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
    { label: "Sales", icon: <AttachMoney fontSize="small" /> },
    { label: "Support", icon: <HeadsetMic fontSize="small" /> },
];

interface DroppedActionInfo {
    action: any;
    target: "chat" | "message";
    messageId?: string;
    messageText?: string;
}

interface ChatCardProps {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    droppedAction: DroppedActionInfo | null;
    setDroppedAction: (d: DroppedActionInfo | null) => void;
}

export default function ChatCard({
    messages,
    setMessages,
    droppedAction,
    setDroppedAction,
}: ChatCardProps) {
    const [question, setQuestion] = React.useState("");
    const [selectedBrains, setSelectedBrains] = React.useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);
    const [panelInput, setPanelInput] = React.useState<string>("");

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
    }, [setMessages]);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    React.useEffect(() => {
        if (!droppedAction) {
            setPanelInput("");
            return;
        }
        // if dropped onto a message we might want to prefill with that message text
        if (droppedAction.target === "message" && droppedAction.messageText) {
            setPanelInput(droppedAction.messageText);
        } else {
            setPanelInput(""); // otherwise empty
        }
    }, [droppedAction]);

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

    const handleCancelPanel = () => {
        setDroppedAction(null);
    };

    return (
        <Card sx={{ borderRadius: 4, p: 2 }}>
            {/* CHAT AREA */}
            <Box
                sx={{ height: "calc(100vh - 216px)", overflow: "auto", mb: 1 }}
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
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}
                    </>
                )}
            </Box>

            <Droppable id="chat" variant="panel" highlightOnHover>
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
                                .filter(
                                    (label) => !selectedBrains.includes(label)
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
                                    onDelete={() => handleDeleteBrain(brain)}
                                />
                            );
                        })}
                    </Box>

                    {!droppedAction && (
                        <Stack direction="row" spacing={1}>
                            <TextField
                                size="small"
                                multiline
                                maxRows={5}
                                placeholder="Wat wil je vragen?"
                                fullWidth
                                value={question}
                                onChange={handleInputChange}
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
                    )}
                </Stack>
                <Collapse in={!!droppedAction} timeout={250}>
                    {droppedAction && (
                        <Box
                            sx={{
                                mt: 2,
                                p: 1.5,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 1,
                                backgroundColor: "background.paper",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {droppedAction.action.title ?? "Action"}
                                    </Typography>

                                    {/* miniPrompt */}
                                    {droppedAction.action.miniPrompt && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 1,
                                                color: "text.secondary",
                                            }}
                                        >
                                            {droppedAction.action.miniPrompt}
                                        </Typography>
                                    )}

                                    {/* Input for action */}
                                    <TextField
                                        label="Input"
                                        fullWidth
                                        size="small"
                                        value={panelInput}
                                        onChange={(e) =>
                                            setPanelInput(e.target.value)
                                        }
                                        sx={{ mb: 1 }}
                                    />

                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Temperatuur
                                    </Typography>
                                    <Slider
                                        value={droppedAction.action.temperature}
                                        // onChange={(_, value) =>
                                        //     setTemperature(Number(value))
                                        // }
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>

                                <Stack spacing={1} sx={{ width: 100 }}>
                                    <Button
                                        variant="contained"
                                        //onClick={handleRunAction}
                                        fullWidth
                                    >
                                        RUN
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={handleCancelPanel}
                                        startIcon={<Close />}
                                        fullWidth
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    )}
                </Collapse>
            </Droppable>
        </Card>
    );
}
