import * as React from "react";
import { Box, Grid, Grow, Stack, Zoom } from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import BrainCard from "../components/BrainCard";
import BuddyCard from "../components/BuddyCard";
import ToDoCard from "../components/ToDoCard";
import SettingsCard from "../components/SettingsCard";
import NoteCard from "../components/NoteCard";
import {
    animated,
    config,
    useChain,
    useSpring,
    useSpringRef,
    useTrail,
} from "@react-spring/web";
import AgendaCard from "../components/AgendaCard";

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
        [<NotificationCard height={HALF_CARD_HEIGHT} />],
        [<SettingsCard height={HALF_CARD_HEIGHT} />],
        [<BrainCard height={HALF_CARD_HEIGHT} />],
        [<BuddyCard height={HALF_CARD_HEIGHT} />],
        [<ToDoCard height={HALF_CARD_HEIGHT} />],
        [<NoteCard height={HALF_CARD_HEIGHT} />],
        [<AgendaCard height={HALF_CARD_HEIGHT} />],
    ];
    const trailRef = useSpringRef();
    const trail = useTrail(cards.length, {
        ref: trailRef,
        opacity: checked ? 1 : 0,
        transform: checked ? "translateY(0px)" : "translateY(20px)",
        config: config.default,
    });

    useChain([containerRef, trailRef], [0, 0.1]);

    return (
        <animated.div style={containerSpring}>
            <Grid container columnSpacing={3} rowSpacing={5}>
                {trail.map((style, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}
                    >
                        <animated.div style={style}>
                            <Stack spacing={5}>
                                {cards[index].map((Child, idx) => (
                                    <React.Fragment key={idx}>
                                        {Child}
                                    </React.Fragment>
                                ))}
                            </Stack>
                        </animated.div>
                    </Grid>
                ))}
            </Grid>
        </animated.div>
    );
}
