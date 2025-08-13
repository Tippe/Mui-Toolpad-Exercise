import * as React from "react";
import { TextField, Typography } from "@mui/material";
import { Code } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function CoderBrain() {
    return (
        <BrainLayout
            title="Coder"
            subtitle="Code generation"
            icon={<Code sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Automates repetitive programming tasks.
                </Typography>
            }
            back={
                <>
                    <Typography variant="subtitle1">Beschrijving:</Typography>

                    <TextField
                        fullWidth
                        multiline
                        disabled
                        value={`Supports multiple languages, testing automation, and integration with CI/CD pipelines.`}
                    />

                    <Typography variant="subtitle1">Systeem Prompt:</Typography>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        value={`Supports multiple languages, testing automation, and integration with CI/CD pipelines.`}
                    />
                </>
            }
        />
    );
}
