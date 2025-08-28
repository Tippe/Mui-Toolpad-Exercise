import * as React from "react";
import {
    Box,
    Card,
    FormControlLabel,
    Grid,
    IconButton,
    Paper,
    Stack,
    Switch,
    Tab,
    Tabs,
    TextField,
    Tooltip,
} from "@mui/material";
import {
    animated,
    config,
    useChain,
    useSpring,
    useSpringRef,
    useTransition,
} from "@react-spring/web";
import { InfoOutline, Search } from "@mui/icons-material";
import { ActionStore } from "./action";
import { CATEGORIES } from "../data/actions";
import Draggable from "../components/Interactive/Draggable";
import ActionCard, { Action } from "../layouts/ActionCard";

const STORAGE_KEY = "actions";

export default function ActionCatalogPage() {
    const [checked, setChecked] = React.useState(false);
    const [quickAction, setQuickAction] = React.useState(false);
    const [search, setSearch] = React.useState<string>("");
    const [actions, setActions] = React.useState<Action[]>([]);

    React.useEffect(() => {
        setChecked(true);
    }, []);

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

    // Tabs
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

    // visibleActions: afhankelijk van geselecteerde tab en zoekfilter
    const visibleActions = React.useMemo(() => {
        const list =
            selectedCategoryId === "all"
                ? actions
                : actions.filter((a) => a.category.id === selectedCategoryId);

        if (!search.trim()) return list;
        const q = search.toLowerCase();
        return list.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                (a.description || "").toLowerCase().includes(q)
        );
    }, [actions, selectedCategoryId, search]);

    // container spring (fase 1)
    const containerRef = useSpringRef();
    const containerSpring = useSpring({
        ref: containerRef,
        from: { opacity: 0, transform: "scale(0.98)" },
        to: {
            opacity: checked ? 1 : 0,
            transform: checked ? "scale(1)" : "scale(0.98)",
        },
        config: config.stiff,
    });

    // transition for cards (fase 2)
    const transitionRef = useSpringRef();
    // trail controls the per-item delay in ms;
    // smaller = faster, larger = slower
    const trailMs = 45;

    const transitions = useTransition(visibleActions, {
        ref: transitionRef,
        keys: (item: Action) => item.id,
        // trail can be set as ms between items; react-spring accepts number for 'trail'
        trail:
            visibleActions.length > 10 ? 450 / visibleActions.length : trailMs,
        from: { opacity: 0, transform: "translateY(18px) scale(0.995)" },
        enter: { opacity: 1, transform: "translateY(0px) scale(1)" },
        leave: { opacity: 0, transform: "translateY(18px) scale(0.995)" },
        config: { ...config.stiff },
    });

    useChain([containerRef, transitionRef], [0, 0.12]);

    return (
        <animated.div style={containerSpring}>
            <Grid container>
                <Grid size={12}>
                    <Card
                        sx={{
                            pb: 2,
                            borderRadius: 4,
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
                        <Stack direction="row" sx={{ my: 2, gap: 1, px: 2 }}>
                            <TextField
                                placeholder="Zoek een Action"
                                size="small"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <IconButton color="primary">
                                <Search />
                            </IconButton>
                        </Stack>

                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                px: 2,
                            }}
                        >
                            <FormControlLabel
                                label="Quick Action"
                                control={<Switch color="secondary" />}
                            />
                            <Tooltip title="Voer Actions direct uit zonder configuratie">
                                <InfoOutline fontSize="small" />
                            </Tooltip>
                        </Stack>
                    </Card>
                </Grid>

                {/* Tab panels */}
                <Grid container>
                    <TabPanel value={selectedCategoryId} index={"all"}>
                        <Grid container spacing={2}>
                            {transitions((style, item) => (
                                <Grid
                                    key={item.id}
                                    size={{
                                        xs: 12,
                                        sm: 12,
                                        md: 6,
                                        lg: 3,
                                        xl: 2,
                                    }}
                                    sx={{ minWidth: 200, width: 1 }}
                                >
                                    <animated.div key={item.id} style={style}>
                                        <Draggable id={item.id.toString()}>
                                            <ActionCard action={item} />
                                        </Draggable>
                                    </animated.div>
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
                                        <Draggable id={a.id.toString()}>
                                            <ActionCard action={a} />
                                        </Draggable>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                    ))}

                    {/* fallback: geen actions */}
                    {actions.length === 0 && (
                        <Grid size={12}>
                            <Paper sx={{ p: 3, textAlign: "center" }}>
                                Geen actions gevonden. Klik op "Nieuwe Action"
                                om er één aan te maken.
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </animated.div>
    );
}
