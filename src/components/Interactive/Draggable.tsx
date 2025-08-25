import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

interface DraggableProps {
    id: string;
    children: React.ReactNode;
}

export default function Draggable({ id, children }: DraggableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            sx={{ display: "inline-block", style }}
        >
            {children}
        </Box>
    );
}
