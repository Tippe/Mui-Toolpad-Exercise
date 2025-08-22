import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { alpha, Box } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { theme } from '../../theme';

interface DroppableProps {
    id: string;
    children: React.ReactNode;
    highlightOnHover?: boolean;
}

export default function Droppable({ id, children, highlightOnHover = false }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({ id });

    const style = {
        outline: highlightOnHover && isOver ? '5px #1976d2' : undefined,
        backgroundColor: highlightOnHover && isOver ? alpha("#808080", 0.2) : undefined,
        transition: 'background-color 0.2s, outline 0.2s',
    };

    return (
        <Box ref={setNodeRef} style={style}>
            {children}
        </Box>
    );
}
