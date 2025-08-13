import * as React from "react";
import { Typography } from "@mui/material";
import { Psychology } from "@mui/icons-material";
import BrainLayout from "../../layouts/BrainLayout";

export default function AnalystBrain() {
    return (
        <BrainLayout
            title="Analyst"
            subtitle="Pattern recognition"
            icon={<Psychology sx={{ fontSize: 35 }} />}
            height={300}
            front={
                <Typography variant="body2">
                    Finds hidden insights in complex data streams.
                </Typography>
            }
            back={
                <Typography variant="body2">
                    Built on machine learning models that adapt to evolving
                    datasets.
                </Typography>
            }
        />
    );
}
