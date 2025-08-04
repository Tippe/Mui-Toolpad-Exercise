import * as React from "react";
import {
    useTransition,
    useSpring,
    useSpringRef,
    useChain,
    animated,
    config,
} from "@react-spring/web";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Box,
    Grid,
    Grow,
    CardHeader,
    Avatar,
    Typography,
    Divider,
    alpha,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { getColorsByToolCategory } from "../utils/colorutils";
import { R } from "react-router/dist/development/routeModules-BR2FO0ix";
import { TransitionProps } from "@mui/material/transitions";
import { grey } from "@mui/material/colors";

interface AnimatedDialogProps<T> {
    open: boolean;
    close: (result: R) => Promise<void>;
    title?: string;
    subtitle?: string;
    category?: string;
    icon?: React.ReactNode;
    items: T[]; // Generic list
    renderItem: (item: T) => React.ReactNode; // How to render each item
    trail?: number; // Time between items
}

export function AnimatedDialog<T>({
    open,
    close,
    title,
    subtitle,
    category,
    icon,
    items,
    renderItem,
    trail = 400 / items.length,
}: AnimatedDialogProps<T>) {
    // Dialog animation
    const dialogApi = useSpringRef();
    const dialogSpring = useSpring({
        ref: dialogApi,
        opacity: open ? 1 : 0,
        scale: open ? 1 : 0.9,
        config: config.stiff,
    });

    // Items transition
    const itemsApi = useSpringRef();
    const itemsTransition = useTransition(open ? items : [], {
        ref: itemsApi,
        trail,
        from: { opacity: 0, scale: 0.9, y: 20 },
        enter: { opacity: 1, scale: 1, y: 0 },
        leave: { opacity: 0, scale: 0.9, y: -20 },
        config: config.gentle,
    });

    // Chain animations
    useChain(open ? [dialogApi, itemsApi] : [itemsApi, dialogApi], [
        0,
        open ? 0.1 : 0.3,
    ]);

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Grow ref={ref} {...props} />;
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            slots={{ transition: Transition }}
            fullWidth
            fullScreen={fullScreen}
        >
            <animated.div style={dialogSpring}>
                <CardHeader
                    title={<Typography variant="h6">{title}</Typography>}
                    subheader={
                        subtitle && (
                            <Typography
                                variant="subtitle2"
                                sx={{ color: "text.secondary" }}
                            >
                                {subtitle}
                            </Typography>
                        )
                    }
                    avatar={
                        icon &&
                        category && (
                            <Box
                                sx={{
                                    borderTopLeftRadius: 7,
                                    borderEndStartRadius: 7,
                                    background:
                                        getColorsByToolCategory(category)
                                            .gradientColor,
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
                        )
                    }
                    sx={{
                        border: 1,
                        borderColor: alpha(grey[300], 0.5),
                        borderRadius: 2,
                        p: 0,
                        mt: 2,
                        mx: 2,
                    }}
                />
                <DialogContent>
                    <Stack direction="row" gap={2}>
                        {itemsTransition((style, item) => (
                            <animated.div style={style}>
                                {renderItem(item)}
                            </animated.div>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Close</Button>
                </DialogActions>
            </animated.div>
        </Dialog>
    );
}
