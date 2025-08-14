import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function SalesBrain() {
    return (
        <BrainLayout
            title="Sales"
            subtitle="Business Growth"
            icon={<AttachMoney sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Drives revenue through client acquisition and retention.
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
                        value="Handles lead generation, pitching products, and closing deals with new and existing clients."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Provide sales strategies, email templates, and negotiation tips tailored to different industries."
                    />
                </Box>
            }
        />
    );
}
