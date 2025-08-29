import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { Bolt, Chat, Psychology, Search } from "@mui/icons-material";
import ChatCard from "./components/ChatCard";
import SessionTab from "./components/SessionTab";
import ActionTab from "./components/ActionTab";
import BrainTab from "./components/BrainTab";
import {
    DndContext,
    PointerSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import ActionCardDragOverlay from "./components/ActionCardDragOverlay";
import { MOCK_ACTIONS } from "../../data/actions";

type DroppedAction = null | {
    action: any;
    target: "chat" | "message";
    messageId?: string;
    messageText?: string;
};

export default function WorkspacePage() {
    const [tab, setTab] = React.useState(0);
    const [search, setSearch] = React.useState<string>("");
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [messages, setMessages] = React.useState<
        { id: string; text: string; from: "user" | "assistant" }[]
    >([]);

    const [droppedAction, setDroppedAction] =
        React.useState<DroppedAction>(null);

    const placeholder = () => {
        switch (tab) {
            case 0:
                return "Zoek een Sessie";
            case 1:
                return "Zoek een Action";
            case 2:
                return "Zoek een Brain";
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 100, tolerance: 10 },
        })
    );

    const handleDragEnd = ({ active, over }: any) => {
        if (!over) {
            console.log("Dropped outside any droppable:", active.id);
            setActiveId(null);
            return;
        }

        const action =
            MOCK_ACTIONS.find((a) => String(a.id) === String(active.id)) ??
            null;
        if (!action) {
            console.log(
                "Dragged item wasn't an action or action not found:",
                active.id
            );
            setActiveId(null);
            return;
        }

        if (over.id === "chat") {
            console.log(`Dragged Action "${active.id}" to "${over.id}"`);
            setDroppedAction({ action, target: "chat" });
        } else if (messages.some((m) => String(m.id) === String(over.id))) {
            const message = messages.find(
                (m) => String(m.id) === String(over.id)
            );
            console.log(
                `Dragged Action "${active.id}" to ChatBubble: "${message?.text}"`
            );

            setDroppedAction({
                action,
                target: "message",
                messageId: String(over.id),
            });
        } else {
            console.log(`Dragged "${active.id}" to "${over.id}"`);
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={({ active }) => setActiveId(String(active.id))}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
                    <ChatCard
                        messages={messages}
                        setMessages={setMessages}
                        droppedAction={droppedAction}
                        setDroppedAction={setDroppedAction}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            height: "calc(100vh - 128px)",
                        }}
                    >
                        <Tabs
                            value={tab}
                            onChange={(_, newValue) => setTab(newValue)}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Chats" />
                            <Tab label="Actions" />
                            <Tab label="Brains" />
                        </Tabs>

                        <Stack direction="row" sx={{ my: 2, px: 2 }}>
                            <TextField
                                placeholder={placeholder()}
                                size="small"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <IconButton color="primary">
                                <Search />
                            </IconButton>
                        </Stack>
                        <SessionTab tab={tab} />
                        <ActionTab tab={tab} />
                        <BrainTab tab={tab} />
                    </Card>
                </Grid>
            </Grid>
            <ActionCardDragOverlay activeId={activeId} actions={MOCK_ACTIONS} />
        </DndContext>
    );
}
