// components/SignalRStatusBadge.tsx

import * as React from "react";
import {
    subscribeToSignalRStatus,
    SignalRStatus,
} from "../utils/signalRStatus";
import { Badge, Tooltip } from "@mui/material";

const colorMap: Record<
    SignalRStatus,
    | "error"
    | "warning"
    | "success"
    | "primary"
    | "secondary"
    | "default"
    | "info"
> = {
    disconnected: "error",
    connecting: "secondary",
    connected: "success",
    reconnecting: "warning",
};

const labelMap: Record<SignalRStatus, string> = {
    disconnected: "Disconnected",
    connecting: "Connecting...",
    connected: "Connected",
    reconnecting: "Reconnecting...",
};

interface Props {
    children: React.ReactNode;
}

export default function SignalRStatusBadge({ children }: Props) {
    const [status, setStatus] = React.useState<SignalRStatus>("disconnected");

    React.useEffect(() => {
        const unsubscribe = subscribeToSignalRStatus(setStatus);
        return () => unsubscribe();
    }, []);

    return (
        <Badge variant="dot" overlap="circular" color={colorMap[status]}>
            {children}
        </Badge>
    );
}
