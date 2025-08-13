import * as React from "react";
import Typography from "@mui/material/Typography";
import {
    Alert,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Popper,
    Stack,
} from "@mui/material";
import { Code, Fingerprint, Hardware, Psychology } from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";
import BrainLayout from "../layouts/BrainLayout";
import CoderBrain from "../components/Brains/CoderBrain";
import AnalystBrain from "../components/Brains/AnalystBrain";

export default function BrainsPage() {
    return (
        <Grid container columnSpacing={3} rowSpacing={5}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }} minWidth={320}>
                <CoderBrain />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }} minWidth={320}>
                <AnalystBrain />
            </Grid>
        </Grid>
    );
}
