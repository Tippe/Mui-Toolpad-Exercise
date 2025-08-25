import React, { JSX, useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
    Paper,
    Tooltip,
    Card,
    CardContent,
    CardActions,
    Grid,
    Divider,
    Fab,
    Collapse,
    Slider,
    InputLabel,
    MenuItem,
    alpha,
    useTheme,
} from "@mui/material";
import {
    Add,
    Delete,
    Edit,
    ExpandLess,
    ExpandMore,
    Repeat,
} from "@mui/icons-material";
import { CATEGORIES, MOCK_ACTIONS } from "../data/actions";
import { useToolpadColorScheme } from "../theme";
import { Action, ActionCategory } from "../layouts/ActionCard";

// ----- Types -----

// ----- Simple localStorage-backed store (can later be replaced by API) -----
const STORAGE_KEY = "actions";

export class ActionStore {
    static loadAll(): Action[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            const seed = ActionStore.seed();
            ActionStore.saveAll(seed);
            return seed;
        }

        try {
            return JSON.parse(raw) as Action[];
        } catch (e) {
            console.error("Failed to parse actions from localStorage:", e);
            return ActionStore.seed();
        }
    }

    static saveAll(list: Action[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    static add(action: Action) {
        const list = ActionStore.loadAll();
        list.unshift(action);
        ActionStore.saveAll(list);
    }

    static update(updated: Action) {
        const list = ActionStore.loadAll();
        const idx = list.findIndex((a) => a.id === updated.id);
        if (idx >= 0) {
            list[idx] = updated;
            ActionStore.saveAll(list);
        }
    }

    static remove(id: string) {
        const list = ActionStore.loadAll().filter((a) => a.id !== id);
        ActionStore.saveAll(list);
    }

    static seed(): Action[] {
        return MOCK_ACTIONS;
    }

    static makeId() {
        return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6)}`;
    }
}

// ----- Action Form (used for create + edit) -----
export function ActionForm({
    open,
    initial,
    onClose,
    onSave,
}: {
    open: boolean;
    initial?: Partial<Action>;
    onClose: () => void;
    onSave: (action: Action) => void;
}) {
    const [name, setName] = useState(initial?.name ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [miniPrompt, setMiniPrompt] = useState(initial?.miniPrompt ?? "");
    const [temperature, setTemperature] = useState<number>(
        typeof initial?.temperature === "number" ? initial!.temperature : 0.75
    );
    const [maxTokens, setMaxTokens] = useState<number>(
        typeof initial?.maxTokens === "number" ? initial!.maxTokens : 1000
    );
    const [category, setCategory] = useState<ActionCategory>(
        initial?.category ?? CATEGORIES[0]
    );

    useEffect(() => {
        // reset when opening with a different initial
        if (open) {
            setName(initial?.name ?? "");
            setDescription(initial?.description ?? "");
            setMiniPrompt(initial?.miniPrompt ?? "");
            setTemperature(
                typeof initial?.temperature === "number"
                    ? initial!.temperature
                    : 0.75
            );
            setMaxTokens(
                typeof initial?.maxTokens === "number"
                    ? initial!.maxTokens
                    : 1000
            );
            setCategory(initial?.category ?? CATEGORIES[0]);
        }
    }, [open, initial?.id]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    function validate(): boolean {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Naam is verplicht";
        if (!description.trim()) e.description = "Beschrijving is verplicht";
        if (!miniPrompt.trim()) e.miniPrompt = "Prompt is verplicht";
        if (temperature <= 0 || temperature >= 1.5)
            e.temperature = "Temperature moet tussen 0 en 1,5 zijn";
        if (!Number.isInteger(maxTokens) || maxTokens <= 0 || maxTokens > 4096)
            e.maxTokens = "Max Tokens moet tussen 1 en 4096 liggen";
        if (!category) e.category = "Je moet een categorie kiezen";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleSave() {
        if (!validate()) return;
        const action: Action = {
            id: (initial && initial.id) || ActionStore.makeId(),
            name: name.trim(),
            description: description.trim(),
            miniPrompt: miniPrompt.trim(),
            temperature,
            maxTokens,
            category,
        };
        onSave(action);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {initial?.id
                    ? `Bewerk Action: ${initial?.name}`
                    : "Nieuwe Action"}
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ mb: 2 }}>
                <Stack spacing={3}>
                    <Typography variant="body2" color="text.secondary">
                        {initial?.id
                            ? "Pas de gewenste velden aan om deze action te wijzigen."
                            : "Vul alle verplichte velden in om een nieuwe action toe te voegen."}
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        <TextField
                            select
                            label="Categorie"
                            value={category.id} // value moet de id zijn
                            onChange={(e) => {
                                const selected = CATEGORIES.find(
                                    (c) => c.id === Number(e.target.value)
                                );
                                if (selected) setCategory(selected);
                            }}
                            fullWidth
                            required
                        >
                            {CATEGORIES.map((c) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Naam"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            required
                        />
                    </Stack>

                    <TextField
                        label="Beschrijving"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                        multiline
                        minRows={3}
                        required
                    />

                    <TextField
                        label="Mini Prompt"
                        value={miniPrompt}
                        onChange={(e) => setMiniPrompt(e.target.value)}
                        error={!!errors.miniPrompt}
                        helperText={errors.miniPrompt}
                        fullWidth
                        multiline
                        minRows={6}
                        required
                    />

                    <Stack spacing={1}>
                        <InputLabel>
                            Temperature: {temperature.toFixed(2)}
                        </InputLabel>
                        <Slider
                            value={temperature}
                            min={0}
                            max={1.5}
                            step={0.01}
                            onChange={(_, value) =>
                                setTemperature(
                                    typeof value === "number" ? value : value[0]
                                )
                            }
                            valueLabelDisplay="auto"
                            marks={[
                                {
                                    value: 0.25,
                                    label: "Nauwkeurig",
                                },
                                {
                                    value: 0.75,
                                    label: "Gebalanceerd",
                                },
                                {
                                    value: 1.25,
                                    label: "Creatief",
                                },
                            ]}
                        />
                        {errors.temperature && (
                            <Typography color="error" variant="caption">
                                {errors.temperature}
                            </Typography>
                        )}
                    </Stack>

                    <Stack spacing={1}>
                        <InputLabel>Max Tokens: {maxTokens}</InputLabel>
                        <Slider
                            value={maxTokens}
                            min={1}
                            max={4096}
                            step={1}
                            onChange={(_, value) =>
                                setMaxTokens(
                                    typeof value === "number" ? value : value[0]
                                )
                            }
                            marks={[
                                { value: 1, label: "1" },
                                { value: 1024, label: "1K" },
                                { value: 2048, label: "2K" },
                                { value: 4096, label: "4K" },
                            ]}
                        />
                        {errors.maxTokens && (
                            <Typography color="error" variant="caption">
                                {errors.maxTokens}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </DialogContent>

            <Divider />

            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={onClose}>Annuleren</Button>
                <Button variant="contained" onClick={handleSave}>
                    Opslaan
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ----- Confirm Delete Dialog -----
export function ConfirmDelete({
    open,
    name,
    onCancel,
    onConfirm,
}: {
    open: boolean;
    name?: string;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Verwijderen bevestigen</DialogTitle>
            <DialogContent>
                <Typography>
                    Weet je zeker dat je{" "}
                    <Typography
                        component="span"
                        color="error.main"
                        sx={{ fontWeight: 500 }}
                    >
                        "{name ?? "deze action"}"
                    </Typography>{" "}
                    wilt verwijderen? Dit kan niet ongedaan gemaakt worden.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button color="error" variant="contained" onClick={onConfirm}>
                    Verwijderen
                </Button>
                <Button onClick={onCancel}>Annuleren</Button>
            </DialogActions>
        </Dialog>
    );
}

// ----- Main Component -----
export default function ActionPage(): JSX.Element {
    const isDarkMode = useToolpadColorScheme();
    const [actions, setActions] = useState<Action[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Action | undefined>(undefined);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toDelete, setToDelete] = useState<Action | undefined>(undefined);

    useEffect(() => {
        localStorage.removeItem(STORAGE_KEY); // Alleen tijdens dev
        setActions(ActionStore.loadAll());
    }, []);

    function refreshFromStore() {
        setActions(ActionStore.loadAll());
    }

    function handleCreate() {
        setEditing(undefined);
        setFormOpen(true);
    }

    function handleEdit(action: Action) {
        setEditing(action);
        setFormOpen(true);
    }

    function handleSave(action: Action) {
        if (actions.some((a) => a.id === action.id)) {
            ActionStore.update(action);
        } else {
            ActionStore.add(action);
        }
        refreshFromStore();
    }

    function handleDeleteClicked(action: Action) {
        setToDelete(action);
        setConfirmOpen(true);
    }

    function handleConfirmDelete() {
        if (toDelete) {
            ActionStore.remove(toDelete.id);
            refreshFromStore();
            setConfirmOpen(false);
            setToDelete(undefined);
        }
    }

    // Groepeer en sorteer actions per categorie
    const groupedActions = CATEGORIES.map((category) => ({
        category,
        actions: actions
            .filter((a) => a.category.id === category.id)
            .sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((group) => group.actions.length > 0);

    const [expandedCategories, setExpandedCategories] = useState<
        Record<number, boolean>
    >(() => Object.fromEntries(CATEGORIES.map((cat) => [cat.id, true])));

    function toggleCategory(categoryId: number) {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {groupedActions.map((group) => (
                    <React.Fragment key={group.category.id}>
                        <Grid size={12}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h5">
                                    {group.category.name}
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        toggleCategory(group.category.id)
                                    }
                                >
                                    {expandedCategories[group.category.id] ? (
                                        <ExpandMore />
                                    ) : (
                                        <ExpandLess />
                                    )}
                                </IconButton>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                        </Grid>

                        <Collapse in={expandedCategories[group.category.id]}>
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
                                        minWidth={200}
                                    >
                                        <Card
                                            sx={{
                                                position: "relative",
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRadius: 4,
                                            }}
                                        >
                                            {/* Icon als achtergrond */}
                                            <Repeat
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    fontSize: 100,
                                                    color: alpha(
                                                        isDarkMode
                                                            ? "#fff"
                                                            : "#000",
                                                        0.15
                                                    ),
                                                    pointerEvents: "none",
                                                }}
                                            />

                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                >
                                                    {a.name}
                                                </Typography>

                                                {a.description && (
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {a.description}
                                                    </Typography>
                                                )}
                                            </CardContent>

                                            <CardActions
                                                sx={{
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Tooltip title="Bewerken">
                                                    <IconButton
                                                        onClick={() =>
                                                            handleEdit(a)
                                                        }
                                                        size="small"
                                                        color="primary"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Verwijderen">
                                                    <IconButton
                                                        onClick={() =>
                                                            handleDeleteClicked(
                                                                a
                                                            )
                                                        }
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>

                        {actions.length === 0 && (
                            <Grid size={{ xs: 12 }}>
                                <Paper sx={{ p: 3, textAlign: "center" }}>
                                    Geen actions gevonden. Klik op "Nieuwe
                                    Action" om er één aan te maken.
                                </Paper>
                            </Grid>
                        )}
                    </React.Fragment>
                ))}

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleCreate}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        zIndex: 1000,
                    }}
                >
                    <Add />
                </Fab>
            </Grid>

            <ActionForm
                open={formOpen}
                initial={editing}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
            />

            <ConfirmDelete
                open={confirmOpen}
                name={toDelete?.name}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}
