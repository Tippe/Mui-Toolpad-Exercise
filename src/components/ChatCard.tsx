import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Chat, Send } from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

export default function ChatCard() {
    return (
        <DashboardCard
            title="Chat"
            category="start"
            height="calc(100vh - 236px)"
            icon={<Chat sx={{ fontSize: 30 }} />}
            front={
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%", // of een vaste hoogte als dat nodig is
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {/* Welkom bericht */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                🎉 Welkom Tippe!
                                <br />
                                Stel je eerste vraag om te beginnen.
                            </Typography>
                        </Box>

                        {/* Chat input */}
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Typ je vraag..."
                            />
                            <IconButton color="primary">
                                <Send />
                            </IconButton>
                        </Box>
                    </Box>
                </>
            }
        />
    );
}
