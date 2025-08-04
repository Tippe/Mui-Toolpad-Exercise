import * as React from "react";
import { useSpring, a } from "@react-spring/web";
import { getColorsByToolCategory } from "../utils/colorutils";
import {
    alpha,
    Avatar,
    Badge,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    darken,
    Divider,
    Grow,
    IconButton,
    Typography,
    Zoom,
} from "@mui/material";
import { ExpandMore, ExpandLess, MoreVert } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

interface DashboardCardProps {
    title: string;
    subtitle: string;
    category: string;
    icon?: React.ReactNode;
    front?: React.ReactNode;
    back?: React.ReactNode;
    actions?: React.ReactNode;
    height?: number | string;
}

export default function DashboardCard({
    title,
    subtitle,
    category,
    icon,
    front,
    back,
    actions,
    height,
}: DashboardCardProps) {
    const [open, setOpen] = React.useState(true);
    const [flipped, setFlip] = React.useState(false);

    const frontRef = React.useRef<HTMLDivElement>(null);
    const backRef = React.useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = React.useState(0);

    // ResizeObserver om de hoogte van de front of back kant te volgen

    React.useEffect(() => {
        const front = frontRef.current;
        const back = backRef.current;
        if (!front || !back) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // Alleen bijwerken als de Collapse open is en het de front kant is
                if (open && entry.target === front) {
                    setCardHeight(entry.contentRect.height);
                }
                // Alleen bijwerken als de Collapse open is en het de back kant is
                if (open && entry.target === back) {
                    setCardHeight(entry.contentRect.height);
                }
                // Als Collapse gesloten is, kan je eventueel hoogte resetten naar 0 of een andere logica toepassen
                if (!open) {
                    setCardHeight(0);
                }
            }
        });

        observer.observe(front);
        observer.observe(back);
        return () => {
            observer.disconnect();
        };
    }, [open]);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(2000px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 555, friction: 80 },
    });

    return (
        <Box
            sx={{
                position: "relative",
                height: cardHeight || "auto",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    transformStyle: "preserve-3d",
                }}
            >
                <a.div
                    style={{
                        position: "relative",
                        width: "100%",
                        transformStyle: "preserve-3d",
                        transform,
                    }}
                >
                    {/* FRONT SIDE */}
                    <a.div
                        ref={frontRef}
                        style={{
                            opacity: opacity.to((o) => 1 - o),
                            transform: "rotateY(0deg)",
                            backfaceVisibility: "hidden",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 2,
                                pb: 1,
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                        >
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                }
                                subheader={
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {subtitle}
                                    </Typography>
                                }
                                avatar={
                                    <Box
                                        sx={{
                                            borderTopLeftRadius: 7,
                                            borderEndStartRadius: 7,
                                            background:
                                                getColorsByToolCategory(
                                                    category
                                                ).gradientColor,
                                            py: 0.5,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                background: "none",
                                                width: 50,
                                                height: 50,
                                                color: "black",
                                            }}
                                        >
                                            {icon}
                                        </Avatar>
                                    </Box>
                                }
                                action={
                                    <IconButton
                                        onClick={() =>
                                            setFlip((state) => !state)
                                        }
                                    >
                                        <MoreVert />
                                    </IconButton>
                                }
                                sx={{
                                    border: 1,
                                    borderColor: alpha(grey[400], 0.5),
                                    borderRadius: 2,
                                    p: 0,
                                    m: 1,
                                }}
                            />
                            <Divider />

                            <Collapse
                                in={open}
                                unmountOnExit
                                sx={{
                                    flex: 1,
                                    minHeight: 0,
                                }}
                            >
                                <CardContent
                                    sx={{
                                        flex: 1,
                                        px: 2,
                                        overflowY: "auto",
                                        height: height ?? cardHeight,
                                    }}
                                >
                                    {front}
                                </CardContent>
                            </Collapse>
                            {open && actions && (
                                <CardActions
                                    sx={{
                                        px: 2,
                                        mt: "auto",
                                        position: "absolute",
                                        bottom: 8,
                                    }}
                                >
                                    {actions}
                                </CardActions>
                            )}

                            <CardActions
                                sx={{
                                    justifyContent: "center",
                                    pt: 0,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </CardActions>
                        </Card>
                    </a.div>

                    {/* BACK SIDE */}
                    <a.div
                        ref={backRef}
                        style={{
                            opacity,
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 2,
                                pb: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                }
                                subheader={
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {subtitle}
                                    </Typography>
                                }
                                avatar={
                                    <Box
                                        sx={{
                                            borderTopLeftRadius: 7,
                                            borderEndStartRadius: 7,
                                            background:
                                                getColorsByToolCategory(
                                                    category
                                                ).gradientColor,
                                            py: 0.5,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                background: "none",
                                                width: 50,
                                                height: 50,
                                                color: "black",
                                            }}
                                        >
                                            {icon}
                                        </Avatar>
                                    </Box>
                                }
                                action={
                                    <IconButton
                                        onClick={() =>
                                            setFlip((state) => !state)
                                        }
                                    >
                                        <MoreVert />
                                    </IconButton>
                                }
                                sx={{
                                    border: 1,
                                    borderColor: alpha(grey[300], 0.5),
                                    borderRadius: 2,
                                    p: 0,
                                    m: 1,
                                }}
                            />
                            <Divider />

                            <Collapse in={open} timeout="auto">
                                <CardContent
                                    sx={{
                                        flex: 1,
                                        px: 2,
                                        overflowY: "auto",
                                        height: open
                                            ? height ?? cardHeight
                                            : cardHeight,
                                    }}
                                >
                                    {back}
                                </CardContent>
                            </Collapse>

                            <CardActions
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    py: 0,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </CardActions>
                        </Card>
                    </a.div>
                </a.div>
            </Box>
        </Box>
    );
}
