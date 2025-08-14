import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Code } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function DevelopmentBrain() {
    return (
        <BrainLayout
            title="Development"
            subtitle="Software Engineering"
            icon={<Code sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Builds and maintains software products.
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
                        value="Focuses on coding, code reviews, and feature delivery while ensuring code quality and scalability."
                    />
                    <TextField
                        label="Systeem Prompt"
                        fullWidth
                        multiline
                        disabled
                        variant="outlined"
                        value="Assist with software development tasks, debugging, and providing technical solutions to feature requests."
                    />
                </Box>
            }
        />
    );
}
