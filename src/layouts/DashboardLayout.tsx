import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { Account, DashboardLayout, PageContainer } from "@toolpad/core";
import { alpha, Box, Card, CardContent, IconButton, Slide, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Bolt, Chat, MoreVert } from "@mui/icons-material";
import CustomMenu from "./CustomMenu";
import ChatDrawer from "../components/ChatDrawer";
import ToolbarActions from "./ToolbarActions";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { Action, ActionStore } from "../pages/action";

const CHAT_DRAWER_WIDTH = 664;
const STORAGE_KEY = "actions";


export default function Layout() {
    const location = useLocation();
    const disabledPaths = ["/chat"];
    const isDisabled = disabledPaths.includes(location.pathname);
    const [chatOpen, setChatOpen] = React.useState(true);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const [activeId, setActiveId] = React.useState<string | null>(null);


    const [actions, setActions] = React.useState<Action[]>([]);

    React.useEffect(() => {
        localStorage.removeItem(STORAGE_KEY); // Alleen tijdens dev
        setActions(ActionStore.loadAll());
    }, []);


    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { delay: 100, tolerance: 10 } })
    );

    const handleDragEnd = ({ active, over }: any) => {
        if (!over) return;

        if (over.id === "chat-drawer") {
            // dropped into ChatDrawer
            console.log("Dropped action into chat:", active.id);
            // call some handler, e.g., addActionToChat(active.id)
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
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
                                    title={chatOpen ? "Verberg chat" : "Toon chat"}
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "block",
                                        },
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => setChatOpen((v) => !v)}
                                        aria-label="Toggle chat panel"
                                        sx={{
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
                        position: "relative",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr",
                            md: "1fr",
                            lg:
                                chatOpen && !isDisabled
                                    ? `1fr ${CHAT_DRAWER_WIDTH}px`
                                    : "1fr",
                            xl:
                                chatOpen && !isDisabled
                                    ? `1fr ${CHAT_DRAWER_WIDTH}px`
                                    : "1fr",
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
                    <DragOverlay>
                        {activeId ? (
                            <Card
                                sx={{
                                    position: "relative",
                                    height: "125px",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 4,
                                    boxShadow: `
                                        0px 2px 1px -1px rgba(107, 114, 128, 0.03),
                                        0px 1px 1px 0px rgba(107, 114, 128, 0.04),
                                        0px 1px 3px 0px rgba(107, 114, 128, 0.08)`,
                                }}
                            >
                                <Bolt
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

                                <CardContent sx={{ flexGrow: 1 }}>
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
                                            {actions.find(a => String(a.id) === activeId)?.name ?? activeId}
                                        </Typography>
                                        <IconButton size="small">
                                            <MoreVert />
                                        </IconButton>
                                    </Stack>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {actions.find(a => String(a.id) === activeId)?.description}
                                        </Typography>

                                    </Box>
                                </CardContent>
                            </Card>

                        ) : null}
                    </DragOverlay>
                </Box>
            </DashboardLayout>
        </DndContext >
    );
}
