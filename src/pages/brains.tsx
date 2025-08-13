import * as React from "react";
import Typography from "@mui/material/Typography";
import {
    Alert,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Popper,
    Stack,
} from "@mui/material";
import { Fingerprint, Hardware } from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";

interface FadeProps {
    children?: React.ReactElement<unknown>;
    in?: boolean;
    onEnter?: () => void;
    onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
    props,
    ref
) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const alertsCategories = {
    Emails: [
        { severity: "success", text: "Email ontvangen", variant: "standard" },
        {
            severity: "success",
            text: "Bijlage succesvol gedownload",
            variant: "outlined",
        },
        {
            severity: "warning",
            text: "Email server reageert traag",
            variant: "standard",
        },
        {
            severity: "info",
            text: "Nieuw contact toegevoegd via email",
            variant: "standard",
        },
        {
            severity: "error",
            text: "Spamfilter blokkeerde legitiem bericht",
            variant: "outlined",
        },
    ],
    Teams: [
        { severity: "info", text: "Nieuw Teams bericht", variant: "outlined" },
        {
            severity: "info",
            text: "Teams status bijgewerkt",
            variant: "outlined",
        },
    ],
    Systeem: [
        { severity: "error", text: "Brain is offline", variant: "standard" },
        {
            severity: "warning",
            text: "Opslagcapaciteit bijna vol",
            variant: "standard",
        },
        { severity: "info", text: "Back-up voltooid", variant: "outlined" },
        {
            severity: "success",
            text: "Nieuwe module geïnstalleerd",
            variant: "standard",
        },
        {
            severity: "warning",
            text: "Netwerk latency verhoogd",
            variant: "outlined",
        },
    ],
    Overig: [
        {
            severity: "info",
            text: "Er zijn geen nieuwe meldingen",
            variant: "standard",
        },
        {
            severity: "warning",
            text: "Onbekend apparaat gedetecteerd",
            variant: "outlined",
        },
        {
            severity: "info",
            text: "Beveiligingslogboek bijgewerkt",
            variant: "standard",
        },
    ],
};

export default function BrainsPage() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "spring-popper" : undefined;

    return (
        <Grid container spacing={5}>
            <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                onMouseEnter={onHover}
                onMouseLeave={onHover}
            >
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid
                                    size={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Fingerprint sx={{ fontSize: 50 }} />
                                </Grid>
                                <Grid size={9}>
                                    <Typography variant="h6">
                                        Identity
                                    </Typography>
                                    <Typography>
                                        Text about the Identity brain.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Popper
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
                                <CardContent>
                                    <Stack gap={2} sx={{ width: 1 }}>
                                        <Typography>Put stuff here</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>
                    )}
                </Popper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid
                                size={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Hardware sx={{ fontSize: 50 }} />
                            </Grid>
                            <Grid size={9}>
                                <Typography variant="h6">Builder</Typography>
                                <Typography>
                                    Text about the Identity brain.
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
