import * as React from "react";
import { Box, Typography, Paper } from "@mui/material";

export interface ChatMessage {
    id: number;
    text: string;
    from: "user" | "ai";
}

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
                mb: 1,
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 1.5,
                    maxWidth: "70%",
                    border: 1,
                    borderColor: isUser ? "primary.main" : "secondary.main",
                    color: "text.primary",
                    borderRadius: 2,
                    borderTopLeftRadius: isUser ? 10 : 2,
                    borderTopRightRadius: isUser ? 2 : 10,
                }}
            >
                <Typography variant="body2">{message.text}</Typography>
            </Paper>
        </Box>
    );
};