import * as signalR from "@microsoft/signalr";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";

export type OnStreamChunk = (chunk: StreamChunkDto) => void;
export type OnStreamEnd = (end: StreamEndDto) => void;

let brainsConnection: signalR.HubConnection | null = null;

export function getBrainsConnection(
    url: string,
    accessToken: string,
) {
    if (!brainsConnection) {
        brainsConnection = new signalR.HubConnectionBuilder()
            .withUrl(url, {
                headers: { AccessToken: accessToken },
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        brainsConnection.on("ReceiveMessage", (message: string) => {
            console.log(`Message van: ${message}`);
        });

        brainsConnection.on("ServerPushMessage", (message: string) => {
            console.log(`Nieuwe Connectie: ${message}`);
        });

        brainsConnection
            .start()
            .then(() => console.log("✅ Connected to brains SignalR hub"))
            .catch(e => console.error("❌ SignalR connection error:", e));

        brainsConnection.onclose(e => {
            console.error("\n ⚠️ Connection gesloten:", e);
        });
    }

    return brainsConnection;
}
