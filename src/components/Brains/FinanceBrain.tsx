import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function FinanceBrain() {
    return (
        <BrainLayout
            title="Finance"
            subtitle="Budget & Accounting"
            icon={<AccountBalance sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Oversees budgets, expenses, and financial forecasts.
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
                        value="Manages company finances, including tracking expenses, preparing budgets, and monitoring cash flow."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Assist with financial reporting, expense analysis, and forecasting future revenue."
                    />
                </Box>
            }
        />
    );
}
