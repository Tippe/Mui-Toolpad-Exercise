import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function LogisticsBrain() {
    return (
        <BrainLayout
            title="Logistics"
            subtitle="Supply Chain Management"
            icon={<LocalShipping sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Oversees storage, transportation, and distribution of goods.
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
                        value="Manages suppliers, inventory levels, and delivery schedules to ensure timely order fulfillment."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Assist in tracking shipments, forecasting stock requirements, and optimizing delivery routes."
                    />
                </Box>
            }
        />
    );
}
