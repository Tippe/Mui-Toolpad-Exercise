import * as React from "react";
import { JSX, useState, useRef, useEffect } from "react";
import {
    AppBar,
    Box,
    Grid,
    Stack,
    Toolbar,
    Typography,
    TextField,
    Button,
    Grow,
} from "@mui/material";
import { Send } from "@mui/icons-material";

export default function ChatPage() {
    const [checked] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);
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
                            {/**
                             * Laat "Welkom Box" zien wanneer er nog geen berichten staan
                             */}
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

                {/**
                 * Textfield en button onderaan de pagina
                 */}
                <AppBar
                    color="inherit"
                    sx={{
                        position: "fixed",
                        width: "calc(100% - 320px)",
                        ml: "calc(100% - 320px)",
                        top: "auto",
                        bottom: 0,
                    }}
                >
                    <Grow
                        in={checked}
                        style={{ transformOrigin: "0 0 1" }}
                        {...(checked ? { timeout: 750 } : {})}
                    >
                        <Toolbar
                            sx={{ justifyContent: "space-evenly", gap: 2 }}
                        >
                            <TextField
                                fullWidth
                                multiline
                                maxRows={5}
                                variant="outlined"
                                size="small"
                                placeholder="Wat wil je vragen?"
                                color="primary"
                                sx={{ flexGrow: 1 }}
                                // onChange={(e) => setQuestion(e.target.value)}
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter" && !e.shiftKey) {
                                //         e.preventDefault();
                                //         handleSend();
                                //     }
                                // }}
                                // disabled={loading}
                            />

                            <Button
                                variant="contained"
                                size="medium"
                                aria-label="Send"
                                sx={{
                                    px: { xs: 1, sm: 2, md: 3 },
                                    flexShrink: 0,
                                    minWidth: { xs: 36, sm: 44 },
                                }}
                            >
                                <Send />
                            </Button>
                        </Toolbar>
                    </Grow>
                </AppBar>
            </Grid>
        </Box>
    );
}
