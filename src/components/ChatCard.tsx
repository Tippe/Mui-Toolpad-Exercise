import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Chat, Send } from "@mui/icons-material";
import DashboardCard from "../layouts/DashboardCard";

export default function ChatCard() {
    return (
        <DashboardCard
            title="Chat"
            subtitle="Test"
            category="start"
            height="calc(100vh - 236px)"
            icon={<Chat sx={{ width: 30, height: 30 }} />}
            front={
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            color: "secondary",
                        }}
                    >
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>
                            🎉 Welkom {/*username*/}!
                            <br />
                            Stel je eerste vraag om te beginnen.
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", width: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Typ je vraag..."
                        />
                        <IconButton>
                            <Send />
                        </IconButton>
                    </Box>
                </>
            }
        />
    );
}
