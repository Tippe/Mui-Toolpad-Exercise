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
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
    arraySwap,
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableCard({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        userSelect: "none",
    };

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </Box>
    );
}

export default function DashboardPage() {
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        setChecked(true);
    }, []);

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
    const cardMap: Record<string, React.ReactNode> = {
        notifications: <NotificationCard height={HALF_CARD_HEIGHT} />,
        settings: <SettingsCard height={HALF_CARD_HEIGHT} />,
        brain: <BrainCard height={HALF_CARD_HEIGHT} />,
        todo: <ToDoCard height={HALF_CARD_HEIGHT} />,
        notes: <NoteCard height={HALF_CARD_HEIGHT} />,
        agenda: <AgendaCard height={HALF_CARD_HEIGHT} />,
    };

    const [cardOrder, setCardOrder] = React.useState(Object.keys(cardMap));

    const trailRef = useSpringRef();
    const trail = useTrail(cardOrder.length, {
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

    const handleDragEnd = ({ active, over }: any) => {
        if (!over || active.id === over.id) return;

        const oldIndex = cardOrder.indexOf(active.id);
        const newIndex = cardOrder.indexOf(over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        setCardOrder((prev) => arraySwap(prev, oldIndex, newIndex));
    };

    return (
        <animated.div style={containerSpring}>
            <DndContext
                modifiers={[restrictToWindowEdges]}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cardOrder}
                    strategy={rectSortingStrategy}
                >
                    <Grid container columnSpacing={3} rowSpacing={5}>
                        {cardOrder.map((id, index) => {
                            const style = trail[index];
                            return (
                                <Grid
                                    key={id}
                                    size={{
                                        xs: 12,
                                        sm: 12,
                                        md: 6,
                                        lg: 3,
                                        xl: 2,
                                    }}
                                    minWidth={320}
                                >
                                    <animated.div style={style}>
                                        <Stack spacing={5}>
                                            <SortableCard id={id}>
                                                {cardMap[id]}
                                            </SortableCard>
                                        </Stack>
                                    </animated.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </SortableContext>
            </DndContext>
        </animated.div>
    );
}
