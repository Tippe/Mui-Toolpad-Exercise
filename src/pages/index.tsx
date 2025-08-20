import * as React from "react";
import { Box, Button, Grid, Grow, Stack, Zoom } from "@mui/material";
import AgendaCard from "../components/Cards/AgendaCard";
import NotificationCard from "../components/Cards/NotificationCard";
import BrainCard from "../components/Cards/BrainCard";
import ToDoCard from "../components/Cards/ToDoCard";
import SettingsCard from "../components/Cards/SettingsCard";
import NoteCard from "../components/Cards/NoteCard";
import {
    animated,
    config,
    useChain,
    useSpring,
    useSpringRef,
    useTrail,
} from "@react-spring/web";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function DashboardPage() {
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        const check = setChecked(true);
        return check;
    });

    const CHAT_CARD_HEIGHT = "calc(100vh - 244px)";
    const HALF_CARD_HEIGHT = `calc((${CHAT_CARD_HEIGHT}) / 2 - 86px)`;

    // Phase 1: Container
    const containerRef = useSpringRef();
    const containerSpring = useSpring({
        ref: containerRef,
        opacity: checked ? 1 : 0,
        transform: checked ? "scale(1)" : "scale(0.95)",
        config: config.default,
    });

    // Phase 2: Trail of card groups
    const cards = [
        {
            id: "notifications",
            element: <NotificationCard height={HALF_CARD_HEIGHT} />,
        },
        { id: "settings", element: <SettingsCard height={HALF_CARD_HEIGHT} /> },
        { id: "brain", element: <BrainCard height={HALF_CARD_HEIGHT} /> },
        { id: "todo", element: <ToDoCard height={HALF_CARD_HEIGHT} /> },
        { id: "notes", element: <NoteCard height={HALF_CARD_HEIGHT} /> },
        { id: "agenda", element: <AgendaCard height={HALF_CARD_HEIGHT} /> },
    ];

    const trailRef = useSpringRef();
    const trail = useTrail(cards.length, {
        ref: trailRef,
        opacity: checked ? 1 : 0,
        transform: checked ? "translateY(0px)" : "translateY(20px)",
        config: config.default,
    });

    useChain([containerRef, trailRef], [0, 0.1]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 10,
            },
        })
    );

    return (
        <animated.div style={containerSpring}>
            <DndContext modifiers={[restrictToWindowEdges]} sensors={sensors}>
                <Grid container columnSpacing={3} rowSpacing={5}>
                    {trail.map((style, index) => {
                        const card = cards[index];
                        return (
                            <Grid
                                key={index}
                                size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}
                                minWidth={320}
                            >
                                <animated.div style={style}>
                                    <Stack spacing={5}>{card.element}</Stack>
                                </animated.div>
                            </Grid>
                        );
                    })}
                </Grid>
            </DndContext>
        </animated.div>
    );
}
