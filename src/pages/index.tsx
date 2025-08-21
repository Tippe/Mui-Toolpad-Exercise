import * as React from "react";
import {
    alpha,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import AgendaCard from "../components/Cards/AgendaCard";
import ToDoCard from "../components/Cards/ToDoCard";
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
import {
    Delete,
    Edit,
    ExpandLess,
    ExpandMore,
    MoreVert,
    Repeat,
    Search,
} from "@mui/icons-material";
import { Action, ActionStore } from "./action";
import { CATEGORIES } from "../data/actions";

const STORAGE_KEY = "actions";

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
        todo: <ToDoCard height={HALF_CARD_HEIGHT} />,
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

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const [actions, setActions] = React.useState<Action[]>([]);

    React.useEffect(() => {
        localStorage.removeItem(STORAGE_KEY); // Alleen tijdens dev
        setActions(ActionStore.loadAll());
    }, []);

    // Groepeer en sorteer actions per categorie
    const groupedActions = CATEGORIES.map((category) => ({
        category,
        actions: actions
            .filter((a) => a.category.id === category.id)
            .sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((group) => group.actions.length > 0);

    // ---- Tabs + content ----
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<
        number | "all"
    >("all");

    function handleTabChange(
        _: React.SyntheticEvent,
        newValue: number | "all"
    ) {
        setSelectedCategoryId(newValue);
    }

    // TabPanel helper
    function TabPanel({
        value,
        index,
        children,
    }: {
        value: number | "all";
        index: number | "all";
        children?: React.ReactNode;
    }) {
        return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
    }

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
                    <Grid container>
                        <Grid size={12}>
                            <Card
                                sx={{
                                    px: 2,
                                    pb: 2,
                                    borderRadius: 4,
                                    boxShadow: `
                                        0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                                        0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                                        0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                                }}
                            >
                                <Tabs
                                    value={selectedCategoryId}
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Tab
                                        value={"all"}
                                        label={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                Alles
                                            </Box>
                                        }
                                    />
                                    {groupedActions.map((g) => (
                                        <Tab
                                            key={g.category.id}
                                            value={g.category.id}
                                            label={g.category.name}
                                        />
                                    ))}
                                </Tabs>
                                <Stack direction="row" sx={{ mt: 2, gap: 1 }}>
                                    <TextField
                                        placeholder="Zoek een Action"
                                        size="small"
                                        fullWidth
                                    />
                                    {/* <Button variant="contained">
                                    <Search />
                                </Button> */}
                                    <IconButton color="primary">
                                        <Search />
                                    </IconButton>
                                </Stack>
                            </Card>
                        </Grid>

                        {/* Tab panels */}
                        <Grid container>
                            <TabPanel value={selectedCategoryId} index={"all"}>
                                <Grid container spacing={2}>
                                    {actions.map((a) => (
                                        <Grid
                                            key={a.id}
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 6,
                                                lg: 3,
                                                xl: 2,
                                            }}
                                            sx={{ minWidth: 200 }}
                                        >
                                            <Card
                                                sx={{
                                                    position: "relative",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    borderRadius: 4,
                                                    boxShadow: `
                                                            0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                                                            0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                                                            0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                                                }}
                                            >
                                                <Repeat
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform:
                                                            "translate(-50%, -50%)",
                                                        fontSize: 75,
                                                        color: alpha(
                                                            isDarkMode
                                                                ? "#fff"
                                                                : "#000",
                                                            0.1
                                                        ),
                                                        pointerEvents: "none",
                                                    }}
                                                />

                                                <CardContent>
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {a.name}
                                                        </Typography>
                                                        <IconButton size="small">
                                                            <MoreVert />
                                                        </IconButton>
                                                    </Stack>
                                                </CardContent>

                                                <CardContent>
                                                    {a.description && (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {a.description}
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>

                            {groupedActions.map((group) => (
                                <TabPanel
                                    key={group.category.id}
                                    value={selectedCategoryId}
                                    index={group.category.id}
                                >
                                    <Grid container spacing={2}>
                                        {group.actions.map((a) => (
                                            <Grid
                                                key={a.id}
                                                size={{
                                                    xs: 12,
                                                    sm: 12,
                                                    md: 6,
                                                    lg: 3,
                                                    xl: 2,
                                                }}
                                                sx={{ minWidth: 200 }}
                                            >
                                                <Card
                                                    sx={{
                                                        position: "relative",
                                                        height: "100%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        borderRadius: 4,
                                                        boxShadow: `
                                                            0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                                                            0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                                                            0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                                                    }}
                                                >
                                                    <Repeat
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform:
                                                                "translate(-50%, -50%)",
                                                            fontSize: 75,
                                                            color: alpha(
                                                                isDarkMode
                                                                    ? "#fff"
                                                                    : "#000",
                                                                0.1
                                                            ),
                                                            pointerEvents:
                                                                "none",
                                                        }}
                                                    />

                                                    <CardContent>
                                                        <Stack
                                                            direction="row"
                                                            sx={{
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                {a.name}
                                                            </Typography>
                                                            <IconButton size="small">
                                                                <MoreVert />
                                                            </IconButton>
                                                        </Stack>
                                                    </CardContent>

                                                    <CardContent>
                                                        {a.description && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {a.description}
                                                            </Typography>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                            ))}

                            {/* fallback: geen actions */}
                            {actions.length === 0 && (
                                <Grid size={12}>
                                    <Paper sx={{ p: 3, textAlign: "center" }}>
                                        Geen actions gevonden. Klik op "Nieuwe
                                        Action" om er één aan te maken.
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </SortableContext>
            </DndContext>
        </animated.div>
    );
}
