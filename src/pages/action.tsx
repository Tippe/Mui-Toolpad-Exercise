import * as React from "react";
import Typography from "@mui/material/Typography";
import { Engineering, Settings } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function ActionPage() {
    return (
        <Stack
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Settings
                sx={{
                    fontSize: 450,
                    animation: "spin 20s linear infinite",
                    "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    },
                }}
            />
            <Typography variant="h2">Work in Progress</Typography>
        </Stack>
    );
}
