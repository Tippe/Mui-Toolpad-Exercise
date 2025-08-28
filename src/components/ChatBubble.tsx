import * as React from "react";
import { Box, Typography, Paper, Card } from "@mui/material";
import Droppable from "./Interactive/Droppable";
import { ChatMessage } from "../models/ChatMessage";

interface ChatBubbleProps {
    message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    const isUser = message.from === "user";

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                mb: 1.5,
            }}
        >
            <Droppable id={message.id} variant="bubble" highlightOnHover>
                <Card
                    sx={{
                        p: 1.5,
                        color: "text.primary",
                        border: isUser ? 2 : 0,
                        borderColor: isUser ? "primary.main" : undefined,
                        boxShadow: !isUser ? 0 : undefined,
                        borderRadius: 4,
                    }}
                >
                    <Typography variant="body2">{message.text}</Typography>
                </Card>
            </Droppable>
        </Box>
    );
};
