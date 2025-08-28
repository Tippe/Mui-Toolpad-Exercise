import * as signalR from "@microsoft/signalr";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";
import { setSignalRStatus } from "./signalRStatus";

declare global {
  interface Window {
    __signalRConnection?: signalR.HubConnection;
  }
}
export type OnStreamChunk = (chunk: StreamChunkDto) => void;
export type OnStreamEnd = (end: StreamEndDto) => void;

export function getConnection(url: string, accessToken: string): signalR.HubConnection {
  let connection = window.__signalRConnection;

    console.log(connection);

    if (!connection || connection.state === signalR.HubConnectionState.Disconnected) {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(url, {
                headers: { AccessToken: accessToken },
                transport: signalR.HttpTransportType.LongPolling,
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        window.__signalRConnection = connection;

        connection.onreconnecting(() => setSignalRStatus("reconnecting"));
        connection.onreconnected(() => setSignalRStatus("connected"));
        connection.onclose(() => setSignalRStatus("disconnected"));

        // Set connection status
        setSignalRStatus("connecting");

        connection.start()
        .then(() => {
            console.log("✅ Connected to SignalR hub");
            setSignalRStatus("connected");
        })
        .catch(e => {
            console.error("❌ SignalR connection error:", e);
            setSignalRStatus("disconnected");
        });

        // Setup handlers
        connection.on("ReceiveMessage", msg => console.log("📨", msg));
        connection.on("ServerPushMessage", msg => console.log("📡", msg));        
    }

    return connection;
}
