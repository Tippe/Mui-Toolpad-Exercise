import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { Account, DashboardLayout, PageContainer } from "@toolpad/core";
import {
    alpha,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    Slide,
    Slider,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { Chat, PlayArrow } from "@mui/icons-material";
import CustomMenu from "./CustomMenu";
import ChatDrawer from "../components/ChatDrawer";
import ToolbarActions from "./ToolbarActions";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { ActionStore } from "../pages/action";
import { useToolpadColorScheme } from "../theme";
import { mockMessages } from "../data/messages";
import ActionCard, { Action } from "./ActionCard";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

const CHAT_DRAWER_WIDTH = 664;
const STORAGE_KEY = "actions";

export default function Layout() {
    const location = useLocation();
    const disabledPaths = ["/chat"];
    const isDisabled = disabledPaths.includes(location.pathname);
    const [chatOpen, setChatOpen] = React.useState(true);
    const theme = useTheme();

    const isDarkMode = useToolpadColorScheme();
    const [actions, setActions] = React.useState<Action[]>([]);
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogAction, setDialogAction] = React.useState<Action | null>(null);
    const [dialogInput, setDialogInput] = React.useState<string | null>(null);

    React.useEffect(() => {
        localStorage.removeItem(STORAGE_KEY); // Alleen tijdens dev
        setActions(ActionStore.loadAll());
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 100, tolerance: 10 },
        })
    );

    const handleDragEnd = ({ active, over }: any) => {
        if (!over) return;

        console.log("Over ID: ", over.id);

        if (over.id === "chat-drawer") {
            const action =
                actions.find((a) => String(a.id) === String(active.id)) ?? null;

            setDialogAction(action);
            setDialogOpen(true);
        } else if (mockMessages.some((message) => message.id === over.id)) {
            const action =
                actions.find((a) => String(a.id) === String(active.id)) ?? null;
            const message = mockMessages.find((m) => m.id === over.id) ?? null;

            const input = message?.text ?? null;

            setDialogAction(action);
            setDialogInput(input);
            setDialogOpen(true);
        }

        setActiveId(null);
    };

    const handleDialogConform = () => {
        if (!dialogAction) return;

        console.log("Confirmed dropped action:", dialogAction.id);

        setDialogOpen(false);
        setDialogAction(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogAction(null);
        setDialogInput(null);
    };

    const activeAction = actions.find((a) => String(a.id) === String(activeId));

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={({ active }) => setActiveId(String(active.id))}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
        >
            <DashboardLayout
                slots={{
                    toolbarActions: () => (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {!isDisabled && (
                                <Tooltip
                                    title={
                                        chatOpen ? "Verberg chat" : "Toon chat"
                                    }
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "none",
                                            lg: "block",
                                            xl: "block",
                                        },
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => setChatOpen((v) => !v)}
                                        aria-label="Toggle chat panel"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "none",
                                                lg: "block",
                                                xl: "block",
                                            },
                                            alignItems: "center",
                                            width: 40,
                                        }}
                                    >
                                        <Chat />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {/* Notifications & ThemeSwitcher */}
                            <ToolbarActions />
                        </Box>
                    ),
                    toolbarAccount: () => (
                        <Account slots={{ popoverContent: CustomMenu }} />
                    ),
                }}
            >
                {/* Two-column layout under the Toolpad header. Grid makes the chat truly push content */}
                <Box
                    sx={{
                        display: "grid",
                        alignItems: "start",
                        overflowX: "hidden",
                        //position: "relative",
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            sm: "minmax(0, 1fr)",
                            md: "minmax(0, 1fr)",
                            lg:
                                chatOpen && !isDisabled
                                    ? `minmax(0, 1fr) ${CHAT_DRAWER_WIDTH}px`
                                    : "minmax(0, 1fr)",
                            xl:
                                chatOpen && !isDisabled
                                    ? `minmax(0, 1fr) ${CHAT_DRAWER_WIDTH}px`
                                    : "minmax(0, 1fr)",
                        },
                    }}
                >
                    <PageContainer title="" breadcrumbs={[]} maxWidth={false}>
                        <Outlet />
                    </PageContainer>

                    {/* Right column: chat sheet (hidden when toggled off or on small screens) */}
                    {!isDisabled && (
                        <Slide direction="left" in={chatOpen}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: -8,
                                    top: -64,
                                    width: CHAT_DRAWER_WIDTH,
                                    height: 1,
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "none",
                                        lg: "block",
                                        xl: "block",
                                    },
                                }}
                            >
                                <ChatDrawer />
                            </Box>
                        </Slide>
                    )}
                    <DragOverlay
                        modifiers={[snapCenterToCursor]}
                        style={{
                            zIndex: 1200,
                            cursor: "grabbing",
                        }}
                        dropAnimation={{
                            duration: 200,
                            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22",
                        }}
                    >
                        {activeAction ? (
                            <Box
                                sx={{
                                    p: "2px",
                                    background:
                                        "linear-gradient(90deg, #42a5f5, #7e57c2)",
                                    borderRadius: 4,
                                }}
                            >
                                <ActionCard action={activeAction} />
                            </Box>
                        ) : null}
                    </DragOverlay>
                </Box>
            </DashboardLayout>

            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
                <DialogTitle>{dialogAction?.name}</DialogTitle>
                <DialogContent dividers>
                    <Stack direction="column" spacing={3} sx={{ mb: 2 }}>
                        <Typography variant="body2">
                            {dialogAction?.description}
                        </Typography>
                        <TextField
                            label="input"
                            value={dialogInput}
                            placeholder="Input"
                            fullWidth
                            multiline
                            minRows={4}
                            required
                        />
                        <TextField
                            label="Mini Prompt"
                            value={dialogAction?.miniPrompt}
                            fullWidth
                            multiline
                            minRows={4}
                            required
                        />

                        <InputLabel>
                            Temperature: {dialogAction?.temperature.toFixed(2)}
                        </InputLabel>
                        <Slider
                            value={dialogAction?.temperature}
                            min={0}
                            max={1.5}
                            step={0.01}
                            /*onChange={(_, value) =>
                                setTemperature(
                                    typeof value === "number" ? value : value[0]
                                )
                            }*/
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
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between" }}>
                    <Button onClick={handleDialogClose}>Annuleren</Button>
                    <Button
                        onClick={handleDialogConform}
                        variant="contained"
                        endIcon={<PlayArrow />}
                    >
                        Run
                    </Button>
                </DialogActions>
            </Dialog>
        </DndContext>
    );
}
