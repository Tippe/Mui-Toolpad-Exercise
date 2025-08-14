import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function HRBrain() {
    return (
        <BrainLayout
            title="HR"
            subtitle="Human Resources"
            icon={<People sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Manages employee relations, recruitment, and workplace
                    culture.
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
                        value="Responsible for hiring, onboarding, performance reviews, and ensuring compliance with labor laws."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Act as a Human Resources assistant: handle recruitment workflows, employee records, and HR policy queries."
                    />
                </Box>
            }
        />
    );
}
