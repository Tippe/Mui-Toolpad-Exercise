import * as React from "react";
import { useSpring, a } from "@react-spring/web";
import { getColorsByToolCategory } from "../utils/colorutils";
import {
    alpha,
    Avatar,
    Badge,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    darken,
    Divider,
    Fade,
    Grid,
    Grow,
    IconButton,
    Popper,
    Stack,
    Typography,
    Zoom,
} from "@mui/material";
import { ExpandMore, ExpandLess, Visibility } from "@mui/icons-material";

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "spring-popper" : undefined;
    //const [open, setOpen] = React.useState(true);
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
                    <Card elevation={0} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid
                                    size={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {icon}
                                </Grid>
                                <Grid size={8}>
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {subtitle}
                                    </Typography>
                                </Grid>
                                <Grid
                                    size={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {actions}
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Divider />

                        <CardActionArea
                            sx={{ borderRadius: 0 }}
                            onClick={() => setFlip((state) => !state)}
                        >
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
                        </CardActionArea>
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

                    {/* <Popper
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            placement="bottom"
                            transition
                            disablePortal={false}
                            modifiers={[
                                {
                                    name: "flip",
                                    enabled: true,
                                    options: {
                                        altBoundary: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                    },
                                },
                                {
                                    name: "preventOverflow",
                                    enabled: true,
                                    options: {
                                        altAxis: true,
                                        altBoundary: true,
                                        tether: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                    },
                                },
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, -32], // X: 0px, Y: -8px => shifts Popper 8px up (overlapping the card)
                                    },
                                },
                            ]}
                        >
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps}>
                                    <Card>
                                        <CardContent>{front}</CardContent>
                                    </Card>
                                </Fade>
                            )}
                        </Popper> */}
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
                    <Card elevation={0} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid
                                    size={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {icon}
                                </Grid>
                                <Grid size={8}>
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {subtitle}
                                    </Typography>
                                </Grid>
                                <Grid
                                    size={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {actions}
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Divider />
                        <CardActionArea
                            onClick={() => setFlip((state) => !state)}
                        >
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
                                    {back}
                                </CardContent>
                            </Collapse>
                        </CardActionArea>
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
            </a.div>
        </Box>
    );
}
