import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

export default function Sortableitem({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        userSelect: "none",
    };

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </Box>
    );
}
