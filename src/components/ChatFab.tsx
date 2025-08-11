import * as React from "react";
import {
    Box,
    Fab,
    Paper,
    Stack,
    TextField,
    IconButton,
    Typography,
    Divider,
    Grow,
    Collapse,
} from "@mui/material";
import {
    Chat,
    Close,
    CloseFullscreen,
    Fullscreen,
    FullscreenExit,
    OpenInFull,
    Send,
    Shortcut,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function FloatingChat() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    return (
        <>
            {/* Floating Action Button */}
            <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 2000,
                }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? <Close /> : <Chat />}
            </Fab>

            {/* Chat window */}
            {open && (
                <Collapse in={open}>
                    <Paper
                        elevation={4}
                        sx={{
                            position: "fixed",
                            bottom: fullScreen ? 0 : 80,
                            right: fullScreen ? 0 : 16,
                            top: fullScreen ? 0 : "auto",
                            left: fullScreen ? 0 : "auto",
                            width: fullScreen ? "100vw" : 300,
                            height: fullScreen ? "100vh" : "auto",
                            maxHeight: fullScreen ? "100vh" : 400,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: fullScreen ? 0 : 2,
                            overflow: "hidden",
                            zIndex: 2000,
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                backgroundColor: "primary.main",
                                color: "primary.contrastText",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ p: 1 }}>
                                Chat
                            </Typography>
                            <Stack direction="row">
                                <IconButton
                                    onClick={() => navigate("/chat")}
                                    color="inherit"
                                >
                                    <Shortcut />
                                </IconButton>
                                <IconButton
                                    sx={{ color: "inherit" }}
                                    onClick={() =>
                                        setFullScreen((prev) => !prev)
                                    }
                                >
                                    {fullScreen ? (
                                        <FullscreenExit />
                                    ) : (
                                        <Fullscreen />
                                    )}
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack
                            sx={{
                                flex: 1,
                                p: 1,
                                overflowY: "auto",
                            }}
                            spacing={1}
                        >
                            {/* Mock chat messages */}
                            <Box
                                sx={{
                                    backgroundColor: "primary",
                                    p: 1,
                                    borderRadius: 1,
                                    alignSelf: "flex-start",
                                }}
                            >
                                Hello! How can I help?
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "primary.light",
                                    color: "primary.contrastText",
                                    p: 1,
                                    borderRadius: 1,
                                    alignSelf: "flex-end",
                                }}
                            >
                                I need some assistance.
                            </Box>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={1} sx={{ p: 1 }}>
                            <TextField
                                size="small"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                fullWidth
                            />
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    console.log("Send:", message);
                                    setMessage("");
                                }}
                            >
                                <Send />
                            </IconButton>
                        </Stack>
                    </Paper>
                </Collapse>
            )}
        </>
    );
}
