import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { Account, DashboardLayout, PageContainer } from "@toolpad/core";
import { Box, IconButton, Slide, Tooltip } from "@mui/material";
import { Chat } from "@mui/icons-material";
import CustomMenu from "./CustomMenu";
import ChatDrawer from "../components/ChatDrawer";
import ToolbarActions from "./ToolbarActions";

const CHAT_DRAWER_WIDTH = 328;

export default function Layout() {
    const location = useLocation();
    const disabledPaths = ["/chat"];
    const isDisabled = disabledPaths.includes(location.pathname);
    const [chatOpen, setChatOpen] = React.useState(true);

    return (
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
                        md:
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
                                    md: "block",
                                },
                            }}
                        >
                            <ChatDrawer />
                        </Box>
                    </Slide>
                )}
            </Box>
        </DashboardLayout>
    );
}
