import { Bolt, BorderColor, MoreVert } from "@mui/icons-material";
import {
    alpha,
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useToolpadColorScheme } from "../theme";

export interface Action {
    id: string;
    name: string;
    description: string;
    miniPrompt: string;
    temperature: number;
    maxTokens: number;
    category: ActionCategory;
}

export interface ActionCategory {
    id: number;
    name: string;
}

interface ActionCardProps {
    action: Action;
}
export default function ActionCard({ action }: ActionCardProps) {
    const isDarkMode = useToolpadColorScheme();
    return (
        <Card
            sx={{
                position: "relative",
                height: "125px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                ":active": {
                    opacity: 0.5,
                    transition: "opacity 100ms ease",
                    transitionDelay: "150ms",
                },
            }}
        >
            <Bolt
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: 75,
                    color: alpha("#000", isDarkMode ? 0.2 : 0.1),
                }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        {action.name}
                    </Typography>
                    <IconButton size="small">
                        <MoreVert />
                    </IconButton>
                </Stack>
                <Box>
                    {action.description && (
                        <Typography variant="body2" color="text.secondary">
                            {action.description}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
