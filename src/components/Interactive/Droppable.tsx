import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { alpha, Box } from "@mui/material";

interface DroppableProps {
    id: string;
    children: React.ReactNode;
    highlightOnHover?: boolean;
}

export default function Droppable({
    id,
    children,
    highlightOnHover = false,
}: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({ id });

    const style = {
        backgroundColor:
            highlightOnHover && isOver ? alpha("#808080", 0.3) : undefined,
        transition:
            "background-color 200ms ease, box-shadow 180ms ease, transform 150ms ease, border 180ms ease",
        transformOrigin: "center",
        borderRadius: 12,
        border:
            highlightOnHover && isOver
                ? `4px solid ${alpha("#1976d2", 0.5)}`
                : undefined,
    };

    return (
        <Box ref={setNodeRef} style={style}>
            {children}
        </Box>
    );
}
