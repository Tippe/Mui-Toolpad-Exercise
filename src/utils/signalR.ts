import * as signalR from "@microsoft/signalr";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";

export type OnStreamChunk = (chunk: StreamChunkDto) => void;
export type OnStreamEnd = (end: StreamEndDto) => void;

let connection: signalR.HubConnection | null = null;

export function getConnection(
    url: string,
    accessToken: string,
) {
    if (!connection) {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(url, {
                headers: { AccessToken: accessToken },
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (message: string) => {
            console.log(`Message van: ${message}`);
        });

        connection.on("ServerPushMessage", (message: string) => {
            console.log(`Nieuwe Connectie: ${message}`);
        });

        connection
            .start()
            .then(() => console.log("✅ Connected to SignalR hub"))
            .catch(e => console.error("❌ SignalR connection error:", e));

        connection.onclose(e => {
            console.error("\n ⚠️ Connection gesloten:", e);
        });
    }

    return connection;
}
