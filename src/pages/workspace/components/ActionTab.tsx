import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import TabPanel from "../../../components/TabPanel";
import * as React from "react";
import ActionCard, { Action } from "../../../layouts/ActionCard";
import Draggable from "../../../components/Interactive/Draggable";
import {
    animated,
    config,
    useSpringRef,
    useTransition,
} from "@react-spring/web";
import { ActionStore } from "../../action";
import { CATEGORIES } from "../../../data/actions";

interface Props {
    tab: number;
}

const STORAGE_KEY = "actions";

export default function ActionTab({ tab }: Props) {
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const [search, setSearch] = React.useState<string>("");
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

    const [selectedCategoryId, setSelectedCategoryId] = React.useState<
        number | "all"
    >("all");

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

    return (
        <TabPanel value={tab} index={1}>
            {transitions((style, item) => (
                <Grid
                    key={item.id}
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 6,
                        lg: 6,
                        xl: 6,
                    }}
                >
                    <Draggable id={item.id.toString()}>
                        <ActionCard action={item} />
                    </Draggable>
                </Grid>
            ))}
        </TabPanel>
    );
}
