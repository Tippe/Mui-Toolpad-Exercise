import * as React from "react";
import Typography from "@mui/material/Typography";
import { Settings } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function BuddyPage() {
    return (
        <Stack
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                mt: 15,
            }}
        >
            <Settings
                sx={{
                    fontSize: 350,
                    animation: "spinVary 10s infinite",
                    "@keyframes spinVary": {
                        "0%": { transform: "rotate(0deg)" },
                        "10%": { transform: "rotate(90deg)" },
                        "60%": { transform: "rotate(180deg)" },
                        "65%": { transform: "rotate(270deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    },
                    animationTimingFunction: "linear",
                }}
            />
            <Typography variant="h2" sx={{ fontWeight: 400 }}>
                Work in Progress
            </Typography>
        </Stack>
    );
}
