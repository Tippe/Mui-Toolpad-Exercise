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
        // subtiele base color zodat de sheen beter zichtbaar is
        backgroundColor:
            highlightOnHover && isOver ? alpha("#1976d2", 0.04) : undefined,

        // twee lagen: 1) animated shine stripe, 2) subtiele tint
        backgroundImage:
            highlightOnHover && isOver
                ? `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 100%), linear-gradient(180deg, ${alpha(
                      "#1976d2",
                      0.06
                  )}, transparent)`
                : undefined,

        // maak de animated layer breed zodat we 'm over het element kunnen laten schuiven
        backgroundSize:
            highlightOnHover && isOver ? "220% 100%, 100% 100%" : undefined,

        // startpositie (links) -> eindpositie (rechts) bij toggle
        backgroundPosition:
            highlightOnHover && isOver ? "150% 0, 0 0" : "-40% 0, 0 0",

        // animatie voor achtergrondpositie + overige properties
        transition:
            "background-position 500ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease, transform 200ms ease, box-shadow 200ms ease",

        // subtiele 'lift' tijdens hover/over (optioneel, verplaats naar inner wrapper als collision issues optreden)
        transform: highlightOnHover && isOver ? "scale(1.02)" : "none",
        transformOrigin: "center",

        // lichte shadow voor diepte
        boxShadow:
            highlightOnHover && isOver
                ? `0 10px 30px ${alpha("#000", 0.1)}`
                : undefined,

        borderRadius: 12,
    };

    return (
        <Box ref={setNodeRef} style={style}>
            {children}
        </Box>
    );
}
