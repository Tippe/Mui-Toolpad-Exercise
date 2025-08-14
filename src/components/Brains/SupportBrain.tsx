import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { HeadsetMic } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function SupportBrain() {
    return (
        <BrainLayout
            title="Support"
            subtitle="Customer Service"
            icon={<HeadsetMic sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Resolves customer issues and ensures satisfaction.
                </Typography>
            }
            back={
                <Box component="form" sx={{ display: "grid", gap: 2 }}>
                    <TextField
                        label="Beschrijving"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Handles incoming queries, provides troubleshooting steps, and maintains customer loyalty."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Act as a customer support agent: answer questions, troubleshoot issues, and log cases with empathy and accuracy."
                    />
                </Box>
            }
        />
    );
}
