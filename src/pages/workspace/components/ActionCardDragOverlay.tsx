import * as React from "react";
import { DragOverlay } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { Box } from "@mui/material";
import ActionCard, { Action } from "../../../layouts/ActionCard";

interface ActionCardDragOverlayProps {
    activeId: string | null;
    actions: Action[];
}

export default function ActionCardDragOverlay({
    activeId,
    actions,
}: ActionCardDragOverlayProps) {
    const activeAction = React.useMemo(
        () =>
            activeId
                ? actions.find(
                      (a: { id: any }) => String(a.id) === String(activeId)
                  ) ?? null
                : null,
        [activeId, actions]
    );

    return (
        <DragOverlay
            modifiers={[snapCenterToCursor]}
            style={{
                zIndex: 1200,
                cursor: "grabbing",
                pointerEvents: "none",
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
                        background: "linear-gradient(90deg, #42a5f5, #7e57c2)",
                        borderRadius: 4,
                    }}
                >
                    <ActionCard action={activeAction} />
                </Box>
            ) : null}
        </DragOverlay>
    );
}
