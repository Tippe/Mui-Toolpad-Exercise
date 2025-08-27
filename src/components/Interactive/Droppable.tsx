import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { alpha, Box } from "@mui/material";

interface DroppableProps {
    id: string;
    children: React.ReactNode;
    highlightOnHover?: boolean;
    variant?: "panel" | "bubble";
}

export default function Droppable({
    id,
    children,
    highlightOnHover = false,
    variant,
}: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({ id });

    let style: React.CSSProperties = {}; // use `let` so we can reassign

    const isActive = highlightOnHover && isOver;

    if (variant == "panel") {
        style = {
            // subtiele base color zodat de sheen beter zichtbaar is
            backgroundColor: isActive ? alpha("#1976d2", 0.04) : undefined,

            // twee lagen: 1) animated shine stripe, 2) subtiele tint
            backgroundImage: isActive
                ? `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 100%), linear-gradient(180deg, ${alpha(
                      "#1976d2",
                      0.06
                  )}, transparent)`
                : undefined,

            // maak de animated layer breed zodat we 'm over het element kunnen laten schuiven
            backgroundSize: isActive ? "220% 100%, 100% 100%" : undefined,

            // startpositie (links) -> eindpositie (rechts) bij toggle
            backgroundPosition: isActive ? "150% 0, 0 0" : "-40% 0, 0 0",

            // animatie voor achtergrondpositie + overige properties
            transition:
                "background-position 500ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease, transform 200ms ease, box-shadow 200ms ease",

            // subtiele 'lift' tijdens hover/over (optioneel, verplaats naar inner wrapper als collision issues optreden)
            transformOrigin: "center",
        };
    } else if (variant == "bubble") {
        style = {
            padding: isActive ? 5 : undefined,
            background: isActive
                ? "linear-gradient(90deg, #42a5f5, #7e57c2)"
                : undefined,
            // maak de gradient eerst onzichtbaar (0%) en laat 'm groeien bij hover
            backgroundSize: isActive ? "200% 100%" : "0% 100%",
            backgroundPosition: isActive ? "100% 50%" : "0% 50%",
            borderRadius: isActive ? 12 : undefined,
            transition:
                "padding 160ms ease, background-size 700ms ease, background-position 700ms linear, border-radius 160ms ease",
        };
    }

    return (
        <Box ref={setNodeRef} style={style}>
            {children}
        </Box>
    );
}
