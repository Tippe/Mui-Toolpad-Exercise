// utils/signalRStore.ts
export type SignalRStatus =
    | "disconnected"
    | "connecting"
    | "connected"
    | "reconnecting";

let currentStatus: SignalRStatus = "disconnected";
let listeners: ((status: SignalRStatus) => void)[] = [];

export function setSignalRStatus(status: SignalRStatus) {
    currentStatus = status;
    listeners.forEach(listener => listener(status));
}

export function getSignalRStatus(): SignalRStatus {
    return currentStatus;
}

export function subscribeToSignalRStatus(
    callback: (status: SignalRStatus) => void
) {
    listeners.push(callback);
    callback(currentStatus); // Call immediately with current status
    return () => {
        listeners = listeners.filter(cb => cb !== callback);
    };
}
